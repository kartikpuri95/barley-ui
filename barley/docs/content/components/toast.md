+++
title = "Toast"
weight = 150
+++



Non-blocking notifications.

## Usage

Use the JavaScript API `barley.toast()`.

<!-- Toasts are JS triggered. We use buttons to demonstrate. -->
{% demo() %}
```html
<button onclick="barley.toast('Operation successful')">Simple Toast</button>

<button onclick="barley.toast('Saved', 'Your profile usage', { variant: 'success' })" data-variant="primary">Success Toast</button>

<button onclick="barley.toast('Error', 'Failed to connect', { variant: 'danger' })" data-variant="danger">Error Toast</button>
```
{% end %}

Code used:

```javascript
// Simple message
barley.toast('Operation successful');

// With title and variant
barley.toast('Saved', 'Your profile usage', { variant: 'success' });

// Options
barley.toast('Error', 'Failed to connect', { 
  variant: 'danger', 
  placement: 'bottom-right',
  duration: 5000 
});
```
