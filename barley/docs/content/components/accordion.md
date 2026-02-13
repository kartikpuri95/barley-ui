+++
title = "Accordion"
weight = 80
+++



A vertically stacked set of interactive headings that each reveal a section of content.

## Usage

Use the native `<details>` and `<summary>` elements. Barley styles them automatically.

{% demo() %}
```html
<details>
  <summary>What is Barley?</summary>
  <p>Barley is a UI library.</p>
</details>

<details open>
  <summary>Is it open by default?</summary>
  <p>Yes, if you add the `open` attribute.</p>
</details>
```
{% end %}
