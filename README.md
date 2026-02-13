# 🌾 Barley UI

> **Sharp. Minimal. Semantic.**  
> A zero-dependency, semantic CSS/JS library for building modern web interfaces.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Size](https://img.shields.io/badge/size-~8KB-success.svg)
![Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)

---

## Overview

Barley UI is designed to be drop-dead simple. It styles native HTML elements directly, meaning you write standard HTML5 and get a beautiful, accessible interface out of the box. No heavy frameworks, no complex build steps, no class-name soup.

Just include the files and write HTML.

### Key Features

*   **⚡ Zero Dependencies**: Pure CSS and Vanilla JS.
*   **💎 Semantic First**: Styles `<details>`, `<dialog>`, `<progress>`, and other native elements.
*   **🪶 Lightweight**: ~8KB gzipped.
*   **🌗 Dark Mode**: Built-in dark theme support via `data-theme="dark"`.
*   **🧩 Interactive Components**: Tabs, Dropdowns, Sidebars, Toasts (web components).

---

## 🚀 Getting Started

### 1. Manual Download

Download the latest built files from the `dist/` directory or run the build command.

1.  `public/dist/barley.min.css`
2.  `public/dist/barley.min.js`

### 2. Usage

Add the files to your project:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="path/to/barley.min.css">
  <script src="path/to/barley.min.js" defer></script>
</head>
<body>
  
  <!-- Use standard HTML elements! -->
  <button data-variant="primary">Click Me</button>
  
  <details>
    <summary>Accordion</summary>
    <p>Semantic accordion content.</p>
  </details>

</body>
</html>
```

---

## 🎨 Components

Barley styles elements automatically, but you can enhance them with `data-*` attributes.

### Buttons
```html
<button>Default</button>
<button data-variant="primary">Primary</button>
<button data-variant="ghost">Ghost</button>
```

### Cards
```html
<div data-role="card">
  <h3>Card Title</h3>
  <p>Content goes here.</p>
</div>
```

### Interactive Tabs
Barley includes a lightweight Web Component for tabs.
```html
<barley-tabs>
  <div role="tablist">
    <button role="tab">Tab 1</button>
    <button role="tab">Tab 2</button>
  </div>
  <div role="tabpanel">Content 1</div>
  <div role="tabpanel">Content 2</div>
</barley-tabs>
```

---

## 🛠️ Development

This repository contains the source code and the documentation site generator.

### Prerequisites

*   **Zola**: Required if you want to build/edit the documentation.
    *   Install via: `brew install zola` (macOS) or download from [getzola.org](https://www.getzola.org/documentation/getting-started/installation/).

### Project Structure

*   `barley/src/`: Source CSS (split by component) and JS.
*   `barley/docs/`: Documentation site (Zola project).
*   `barley/dist/`: Compiled distribution files.
*   `index.html`: The main landing page.

### Building Locally

To build the entire project (Docs + Landing Page) into a `public/` directory ready for deployment:

```bash
git clone https://github.com/kartikpuri95/barley-ui
cd barley-ui
./build.sh
```

To run the documentation server locally with live reload:

```bash
cd barley/docs
zola serve
```

---

## 📄 License

MIT © [Kartik Puri](https://github.com/kartikpuri95)
