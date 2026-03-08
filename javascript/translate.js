// ============================================
//  LOVING HOMES — translate.js  (v1)
//  Shared across all pages that support translation
// ============================================

(function () {
    // Apply saved language instantly on page load
    const savedLang = localStorage.getItem('lh-lang') || 'en';
    if (savedLang === 'zh') applyLanguage('zh');
})();

function applyLanguage(lang) {
    // All elements with data-en / data-zh
    document.querySelectorAll('[data-en], [data-zh]').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (!text) return;

        // Use innerHTML for elements that contain HTML tags (spans etc.)
        if (text.includes('<')) {
            el.innerHTML = text;
        } else {
            el.textContent = text;
        }
    });

    // Textareas with data-en-placeholder / data-zh-placeholder
    document.querySelectorAll('[data-en-placeholder]').forEach(el => {
        const ph = el.getAttribute('data-' + lang + '-placeholder');
        if (ph) el.placeholder = ph;
    });

    // Update html lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // Save
    localStorage.setItem('lh-lang', lang);
}

console.log('✅ translate.js loaded');