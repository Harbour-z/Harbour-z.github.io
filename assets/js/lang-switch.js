// Language Switch Functionality
(function () {
    const toggle = document.getElementById('lang-toggle');
    const currentPath = window.location.pathname;

    // Set initial state based on current page
    if (currentPath.includes('/cn/')) {
        toggle.checked = true;
    }

    // Handle toggle change
    toggle.addEventListener('change', function () {
        if (this.checked) {
            // Switch to Chinese
            if (currentPath === '/' || currentPath === '/index.html') {
                window.location.href = '/cn/';
            } else {
                window.location.href = '/cn/';
            }
        } else {
            // Switch to English
            window.location.href = '/';
        }
    });
})();
