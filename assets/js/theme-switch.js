/**
 * Theme Switch Functionality
 * Handles dark/light mode toggling with system preference detection
 * and localStorage persistence
 */

(function () {
    'use strict';

    const THEME_KEY = 'theme-preference';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';

    /**
     * Get the user's preferred theme
     * Priority: localStorage > system preference > light (default)
     */
    function getPreferredTheme() {
        // Check localStorage first
        const storedTheme = localStorage.getItem(THEME_KEY);
        if (storedTheme === DARK_THEME || storedTheme === LIGHT_THEME) {
            return storedTheme;
        }

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return DARK_THEME;
        }

        // Default to light theme
        return LIGHT_THEME;
    }

    /**
     * Apply theme to the document
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        // Update toggle checkbox state
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.checked = theme === DARK_THEME;
        }

        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === DARK_THEME ? '#0f172a' : '#ffffff');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = theme === DARK_THEME ? '#0f172a' : '#ffffff';
            document.head.appendChild(meta);
        }
    }

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
        const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

        // Save preference
        localStorage.setItem(THEME_KEY, newTheme);

        // Apply new theme
        applyTheme(newTheme);
    }

    /**
     * Initialize theme functionality
     */
    function initTheme() {
        // Apply initial theme immediately to prevent flash
        const theme = getPreferredTheme();
        applyTheme(theme);

        // Listen for toggle changes
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('change', toggleTheme);
        }

        // Listen for system preference changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

            // Use modern addEventListener if available, fallback to addListener
            const handler = function (e) {
                // Only auto-switch if user hasn't set a preference
                if (!localStorage.getItem(THEME_KEY)) {
                    applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
                }
            };

            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', handler);
            } else if (mediaQuery.addListener) {
                mediaQuery.addListener(handler);
            }
        }
    }

    // Run initialization
    // Use DOMContentLoaded for DOM-dependent setup
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Apply theme immediately to prevent flash of wrong theme
    // This runs before DOMContentLoaded
    const earlyTheme = getPreferredTheme();
    document.documentElement.setAttribute('data-theme', earlyTheme);
})();
