+++
title = "Button"
weight = 10
+++



Buttons trigger actions or navigation. They support multiple variants and sizes.

## Usage

Standard buttons use the `<button>` tag or `.btn` class.

{% demo() %}
```html
<button>Default Button</button>
<a href="#" class="btn">Link Button</a>
```
{% end %}

## Variants

Control the style with `data-variant`.

{% demo() %}
```html
<button data-variant="default">Default</button>
<button data-variant="primary">Primary</button>
<button data-variant="secondary">Secondary</button>
<button data-variant="accent">Accent</button>
<button data-variant="ghost">Ghost</button>
<button data-variant="outline">Outline</button>
```
{% end %}

- **Default**: Neutral standard button.
- **Primary**: Highest emphasis (Solids).
- **Secondary**: Middle emphasis.
- **Accent**: Brand emphasis (Gold).
- **Ghost**: Lowest emphasis (Text only).
- **Outline**: Bordered only.

## Sizes

Coming soon. Standard size is flexible with padding.
