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
