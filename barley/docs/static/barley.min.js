/**
 * Barley UI - Core
 * Base class for Web Components and essential polyfills.
 */

class BarleyBase extends HTMLElement {
  #initialized = false;

  connectedCallback() {
    if (this.#initialized) return;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.#setup(), { once: true });
    } else {
      this.#setup();
    }
  }

  #setup() {
    if (this.#initialized) return;
    this.#initialized = true;
    this.init();
  }

  // Override in subclasses
  init() {}

  disconnectedCallback() {
    this.cleanup();
  }

  // Override in subclasses
  cleanup() {}

  // Event handler interface
  handleEvent(event) {
    const handler = this[`on${event.type}`];
    if (handler) handler.call(this, event);
  }

  // Utilities
  emit(name, detail = null) {
    return this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail
    }));
  }

  $(selector) { return this.querySelector(selector); }
  $$(selector) { return Array.from(this.querySelectorAll(selector)); }

  uid() {
    return Math.random().toString(36).slice(2, 10);
  }
}

// Global export
if (typeof window !== 'undefined') {
  window.BarleyBase = BarleyBase;
}

// Polyfill for command/commandfor (Safari/older browsers)
// Enables declarative control of dialogs/popovers
if (!('commandForElement' in HTMLButtonElement.prototype)) {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[commandfor]');
    if (!btn) return;

    const target = document.getElementById(btn.getAttribute('commandfor'));
    if (!target) return;

    const command = btn.getAttribute('command') || 'toggle';

    if (target instanceof HTMLDialogElement) {
      if (command === 'show-modal') target.showModal();
      else if (command === 'close') target.close();
      else target.open ? target.close() : target.showModal();
    }
  });
}
/**
 * Barley UI - Dropdown
 * <barley-dropdown>
 */

class BarleyDropdown extends BarleyBase {
  #menu;
  #trigger;
  #position;

  init() {
    this.#menu = this.$('[popover]');
    this.#trigger = this.$('[popovertarget]');

    if (!this.#menu || !this.#trigger) return;

    this.#menu.addEventListener('toggle', this);
    this.#menu.addEventListener('keydown', this);

    this.#position = () => {
      const rect = this.#trigger.getBoundingClientRect();
      // Position is fixed, so use viewport coordinates (rect) directly.
      this.#menu.style.top = `${rect.bottom + 4}px`; 
      this.#menu.style.left = `${rect.left}px`;
      
      // Prevent running off screen right
      if (rect.left + 200 > window.innerWidth) {
           this.#menu.style.left = 'auto';
           this.#menu.style.right = '1rem';
      }
    };
  }

  ontoggle(e) {
    const isOpen = e.newState === 'open';
    if (isOpen) {
      this.#position();
      window.addEventListener('scroll', this.#position, true);
      window.addEventListener('resize', this.#position, true);
      
      const firstItem = this.$('[role="menuitem"]');
      if (firstItem) firstItem.focus();
      
      this.#trigger.setAttribute('aria-expanded', 'true');
      this.#menu.setAttribute('data-state', 'open');
    } else {
      window.removeEventListener('scroll', this.#position, true);
      window.removeEventListener('resize', this.#position, true);
      this.#trigger.setAttribute('aria-expanded', 'false');
      this.#menu.removeAttribute('data-state');
      this.#trigger.focus();
    }
  }

  onkeydown(e) {
    // Arrow key navigation
    if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      const items = this.$$('[role="menuitem"]');
      const idx = items.indexOf(document.activeElement);
      
      if (idx === -1) {
        items[0]?.focus();
        return;
      }

      const nextIdx = e.key === 'ArrowDown' 
        ? (idx + 1) % items.length 
        : (idx - 1 + items.length) % items.length;
        
      items[nextIdx]?.focus();
    }
    
    // Close on Escape (native popover handles this usually, but safe to add)
  }

  cleanup() {
    window.removeEventListener('scroll', this.#position, true);
    window.removeEventListener('resize', this.#position, true);
  }
}

customElements.define('barley-dropdown', BarleyDropdown);
/**
 * Barley UI - Sidebar
 * Handles mobile toggle.
 */

document.addEventListener('click', (e) => {
  const toggle = e.target.closest('[data-sidebar-toggle]');
  if (toggle) {
    const layout = document.querySelector('[data-layout="sidebar"]');
    if (layout) {
      const isOpen = layout.getAttribute('data-open') === 'true';
      layout.setAttribute('data-open', !isOpen);
    }
  }
  
  // Close when clicking outside on mobile (optional enhancement)
  if (window.innerWidth <= 768) {
     const layout = document.querySelector('[data-layout="sidebar"][data-open="true"]');
     if (layout && !e.target.closest('aside') && !toggle) {
        layout.setAttribute('data-open', 'false');
     }
  }
});
/**
 * Barley UI - Tabs
 * <barley-tabs>
 */

class BarleyTabs extends BarleyBase {
  #tabs = [];
  #panels = [];

  init() {
    const tablist = this.$('[role="tablist"]');
    if (!tablist) return;

    this.#tabs = [...tablist.querySelectorAll('[role="tab"]')];
    this.#panels = this.$$('[role="tabpanel"]');

    this.#tabs.forEach((tab, i) => {
      // Basic ARIA setup
      const panel = this.#panels[i];
      if (panel) {
        const id = this.uid();
        tab.id = tab.id || `tab-${id}`;
        panel.id = panel.id || `panel-${id}`;
        tab.setAttribute('aria-controls', panel.id);
        panel.setAttribute('aria-labelledby', tab.id);
      }

      tab.addEventListener('click', () => this.activate(i));
      tab.addEventListener('keydown', (e) => this.handleKey(e, i));
    });
  }

  activate(index) {
    this.#tabs.forEach((tab, i) => {
      const isActive = i === index;
      tab.setAttribute('aria-selected', isActive);
      tab.setAttribute('tabindex', isActive ? 0 : -1);
      if (this.#panels[i]) {
        this.#panels[i].hidden = !isActive;
      }
    });
  }

  handleKey(e, index) {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % this.#tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + this.#tabs.length) % this.#tabs.length;
    } else {
      return;
    }
    
    e.preventDefault();
    this.activate(newIndex);
    this.#tabs[newIndex].focus();
  }
}

customElements.define('barley-tabs', BarleyTabs);
/**
 * Barley UI - Toast
 * window.barley.toast('Message', 'Title', { variant: 'success' })
 */

const barley = window.barley || (window.barley = {});
const containers = {};

function getContainer(placement = 'top-right') {
  if (!containers[placement]) {
    const el = document.createElement('div');
    el.className = 'toast-container';
    el.setAttribute('data-placement', placement);
    el.setAttribute('popover', 'manual');
    document.body.appendChild(el);
    el.showPopover(); // Always open container
    containers[placement] = el;
  }
  return containers[placement];
}

barley.toast = function(message, title, options = {}) {
  const { 
    variant = 'info', 
    duration = 4000, 
    placement = 'top-right' 
  } = options;

  const container = getContainer(placement);
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('data-variant', variant);
  toast.setAttribute('data-state', 'entering');

  let html = '';
  if (title) html += `<div class="toast-title">${title}</div>`;
  if (message) html += `<div class="toast-message">${message}</div>`;
  toast.innerHTML = html;

  // Add click to dismiss
  toast.onclick = () => removeToast(toast);

  // Auto dismiss
  if (duration > 0) {
    setTimeout(() => removeToast(toast), duration);
  }

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.removeAttribute('data-state');
  });

  function removeToast(el) {
    el.setAttribute('data-state', 'exiting');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
    // Fallback if transition fails
    setTimeout(() => el.remove(), 300);
  }
};
/**
 * Barley UI - Tooltip
 * Converts title attributes to data-tooltip.
 */

document.addEventListener('DOMContentLoaded', () => {
  const tooltips = document.querySelectorAll('[title]');
  tooltips.forEach(el => {
    const text = el.getAttribute('title');
    if (text) {
      el.setAttribute('data-tooltip', text);
      if (!el.hasAttribute('aria-label')) {
        el.setAttribute('aria-label', text);
      }
      el.removeAttribute('title');
    }
  });
});
