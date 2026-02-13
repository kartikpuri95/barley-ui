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
