// main.js — Float Layout Laboratory
//
// This script powers the "Toggle Float Outlines" button.
// When active, every floated element gets a red outline so you can
// visually see which elements have been pulled out of normal document flow.

document.addEventListener('DOMContentLoaded', function () {

    // ── Grab the toggle button ──────────────────────────────────────────
    const toggleBtn = document.getElementById('toggleOutlines');

    // Guard: if the button doesn't exist on this page, stop here.
    // This prevents errors if the script is ever reused on another page.
    if (!toggleBtn) return;


    // ── Mark every floated element with a .float class ─────────────────
    //
    // We query all elements that have float: left/right applied in CSS.
    // Adding .float gives the CSS visualizer (.show-float-outlines .float)
    // something to target with the red outline.
    //
    // If you add new floated elements to the HTML, add their selector here.
    const floatedElements = document.querySelectorAll(
        '.sidebar, .column, .article-container img'
    );

    floatedElements.forEach(function (el) {
        el.classList.add('float');
    });


    // ── Toggle button click handler ─────────────────────────────────────
    //
    // Toggling .show-float-outlines on <body> is enough — the CSS handles
    // the rest. We also update the button label so it reflects the current
    // state (off → "Toggle Float Outlines", on → "Hide Float Outlines").
    toggleBtn.addEventListener('click', function () {

        // classList.toggle returns true if the class was ADDED, false if removed
        const isActive = document.body.classList.toggle('show-float-outlines');

        // Update button label to match current state
        this.textContent = isActive
            ? 'Hide Float Outlines'
            : 'Toggle Float Outlines';
    });

});
