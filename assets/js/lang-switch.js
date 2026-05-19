/**
 * Language Switch Functionality
 * Handles switching between English and Chinese versions.
 *
 * Path mapping rules:
 *   /            <-> /cn/
 *   /foo/bar/    <-> /cn/foo/bar/
 *   /cn/foo/bar/ <-> /foo/bar/
 * Falls back to the language home (`/` or `/cn/`) when no counterpart exists.
 */
(function () {
    'use strict';

    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;

    const CN_PREFIX = '/cn/';
    const path = window.location.pathname;
    const hash = window.location.hash || '';

    const isChinesePage = path === '/cn' || path.startsWith(CN_PREFIX);
    toggle.checked = isChinesePage;

    function toEnglish(p) {
        if (p === '/cn' || p === CN_PREFIX) return '/';
        if (p.startsWith(CN_PREFIX)) return '/' + p.slice(CN_PREFIX.length);
        return p || '/';
    }

    function toChinese(p) {
        if (p === '/' || p === '' || p === '/index.html') return CN_PREFIX;
        if (p.startsWith(CN_PREFIX) || p === '/cn') return p;
        return CN_PREFIX + p.replace(/^\/+/, '');
    }

    toggle.addEventListener('change', function () {
        const target = this.checked ? toChinese(path) : toEnglish(path);
        window.location.href = target + hash;
    });
})();
