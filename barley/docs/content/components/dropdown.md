+++
title = "Dropdown"
weight = 50
+++



A toggleable menu for actions or navigation.

## Usage

Wrap a trigger and a menu in `<barley-dropdown>`. The menu uses the standard `popover` API.

{% demo() %}
```html
<barley-dropdown>
  <button popovertarget="menu-1">Options</button>
  
  <div popover id="menu-1">
    <button role="menuitem">Edit</button>
    <button role="menuitem">Duplicate</button>
    <hr>
    <button role="menuitem" style="color: var(--color-danger)">Delete</button>
  </div>
</barley-dropdown>
```
{% end %}

## Behavior

- **Positioning**: Automatically positioned below the trigger.
- **Keyboard**: Supports ArrowUp/ArrowDown navigation.
- **Dismiss**: Closes on click outside or Escape (native popover behavior).
