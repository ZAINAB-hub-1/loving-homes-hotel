// ============================================
//  LOVING HOMES — packages.js
// ============================================

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

const menuBtn  = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn) menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
if (navLinks) navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ── Scroll-reveal ──
const style = document.createElement('style');
style.textContent = `
    .package-row { opacity: 0; transform: translateY(32px); }
    .package-row.visible { opacity: 1; transform: translateY(0); transition: opacity .6s ease, transform .6s ease; }
`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.package-row').forEach(row => observer.observe(row));

// ── Book & Pay Modal ──
const payOverlay = document.getElementById('payOverlay');

const pkgNames = {
    en: { Premium: 'Premium', Classic: 'Classic', Day: 'Day', Custom: 'Custom' },
    zh: { Premium: '高级',    Classic: '经典',    Day: '日间', Custom: '定制' }
};

function openPay(pkg) {
    const isZh = (localStorage.getItem('lh-lang') || 'en') === 'zh';
    const name = isZh ? pkgNames.zh[pkg] : pkgNames.en[pkg];

    document.getElementById('payTitle').textContent = isZh
        ? `预订${name}套餐` : `Book ${name} Package`;

    document.getElementById('paySubtitle').textContent = pkg === 'Custom'
        ? (isZh ? '填写您的信息，我们将为您制定个性化方案。' : 'Fill in your details and we\'ll create a personalised plan.')
        : (isZh ? `请填写以下信息完成${name}套餐预订。` : `Complete your ${name} Package booking below.`);

    document.querySelector('.pay-form').style.display = 'flex';
    document.getElementById('paySuccess').classList.remove('show');
    payOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closePay() {
    payOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

function confirmPay() {
    const isZh = (localStorage.getItem('lh-lang') || 'en') === 'zh';
    const name  = document.getElementById('payName').value.trim();
    const email = document.getElementById('payEmail').value.trim();
    const date  = document.getElementById('payDate').value;
    if (!name || !email || !date) {
        alert(isZh ? '请填写您的姓名、电子邮件和日期。' : 'Please fill in your name, email and date.');
        return;
    }
    document.querySelector('.pay-form').style.display = 'none';
    document.getElementById('paySuccess').classList.add('show');
}

function formatCard(el) {
    let val = el.value.replace(/\D/g, '').substring(0, 16);
    el.value = val.replace(/(.{4})/g, '$1 ').trim();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closePay(); });

console.log('✅ Loving Homes — packages.js loaded');