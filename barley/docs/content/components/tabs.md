+++
title = "Tabs"
weight = 70
+++



Switch between different views of content.

## Usage

Use the `<barley-tabs>` component with standard ARIA roles: `tablist`, `tab`, and `tabpanel`.

{% demo() %}
```html
<barley-tabs>
  <div role="tablist">
    <button role="tab" aria-selected="true" tabindex="0">Tab 1</button>
    <button role="tab" tabindex="-1">Tab 2</button>
  </div>

  <div role="tabpanel">
    Content 1
  </div>

  <div role="tabpanel" hidden>
    Content 2
  </div>
</barley-tabs>
```
{% end %}

## Accessibility

Barley automatically handles:
- **Keyboard Navigation**: Left/Right arrows to switch tabs.
- **ARIA**: Updates `aria-selected` and `hidden` attributes.
- **Focus**: Manages `tabindex`.
