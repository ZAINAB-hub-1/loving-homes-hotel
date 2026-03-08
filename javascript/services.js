// ============================================
//  LOVING HOMES — services.js
// ============================================

// ── Navbar scroll shadow ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile menu toggle ──
const menuBtn  = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn) menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
if (navLinks) navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ── Modal data ──
const modalData = {
    grooming: {
        icon: '✂️',
        title: 'Grooming Salon & Spa',
        title_zh: '美容沙龙与水疗',
        price: '$25 – $60 &nbsp;|&nbsp; ¥180 – ¥435',
        features: [
            '🛁 Full bath & professional blowdry',
            '✂️ Breed-specific haircut & trimming',
            '💅 Nail clipping & filing',
            '👂 Ear cleaning & hygiene check',
            '🌸 Conditioning spa treatment',
            '🎀 Finishing touches & light fragrance',
        ],
        features_zh: [
            '🛁 全身浴及专业吹干',
            '✂️ 根据品种定制的修剪',
            '💅 修剪及打磨指甲',
            '👂 耳部清洁及卫生检查',
            '🌸 护发水疗护理',
            '🎀 完美收尾及淡香喷雾',
        ],
        note: '💡 Price varies by dog size and breed. Contact us for an exact quote.',
        note_zh: '💡 价格因狗狗大小和品种而异，请联系我们获取准确报价。',
    },
    rooms: {
        icon: '🛏️',
        title: 'Heated & Cooled Rooms with TV',
        title_zh: '冷暖空调客房（含电视）',
        price: '$40 / night &nbsp;|&nbsp; ¥290 / night',
        features: [
            '🌡️ Underfloor heating & cooling system',
            '📺 Personal television in every room',
            '🛏️ Cozy bed with premium soft bedding',
            '🔒 Safe, private & fully secured',
            '🧼 Cleaned & sanitised daily',
            '📸 Daily photo updates sent to you',
        ],
        features_zh: [
            '🌡️ 地暖及冷气系统',
            '📺 每间客房配备个人电视',
            '🛏️ 配有优质软垫的舒适床铺',
            '🔒 安全、私密且全面保障',
            '🧼 每日清洁消毒',
            '📸 每日向您发送照片更新',
        ],
        note: '💡 Rooms are private — your dog will never share with strangers.',
        note_zh: '💡 客房为私人专属——您的狗狗不会与陌生人共享。',
    },
    delivery: {
        icon: '🚗',
        title: 'Delivery Service',
        title_zh: '上门接送服务',
        price: '$10 – $20 &nbsp;|&nbsp; ¥72 – ¥145',
        features: [
            '📍 Door-to-door pick-up from your home',
            '🏠 Safe return when the stay is over',
            '🛡️ Trained drivers who handle dogs with care',
            '📱 Notification when we\'re on the way',
            '🗺️ Available throughout Hong Kong',
            '⏰ Flexible scheduling to suit your time',
        ],
        features_zh: [
            '📍 从您家门上门接送',
            '🏠 住宿结束后安全送回',
            '🛡️ 经过培训、善待狗狗的司机',
            '📱 出发时发送通知',
            '🗺️ 覆盖香港全境',
            '⏰ 灵活预约，配合您的时间',
        ],
        note: '💡 Price depends on distance. Contact us for an exact quote.',
        note_zh: '💡 价格根据距离而定，请联系我们获取准确报价。',
    },
    pastures: {
        icon: '🌿',
        title: 'Safe Outdoor Pastures',
        title_zh: '安全户外草地',
        price: 'Included in all packages &nbsp;|&nbsp; 包含在所有套餐中',
        features: [
            '🌳 Fully fenced & secured — no escape risk',
            '🌱 Lush natural grass areas to roam freely',
            '☀️ Fresh open air & natural sunlight',
            '👁️ Always supervised by our trained staff',
            '🐕 Safe socialisation with friendly dogs',
            '🌧️ Covered shaded areas for hot or rainy days',
        ],
        features_zh: [
            '🌳 全封闭安全围栏——无逃跑风险',
            '🌱 郁郁葱葱的天然草地，自由奔跑',
            '☀️ 新鲜空气和自然阳光',
            '👁️ 受训员工全程监督',
            '🐕 与友好狗狗安全社交',
            '🌧️ 设有遮阳避雨区域',
        ],
        note: '💡 Outdoor time is scheduled daily based on weather & your dog\'s energy.',
        note_zh: '💡 户外活动根据天气和您狗狗的精力每日安排。',
    },
    vet: {
        icon: '🩺',
        title: '24/7 Veterinary Services',
        title_zh: '全天候兽医服务',
        price: 'Included in all packages &nbsp;|&nbsp; 包含在所有套餐中',
        features: [
            '⏰ Certified vets on-site 24 hours a day',
            '💊 Medication administration if needed',
            '🚨 Emergency response at any time',
            '📋 Full health monitoring & daily check-ups',
            '🧬 Allergy & dietary restriction management',
            '📞 Immediate contact with owner if anything arises',
        ],
        features_zh: [
            '⏰ 认证兽医24小时驻场',
            '💊 按需给药',
            '🚨 随时紧急响应',
            '📋 全面健康监测及每日检查',
            '🧬 过敏及饮食限制管理',
            '📞 如有异常立即联系主人',
        ],
        note: '💡 We partner with a fully licensed veterinary clinic for any advanced care needed.',
        note_zh: '💡 我们与持牌兽医诊所合作，提供所需的高级护理。',
    },
    play: {
        icon: '🎾',
        title: 'Play & Monitoring',
        title_zh: '玩耍与监护',
        price: '$10 / day &nbsp;|&nbsp; ¥72 / day',
        features: [
            '🌲 Daily walks in the surrounding forest',
            '🌱 Private grass area for free play',
            '🏟️ Indoor playground — fun on rainy days',
            '🏃 Agility course for energetic dogs',
            '🏖️ Sand digging area — endlessly entertaining!',
            '👁️ Constant monitoring & activity reports',
        ],
        features_zh: [
            '🌲 每日森林散步',
            '🌱 私人草坪自由玩耍',
            '🏟️ 室内游乐场——雨天也开心',
            '🏃 适合活力狗狗的敏捷训练场',
            '🏖️ 沙坑挖掘区——乐此不疲！',
            '👁️ 持续监护及活动报告',
        ],
        note: '💡 Activities are tailored to your dog\'s age, size & energy level.',
        note_zh: '💡 活动根据您狗狗的年龄、大小和精力量身定制。',
    },
};

const overlay = document.getElementById('modalOverlay');

function openModal(key) {
    const data = modalData[key];
    if (!data) return;
    const isZh = (localStorage.getItem('lh-lang') || 'en') === 'zh';

    document.getElementById('modalIcon').textContent  = data.icon;
    document.getElementById('modalTitle').textContent = isZh ? data.title_zh : data.title;
    document.getElementById('modalPrice').innerHTML   = '💰 ' + data.price;
    document.getElementById('modalNote').textContent  = isZh ? data.note_zh : data.note;

    const features = isZh ? data.features_zh : data.features;
    document.getElementById('modalFeatures').innerHTML = features.map(f => `<li>${f}</li>`).join('');

    const cta = document.getElementById('modalCta');
    if (cta) cta.textContent = isZh ? '立即预订 🐾' : 'Book Now 🐾';

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

// ── Scroll-reveal ──
const style = document.createElement('style');
style.textContent = `
    .service-card { opacity: 0; transform: translateY(28px); }
    .service-card.visible { opacity: 1; transform: translateY(0); transition: opacity .5s ease, transform .5s ease; }
`;
document.head.appendChild(style);

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card').forEach(card => observer.observe(card));

// ── Search ──
function searchServices(val) {
    const query = val.toLowerCase().trim();
    const cards = document.querySelectorAll('.service-card');
    let found = 0;
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!query || text.includes(query)) { card.style.display = ''; found++; }
        else { card.style.display = 'none'; }
    });
    document.getElementById('searchClear').style.display = val ? 'block' : 'none';
    let noRes = document.getElementById('noResults');
    if (!noRes) {
        noRes = document.createElement('p');
        noRes.id = 'noResults'; noRes.className = 'no-results';
        document.querySelector('.services-grid').appendChild(noRes);
    }
    const isZh = (localStorage.getItem('lh-lang') || 'en') === 'zh';
    noRes.textContent = isZh ? '🔍 未找到相关服务，请尝试其他关键词。' : '🔍 No services found. Try a different keyword.';
    noRes.classList.toggle('show', found === 0 && query !== '');
}

function clearSearch() {
    document.getElementById('serviceSearch').value = '';
    searchServices('');
}

console.log('✅ Loving Homes — services.js loaded');