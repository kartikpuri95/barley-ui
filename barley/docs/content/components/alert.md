+++
title = "Alert"
weight = 90
+++



Contextual feedback messages for user actions.

## Usage

Use `role="alert"` or `.alert`.

{% demo() %}
```html
<div role="alert">
  This is a standard alert.
</div>
```
{% end %}

## Variants

- **Success**: `data-variant="success"`
- **Warning**: `data-variant="warning"`
- **Danger**: `data-variant="danger"`
- **Accent**: `data-variant="accent"`

{% demo() %}
```html
<div role="alert" data-variant="success">
  <strong>Success:</strong> Operation completed.
</div>
<div role="alert" data-variant="warning">
  <strong>Warning:</strong> Be careful.
</div>
<div role="alert" data-variant="danger">
  <strong>Error:</strong> Something went wrong.
</div>
```
{% end %}
