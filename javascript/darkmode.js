// ============================================
//  LOVING HOMES — darkmode.js  (v3)
//  Shared across ALL pages
// ============================================

(function () {
    // Apply dark mode instantly before page renders (no flash)
    if (localStorage.getItem('lh-darkmode') === 'true') {
        document.documentElement.classList.add('dark');
    }
})();

console.log('✅ darkmode.js loaded');