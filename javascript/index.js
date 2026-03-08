// ============================================
//  LOVING HOMES — index.js  (v1)
// ============================================

// ── Navbar scroll shadow ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile menu toggle ──
const menuBtn  = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn) menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
});

// Close menu when a link is clicked
if (navLinks) navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Scroll-reveal for feature cards ──
const style = document.createElement('style');
style.textContent = `
    .feature-card { opacity: 0; transform: translateY(24px); transition: opacity 0.5s ease, transform 0.5s ease; }
    .feature-card.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .service-card, .review-card').forEach(card => observer.observe(card));

console.log('✅ Loving Homes — index.js loaded');
// ── Video Player ──
function playVideo() {
    const video   = document.getElementById('hotelVideo');
    const overlay = document.getElementById('videoOverlay');
    overlay.classList.add('hidden');
    video.controls = true;
    video.play();
}