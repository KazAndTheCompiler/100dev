# Float Layout Laboratory

Interactive lab demonstrating classic CSS float-based layouts, including the collapsing-parent problem and two ways to fix it.

---

## What You'll Learn

### 1. How Floats Work
`float: left` or `float: right` removes an element from normal document flow and pushes it to the edge of its container. Surrounding inline content (text, images) wraps around it.

### 2. The Collapsing Parent Problem
When **all** children of a container are floated, the container has no in-flow children left — so it collapses to zero height. Content that follows slides up behind the floated elements.

Demo 1 shows this broken state deliberately so you can inspect it in DevTools.

### 3. Two Ways to Fix It

**Fix 1 — `overflow: hidden`**
```css
.container {
    overflow: hidden;
}
```
Setting `overflow` to anything other than `visible` forces the browser to create a **Block Formatting Context (BFC)**. A BFC always expands to contain its floated descendants.

> ⚠️ Downside: clips any content that intentionally overflows the box (dropdowns, tooltips). Use carefully.

---

**Fix 2 — Clearfix (recommended)**
```css
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```
Injects an invisible block-level pseudo-element as the last child. `clear: both` forces it below all floats, stretching the parent to contain them.

Apply the class to the **parent container**:
```html
<div class="news-container clearfix">
  <div class="column">...</div>
  <div class="column">...</div>
</div>
```

> ✅ No clipping side effects. This is the standard approach.

---

### 4. What NOT to Do — Empty Clearfix Divs
An older pattern you'll see in legacy code is placing an empty element as the last child:
```html
<!-- Old pattern — don't do this -->
<div class="container">
  <div class="sidebar">...</div>
  <div class="content">...</div>
  <div class="clearfix"></div>  ← meaningless markup
</div>
```
This works, but it pollutes the DOM with presentational markup. The `::after` pseudo-element approach achieves the same result entirely in CSS. All demos in this lab use the correct approach.

---

## Layout Demonstrations

| Demo | Technique | Key Concept |
|---|---|---|
| Two-Column Layout | `float: left` + `margin-left` | Collapsing parent + two fixes |
| Three-Column News | All columns `float: left` | Widths sum to 100%, clearfix on parent |
| Image Text Wrap | `float: left` on `<img>` | Original intended use of float |

---

## How to Use

1. Open `index.html` in a browser
2. Click **"Toggle Float Outlines"** to see red outlines on every floated element
3. Open DevTools → inspect `.no-fix` to see the collapsed parent height
4. Compare `.overflow-fix` and `.clearfix` to see both solutions working

---

## Clearfix Quick Reference

```css
/* Apply this once in your CSS */
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

/* Then use it on any parent that contains floats */
```
```html
<div class="container clearfix">
  <div class="floated-child">...</div>
</div>
```
