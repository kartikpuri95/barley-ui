+++
title = "Card"
weight = 20
+++



Cards contain content and actions about a single subject.

## Usage

Use `data-role="card"` on any container element.

{% demo() %}
```html
<div data-role="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
  <button data-variant="primary">Action</button>
</div>
```
{% end %}

## Interactive

Add `data-interactive="true"` to make the card react to hover interactions, useful for clickable cards.

{% demo() %}
```html
<div data-role="card" data-interactive="true">
  <h3>Clickable Card</h3>
  <p>Hover me to see the effect.</p>
</div>
```
{% end %}
