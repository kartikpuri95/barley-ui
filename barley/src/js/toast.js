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
