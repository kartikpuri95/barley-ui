+++
title = "Form"
weight = 30
+++



Styles for inputs, textareas, selects, and labels.

## Usage

Standard form elements are styled automatically.

{% demo() %}
```html
<form>
  <label for="name">Name</label>
  <input type="text" id="name" placeholder="Enter your name">

  <label for="bio">Bio</label>
  <textarea id="bio" rows="4"></textarea>

  <label for="role">Role</label>
  <select id="role">
    <option>User</option>
    <option>Admin</option>
  </select>

  <button type="submit" data-variant="primary">Submit</button>
</form>
```
{% end %}

## Input States

Inputs support `:focus`, `:disabled`, and `:invalid` states automatically.

{% demo() %}
```html
<!-- Disabled -->
<input type="text" disabled value="Cannot change me">

<!-- Required/Valid/Invalid validation styles apply automatically -->
<input type="email" required>
```
{% end %}
