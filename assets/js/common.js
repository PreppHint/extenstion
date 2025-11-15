/**
 * Common JavaScript for shared components
 */

// Get current date formatted
function getCurrentDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
}

// Update date placeholders
document.addEventListener('DOMContentLoaded', function() {
    const dateElements = document.querySelectorAll('.current-date');
    dateElements.forEach(el => {
        el.textContent = getCurrentDate();
    });
});
