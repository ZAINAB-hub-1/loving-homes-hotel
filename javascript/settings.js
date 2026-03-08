// ============================================
//  LOVING HOMES — settings.js  (v3)
// ============================================

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));

// ── Dark Mode ──
const darkToggle = document.getElementById('darkModeToggle');
if (localStorage.getItem('lh-darkmode') === 'true') darkToggle.checked = true;

darkToggle.addEventListener('change', () => {
    if (darkToggle.checked) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('lh-darkmode', 'true');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('lh-darkmode', 'false');
    }
});

// ── Language ──
function setLang(lang) {
    localStorage.setItem('lh-lang', lang);
    document.getElementById('btnEN').classList.toggle('lang-active', lang === 'en');
    document.getElementById('btnZH').classList.toggle('lang-active', lang === 'zh');

    const msg = document.getElementById('saveMsg');
    msg.textContent = lang === 'zh'
        ? '✅ 语言已切换为中文！前往 About Us 页面查看效果。'
        : '✅ Language set to English!';
    msg.classList.add('show');
    setTimeout(() => msg.classList.remove('show'), 3500);
}

// Load saved language state
const savedLang = localStorage.getItem('lh-lang') || 'en';
document.getElementById('btnEN').classList.toggle('lang-active', savedLang === 'en');
document.getElementById('btnZH').classList.toggle('lang-active', savedLang === 'zh');

// ── Save Profile ──
function saveProfile() {
    const username = document.getElementById('username').value.trim();
    const email    = document.getElementById('settingsEmail').value.trim();
    if (!username) { alert('⚠️ Please enter a username.'); return; }
    if (!email)    { alert('⚠️ Please enter an email address.'); return; }
    const msg = document.getElementById('saveMsg');
    msg.textContent = '✅ Profile saved successfully!';
    msg.classList.add('show');
    setTimeout(() => msg.classList.remove('show'), 3000);
}

console.log('✅ settings.js v3 loaded');