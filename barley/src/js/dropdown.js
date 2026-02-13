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
