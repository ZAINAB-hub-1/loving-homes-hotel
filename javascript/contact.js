// ============================================
//  LOVING HOMES — contact.js  (v2 + i18n)
// ============================================

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));

const menuBtn  = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn) menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
if (navLinks) navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── i18n error messages ──
const errors = {
    en: {
        nameRequired:  '⚠️ Name is required.',
        nameFormat:    '⚠️ Name must be in English letters only.',
        phoneRequired: '⚠️ Phone number is required.',
        phoneFormat:   '⚠️ Enter a valid Chinese number: 1XXXXXXXXXX (11 digits)',
        emailRequired: '⚠️ Email address is required.',
        emailFormat:   '⚠️ Please enter a valid email address.',
        subjectReq:    '⚠️ Please select a subject.',
        msgRequired:   '⚠️ Message cannot be empty.',
        msgShort:      '⚠️ Message must be at least 10 characters.',
    },
    zh: {
        nameRequired:  '⚠️ 请输入您的姓名。',
        nameFormat:    '⚠️ 姓名只能使用英文字母。',
        phoneRequired: '⚠️ 请输入电话号码。',
        phoneFormat:   '⚠️ 请输入有效的中国手机号码：1XXXXXXXXXX（11位数字）',
        emailRequired: '⚠️ 请输入电子邮件地址。',
        emailFormat:   '⚠️ 请输入有效的电子邮件地址。',
        subjectReq:    '⚠️ 请选择主题。',
        msgRequired:   '⚠️ 留言不能为空。',
        msgShort:      '⚠️ 留言至少需要10个字符。',
    }
};

function getLang() { return localStorage.getItem('lh-lang') || 'en'; }
function t(key)    { return errors[getLang()][key]; }

// ── Error helpers ──
function showError(inputId, msg) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.classList.add('input-error');
    let err = input.parentNode.querySelector('.error-msg');
    if (!err) { err = document.createElement('span'); err.className = 'error-msg'; input.parentNode.appendChild(err); }
    err.textContent = msg;
}
function clearError(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.classList.remove('input-error');
    const err = input.parentNode.querySelector('.error-msg');
    if (err) err.textContent = '';
}
function clearAllErrors() {
    ['nameInput','phoneInput','emailInput','messageInput'].forEach(clearError);
    const sel = document.getElementById('subjectInput');
    if (sel) { sel.classList.remove('input-error'); const e = sel.parentNode.querySelector('.error-msg'); if(e) e.textContent=''; }
}

['nameInput','phoneInput','emailInput','messageInput'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearError(id));
});

// ── Form submit ──
function submitForm() {
    clearAllErrors();
    let valid = true;

    const name    = document.getElementById('nameInput')?.value.trim()    || '';
    const phone   = document.getElementById('phoneInput')?.value.trim()   || '';
    const email   = document.getElementById('emailInput')?.value.trim()   || '';
    const subject = document.getElementById('subjectInput')?.value        || '';
    const message = document.getElementById('messageInput')?.value.trim() || '';

    if (!name)                              { showError('nameInput',  t('nameRequired'));  valid = false; }
    else if (!/^[A-Za-z\s'-]+$/.test(name)){ showError('nameInput',  t('nameFormat'));    valid = false; }

    if (!phone)                             { showError('phoneInput', t('phoneRequired')); valid = false; }
    else if (!/^1\d{10}$/.test(phone))      { showError('phoneInput', t('phoneFormat'));   valid = false; }

    if (!email)                             { showError('emailInput', t('emailRequired')); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('emailInput', t('emailFormat')); valid = false; }

    if (!subject) {
        const sel = document.getElementById('subjectInput');
        if (sel) {
            sel.classList.add('input-error');
            let e = sel.parentNode.querySelector('.error-msg');
            if (!e) { e = document.createElement('span'); e.className = 'error-msg'; sel.parentNode.appendChild(e); }
            e.textContent = t('subjectReq');
        }
        valid = false;
    }

    if (!message)              { showError('messageInput', t('msgRequired')); valid = false; }
    else if (message.length < 10) { showError('messageInput', t('msgShort'));    valid = false; }

    if (!valid) return;

    const formEl    = document.getElementById('contactForm');
    const formSub   = document.querySelector('.form-sub');
    const formTitle = document.querySelector('.form-wrap h2');
    if (formEl)    formEl.style.display    = 'none';
    if (formSub)   formSub.style.display   = 'none';
    if (formTitle) formTitle.style.display = 'none';
    document.getElementById('successMsg').classList.add('show');
}

// ── Translate select options on lang change ──
function translateSelectOptions() {
    const sel = document.getElementById('subjectInput');
    if (!sel) return;
    const isZh = getLang() === 'zh';
    sel.querySelectorAll('option').forEach(opt => {
        const key = isZh ? opt.getAttribute('data-zh') : opt.getAttribute('data-en');
        if (key) opt.textContent = key;
    });
}

// Run on load
translateSelectOptions();

// Listen for language changes (settings page triggers storage event)
window.addEventListener('storage', e => {
    if (e.key === 'lh-lang') translateSelectOptions();
});

console.log('✅ contact.js v2+i18n loaded');