/**
 * Language Switch Functionality
 * Handles switching between English and Chinese versions
 */
(function () {
    'use strict';

    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;

    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    // Set initial state based on current page
    // Chinese page has /cn/ in the path
    const isChinesePage = currentPath.includes('/cn/');
    toggle.checked = isChinesePage;

    // Handle toggle change
    toggle.addEventListener('change', function () {
        if (this.checked) {
            // Switch to Chinese version
            if (currentPath === '/' || currentPath === '/index.html') {
                // Already on homepage, go to Chinese homepage
                window.location.href = '/cn/';
            } else if (currentPath.startsWith('/cn/')) {
                // Already on Chinese page, stay here
                window.location.href = '/cn/';
            } else {
                // On other English page, try to find corresponding Chinese page
                // For now, default to Chinese homepage
                window.location.href = '/cn/';
            }
        } else {
            // Switch to English version
            if (currentPath === '/cn/' || currentPath === '/cn/index.html') {
                // On Chinese homepage, go to English homepage
                window.location.href = '/';
            } else {
                // On other Chinese page, go to English homepage
                window.location.href = '/';
            }
        }
    });
})();
