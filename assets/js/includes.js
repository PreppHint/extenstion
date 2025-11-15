// Load HTML includes dynamically
document.addEventListener('DOMContentLoaded', function() {
    // Load navigation
    fetch('includes/navigation.html')
        .then(response => response.text())
        .then(data => {
            const navPlaceholder = document.getElementById('nav-placeholder');
            if (navPlaceholder) {
                navPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading navigation:', error));

    // Load footer
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading footer:', error));

    // Load disclaimer
    fetch('includes/disclaimer.html')
        .then(response => response.text())
        .then(data => {
            const disclaimerPlaceholder = document.getElementById('disclaimer-placeholder');
            if (disclaimerPlaceholder) {
                disclaimerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading disclaimer:', error));

    // Load footer bottom
    fetch('includes/footer-bottom.html')
        .then(response => response.text())
        .then(data => {
            const footerBottomPlaceholder = document.getElementById('footer-bottom-placeholder');
            if (footerBottomPlaceholder) {
                footerBottomPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading footer bottom:', error));
});
