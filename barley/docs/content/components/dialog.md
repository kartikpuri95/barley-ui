+++
title = "Dialog"
weight = 40
+++



A modal dialog that overlays the page content. Barley styles the native `<dialog>` element.

## Usage

Use the `<dialog>` element. Ensure you include a method to close it.

{% demo() %}
```html
<dialog id="my-dialog">
  <header>
    <h2>Dialog Title</h2>
  </header>
  <main>
    <p>Dialog content goes here.</p>
  </main>
  <footer>
    <button onclick="document.getElementById('my-dialog').close()">Close</button>
  </footer>
</dialog>

<button onclick="document.getElementById('my-dialog').showModal()">Open Dialog</button>
```
{% end %}

## Declarative Trigger

Barley includes a polyfill for `command` and `commandfor` attributes (standardized but not yet in all browsers), allowing you to control dialogs without writing JS.

{% demo() %}
```html
<!-- Note: ID needs to be unique for demo -->
<dialog id="my-dialog-2">
  <form method="dialog">
    <h2>Declarative Dialog</h2>
    <p>This dialog was opened without writing custom JS.</p>
    <button>Close</button>
  </form>
</dialog>

<button command="show-modal" commandfor="my-dialog-2">Open Dialog</button>
```
{% end %}
