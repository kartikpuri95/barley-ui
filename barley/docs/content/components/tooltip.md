+++
title = "Tooltip"
weight = 160
+++



Contextual hints on hover.

## Usage

Barley automatically converts standard `title` attributes to custom tooltips on page load.

{% demo() %}
```html
<button title="This prints the page">Hover me (Native Title)</button>
```
{% end %}

Or invoke manually if content is added dynamically:

{% demo() %}
```html
<button data-tooltip="Helper text">Hover me (Custom Data)</button>
```
{% end %}
