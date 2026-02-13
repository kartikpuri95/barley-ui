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
