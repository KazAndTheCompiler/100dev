# Float Layout Laboratory

This project demonstrates classic CSS float-based layouts used before flexbox and grid became widely available.

## What You'll Learn

### 1. Float Properties
- `float: left` - Positions element to the left, allowing text to wrap around it
- `float: right` - Positions element to the right, allowing text to wrap around it
- Floated elements are removed from normal document flow

### 2. Clear Property
- `clear: left` - Prevents elements from appearing to the left of floated elements
- `clear: right` - Prevents elements from appearing to the right of floated elements
- `clear: both` - Prevents elements from appearing on either side of floated elements

### 3. Clearfix Technique
The clearfix hack solves the collapsing parent container issue when all child elements are floated. Two common approaches:

**Classic Clearfix:**
```css
.clearfix::after {
    content: ".";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
}
```

**Modern Clearfix:**
```css
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```

### 4. Collapsing Parent Issue
When all child elements of a container are floated, the container collapses because floated elements are removed from normal document flow.

**Solution 1: overflow: hidden**
```css
.container {
    overflow: hidden;
}
```

**Solution 2: Clearfix**
```css
.container::after {
    content: "";
    display: table;
    clear: both;
}
```

## Layout Demonstrations

### Two-Column Layout
- Classic sidebar + main content layout
- Shows the collapsing parent issue and two solutions

### Three-Column News Layout
- Traditional newspaper-style layout
- Uses multiple floated columns with clearfix

### Image with Text Wrap
- Demonstrates how text wraps around floated images
- Common technique for magazine-style layouts

## Usage

1. Open `index.html` in a web browser
2. Click "Toggle Float Outlines" button to visualize floated elements
3. Examine the CSS in `css/style.css` to understand each technique
4. Modify the code to experiment with different float properties

## Browser Compatibility

Float layouts work in all modern browsers and were the primary layout method for web design from the late 1990s until the mid-2010s.

## Contributing

This is an educational project. Feel free to experiment and add your own float-based layouts!