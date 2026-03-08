// ============================================
//  LOVING HOMES — about.js
// ============================================

// ── Navbar scroll shadow ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));

// ── Mobile menu ──
const menuBtn  = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn) if (menuBtn) menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
if (navLinks) if (navLinks) navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── Scroll reveal ──
const style = document.createElement('style');
style.textContent = `
    .value-card, .team-card, .trust-card, .testimonial-card {
        opacity: 0; transform: translateY(24px);
    }
    .value-card.visible, .team-card.visible, .trust-card.visible, .testimonial-card.visible {
        opacity: 1; transform: translateY(0);
        transition: opacity .5s ease, transform .5s ease;
    }
    .featured-testimonial.visible { transform: translateY(-8px); }
`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 90);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.value-card, .team-card, .trust-card, .testimonial-card')
    .forEach(el => observer.observe(el));

// ── Animated stats counter ──
function animateCounter(el, target, suffix = '') {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current) + suffix;
        }
    }, 20);
}

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nums = entry.target.querySelectorAll('.stat-num');
            nums.forEach(num => {
                const text = num.textContent;
                if (text.includes('8+'))   animateCounter(num, 8, '+');
                if (text.includes('500+')) animateCounter(num, 500, '+');
                if (text.includes('12'))   animateCounter(num, 12, '');
                if (text.includes('100%')) animateCounter(num, 100, '%');
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

// ── Rating System ──
const labels = ['', 'Poor 😕', 'Fair 😐', 'Good 😊', 'Great 😄', 'Excellent! 🤩'];
let selectedRating = 0;

const stars = document.querySelectorAll('.star');
const ratingLabel = document.getElementById('ratingLabel');

stars.forEach(star => {
    // Hover
    star.addEventListener('mouseenter', () => {
        const val = +star.dataset.val;
        stars.forEach(s => s.classList.toggle('hovered', +s.dataset.val <= val));
        ratingLabel.textContent = labels[val];
    });
    star.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hovered'));
        ratingLabel.textContent = selectedRating ? labels[selectedRating] : 'Click a star to rate';
    });
    // Click
    star.addEventListener('click', () => {
        selectedRating = +star.dataset.val;
        stars.forEach(s => {
            s.classList.toggle('selected', +s.dataset.val <= selectedRating);
            s.classList.remove('hovered');
        });
        ratingLabel.textContent = labels[selectedRating];
    });
});

function submitRating() {
    if (!selectedRating) {
        ratingLabel.textContent = '⚠️ Please select a star rating first!';
        ratingLabel.style.color = '#e53e3e';
        return;
    }
    ratingLabel.style.color = '';
    document.getElementById('ratingForm').style.display = 'none';
    document.querySelector('.rating-stars-wrap').style.display = 'none';
    const success = document.getElementById('ratingSuccess');
    success.classList.add('show');
    document.getElementById('submittedStars').textContent = '★'.repeat(selectedRating) + '☆'.repeat(5 - selectedRating);
}

console.log('✅ Loving Homes — about.js loaded');