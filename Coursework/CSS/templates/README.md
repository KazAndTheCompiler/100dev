# 100Devs Template Library

Unified, versioned templates for 100Devs coursework.
One source of truth — copy what you need, never start from scratch.

---

## Templates

### `v1-basic`
The cleanest possible starting point. No layout, no content — just the right wiring.

**Includes:**
- HTML5 boilerplate with all essential meta tags
- `normalize.css` for cross-browser consistency
- `style.css` with box model hack, clearfix, and clearly labeled sections
- Empty `main.js` with a ready-to-go `DOMContentLoaded` listener

**Use when:** Starting any new project from zero.

---

### `v1-float-layout`
A ready-to-use classic float layout: header, two-column main (content + sidebar), footer.

**Includes:**
- Everything from `v1-basic`
- Full two-column float layout (main content + right sidebar)
- Float image with text wrap demo
- Clearfix applied correctly on container
- Responsive breakpoint that stacks columns on mobile
- Commented JS with `DOMContentLoaded` pattern

**Use when:** Building a classic layout exercise, a blog, a news page, or any sidebar design.

---

## How to Use

1. Copy the template folder to your project location
2. Rename it to match your project
3. Update `<title>`, meta description, and meta keywords in `index.html`
4. Build from there — never edit the originals in this library

---

## What Changed (Unified from two sources)

| Issue | Before | After |
|---|---|---|
| Clearfix | Two different versions (old `.` content trick vs empty `""`) | Unified to modern `""` empty-string version |
| JS entry point | One template had empty JS, the other had a bare `console.log` | Both now use `DOMContentLoaded` pattern |
| Section labels | Inconsistent comment headers | Standardized across both templates |
| normalize.css | Only in `v1-basic`, missing from float layout | Added to both |
| reset.css | Included in template A but unused | Removed — normalize.css is the right choice |
| `main.js` | Missing from `v1-basic` | Added with placeholder pattern |
| Meta viewport | Present in both but inconsistent formatting | Standardized |
