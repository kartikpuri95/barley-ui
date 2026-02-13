+++
title = "Sidebar"
weight = 60
+++



A responsive sidebar layout for application shells.

## Usage

Use the `data-layout="sidebar"` attribute on a container.

<!-- Sidebar requires a full page layout, so we simulate it here -->
{% demo() %}
```html
<div data-layout="sidebar" style="height: 300px; border: 1px solid var(--border); position: relative;">
  <aside style="position: absolute; height: 100%;">
    <header>App Name</header>
    <nav>
      <a href="#" aria-current="page">Home</a>
      <a href="#">Settings</a>
    </nav>
    <footer>User Profile</footer>
  </aside>
  
  <main style="margin-left: 260px; padding: 1rem;">
    <h1>Page Content</h1>
  </main>
</div>
```
{% end %}

## Mobile

On mobile screens (`< 768px`), the sidebar is hidden by default. Use a button with `data-sidebar-toggle` to toggle it.

```html
<button data-sidebar-toggle>Menu</button>
```
