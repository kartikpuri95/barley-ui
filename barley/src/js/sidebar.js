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
