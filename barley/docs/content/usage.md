+++
title = "Installation & Usage"
weight = 1
+++

## Installation

### Manual Download

Download the latest built files from the `dist/` directory:

- `barley.min.css`
- `barley.min.js`

Include them in your project:

```html
<link rel="stylesheet" href="path/to/barley.min.css">
<script src="path/to/barley.min.js" defer></script>
```

### Build from Source

Clone the repository and build using `make`:

```bash
git clone https://github.com/kartikpuri95/barley-ui
cd barley-ui
make dist
```

## Basic Usage

Barley styles many standard HTML elements automatically.

```html
<button>I am a button</button>
<input type="text" placeholder="I am an input">
```

For more specific components, use data attributes:

```html
<button data-variant="primary">Primary Action</button>
<div data-role="card">Content</div>
```
