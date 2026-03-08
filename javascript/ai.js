// ============================================
//  LOVING HOMES — ai.js  (v3)
//  Enhanced Rule-Based | EN + ZH | Smart Recommender
// ============================================

// ── Navbar ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));

// ── Mobile menu ──
const menuBtn  = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn) menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
if (navLinks) navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ============================================
//  CONVERSATION STATE — Package Recommender
// ============================================
const state = {
    mode: 'normal',       // 'normal' | 'recommending'
    step: 0,              // which question we're on
    answers: {}           // collected answers
};

const recommendQuestions = [
    {
        key: 'duration',
        ask: `🐾 I'd love to help find the perfect package for your dog!<br><br>
        First — <strong>how long will your dog be staying?</strong><br><br>
        🌞 Just <strong>1 day</strong><br>
        📅 A <strong>few days</strong> (2–6 days)<br>
        🗓️ A <strong>week or more</strong><br><br>
        Type: <em>1 day</em>, <em>few days</em>, or <em>week</em> 🐶`,
        zh: `🐾 我来帮您找到最适合您爱犬的套餐！<br><br>
        首先——<strong>您的狗狗会住多久？</strong><br><br>
        🌞 只需 <strong>1天</strong><br>
        📅 <strong>几天</strong>（2–6天）<br>
        🗓️ <strong>一周或更长</strong><br><br>
        请输入：<em>1天</em>、<em>几天</em> 或 <em>一周</em> 🐶`
    },
    {
        key: 'medical',
        ask: `🩺 Does your dog have any <strong>special medical needs</strong>?<br><br>
        (e.g. medication, allergies, recent surgery, chronic condition)<br><br>
        Reply: <em>yes</em> or <em>no</em>`,
        zh: `🩺 您的狗狗是否有<strong>特殊医疗需求</strong>？<br><br>
        （例如：需要服药、过敏、近期手术、慢性病）<br><br>
        请回复：<em>有</em> 或 <em>没有</em>`
    },
    {
        key: 'grooming',
        ask: `✂️ Would you like <strong>grooming</strong> to be included during the stay?<br><br>
        (bathing, haircut, nail trim, ear cleaning)<br><br>
        Reply: <em>yes</em> or <em>no</em>`,
        zh: `✂️ 您是否希望在住宿期间包含<strong>美容护理</strong>服务？<br><br>
        （洗澡、剪毛、修甲、清耳）<br><br>
        请回复：<em>是</em> 或 <em>否</em>`
    }
];

function getRecommendation() {
    const { duration, medical, grooming } = state.answers;

    const isDay     = duration && (duration.includes('1') || duration.includes('day') || duration.includes('一天') || duration.includes('1天'));
    const isLong    = duration && (duration.includes('week') || duration.includes('一周') || duration.includes('长'));
    const needsMed  = medical  && (medical.includes('yes') || medical.includes('有') || medical.includes('y'));
    const needsGroom= grooming && (grooming.includes('yes') || grooming.includes('是') || grooming.includes('y'));

    // Special / long stay → Custom
    if (isLong || needsMed) {
        return `🎨 Based on your answers, I recommend the <strong>Custom Package</strong>!<br><br>
        ✅ Designed for <strong>long stays</strong> or <strong>special medical needs</strong><br>
        ✅ Fully <strong>personalised</strong> care plan<br>
        ✅ Flexible schedule tailored to your dog<br>
        ✅ 24/7 vet monitoring included<br><br>
        📞 Please visit our <strong>Contact Us</strong> page so our team can create the perfect plan for your dog! 🐾`;
    }

    // 1 day → Day Package
    if (isDay && !needsGroom) {
        return `🌞 Based on your answers, the <strong>Day Package</strong> is perfect for you!<br><br>
        ✅ 2 walks per day<br>
        ✅ Outdoor play area & agility course<br>
        ✅ Sand digging area<br>
        ✅ Full supervision<br><br>
        Head to our <strong>Packages</strong> page to book! 🐾`;
    }

    // 1 day + grooming → Classic
    if (isDay && needsGroom) {
        return `🏅 Based on your answers, the <strong>Classic Package</strong> suits you best!<br><br>
        ✅ 3 walks per day<br>
        ✅ Indoor play area & relaxation zone<br>
        ✅ <strong>Grooming session included</strong> ✂️<br>
        ✅ Cozy room with heating/cooling<br><br>
        Head to our <strong>Packages</strong> page to book! 🐾`;
    }

    // Few days + grooming → Premium
    if (needsGroom) {
        return `⭐ Based on your answers, I recommend the <strong>Premium Package</strong>!<br><br>
        ✅ 4 walks per day<br>
        ✅ Private grass area<br>
        ✅ Daily updates & photos sent to you 📸<br>
        ✅ Treats as agreed 🍖<br>
        ✅ Premium room with TV & underfloor heating<br><br>
        You can also add a grooming session — just mention it when booking!<br>
        Head to our <strong>Packages</strong> page to book! 🐾`;
    }

    // Few days, no special needs → Classic
    return `🏅 Based on your answers, the <strong>Classic Package</strong> is a great fit!<br><br>
    ✅ 3 walks per day<br>
    ✅ Indoor play area & relaxation zone<br>
    ✅ Grooming & cleaning session<br>
    ✅ Cozy room with heating & cooling<br><br>
    Head to our <strong>Packages</strong> page to book! 🐾`;
}

function handleRecommendFlow(input) {
    const text = input.toLowerCase().trim();
    const zh = isZh(input);

    // Save answer for current step
    const currentQ = recommendQuestions[state.step];
    state.answers[currentQ.key] = text;
    state.step++;

    // More questions?
    if (state.step < recommendQuestions.length) {
        const nextQ = recommendQuestions[state.step];
        return zh ? nextQ.zh : nextQ.ask;
    }

    // All answered — give recommendation
    state.mode = 'normal';
    state.step = 0;
    return getRecommendation();
}

// ============================================
//  LANGUAGE DETECTION
// ============================================
function isZh(text) {
    return /[\u4e00-\u9fff]/.test(text);
}

// ============================================
//  KNOWLEDGE BASE — English + Chinese
// ============================================
const knowledge = [

    // ── RECOMMEND TRIGGER ──
    {
        keys: ['recommend', 'which package', 'best for me', 'suggest', 'help me choose', 'not sure', 'which one',
               '推荐', '哪个套餐', '帮我选', '不确定', '哪一个', '最适合'],
        answer: null, // handled by flow
        trigger: 'recommend'
    },

    // ── GREETINGS ──
    {
        keys: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon',
               '你好', '您好', '早上好', '晚上好', '嗨', '哈喽'],
        answers: [
            `👋 Hello! Welcome to <strong>Loving Homes</strong> — Hong Kong's premium dog hotel! 🐾<br><br>
            I can help you with:<br>
            ✂️ <strong>Services</strong> &nbsp;|&nbsp; 📦 <strong>Packages</strong> &nbsp;|&nbsp; 📞 <strong>Booking</strong><br><br>
            Or type <em>"recommend"</em> and I'll find the perfect package for your dog! 🐶`,

            `🐾 Hi there! I'm the Loving Homes assistant.<br><br>
            Ask me about our <strong>grooming, rooms, packages</strong> or how to <strong>book</strong>!<br>
            Or type <em>"recommend"</em> for a personalised package suggestion! 🏠`,
        ],
        answers_zh: [
            `👋 您好！欢迎来到 <strong>Loving Homes</strong> — 香港顶级宠物酒店！🐾<br><br>
            我可以帮您了解：<br>
            ✂️ <strong>服务</strong> &nbsp;|&nbsp; 📦 <strong>套餐</strong> &nbsp;|&nbsp; 📞 <strong>预订</strong><br><br>
            或输入<em>"推荐"</em>，我将为您的爱犬找到最合适的套餐！🐶`
        ]
    },

    // ── THANKS ──
    {
        keys: ['thank', 'thanks', 'thank you', 'thx', 'great', 'awesome', 'perfect', 'wonderful', 'amazing',
               '谢谢', '感谢', '太好了', '完美', '很棒', '非常感谢'],
        answers: [
            `🐾 You're so welcome! If you have more questions, I'm always here! 😊`,
            `💛 Happy to help! Your dog deserves the best — and that's exactly what we offer. Anything else I can assist with? 🐶`
        ],
        answers_zh: [
            `🐾 不客气！如果您还有其他问题，随时可以问我！😊`,
            `💛 很高兴能帮到您！您的爱犬值得最好的照顾。还有什么我可以帮助您的吗？🐶`
        ]
    },

    // ── ALL SERVICES ──
    {
        keys: ['services', 'offer', 'what do you', 'what you offer', 'available', 'provide', 'all services',
               '服务', '提供什么', '有什么服务', '所有服务'],
        answers: [`🏠 At <strong>Loving Homes</strong>, we offer <strong>6 premium services</strong>:<br><br>
        ✂️ <strong>Grooming Salon & Spa</strong> — Full grooming & spa treatments<br>
        🛏️ <strong>Heated & Cooled Rooms</strong> — Private rooms with TV & underfloor heating<br>
        🚗 <strong>Delivery Service</strong> — We pick up & drop off from your location<br>
        🌿 <strong>Safe Outdoor Pastures</strong> — Secured open spaces to roam freely<br>
        🩺 <strong>24/7 Veterinary Care</strong> — Certified vets on-site around the clock<br>
        🎾 <strong>Play & Monitoring</strong> — Forest walks, grass area & indoor playground<br><br>
        Which service would you like to know more about? 🐾`],
        answers_zh: [`🏠 在 <strong>Loving Homes</strong>，我们提供 <strong>6项优质服务</strong>：<br><br>
        ✂️ <strong>美容沙龙与水疗</strong> — 专业美容护理<br>
        🛏️ <strong>冷暖客房</strong> — 配备电视及地暖的私人房间<br>
        🚗 <strong>接送服务</strong> — 上门接送您的爱犬<br>
        🌿 <strong>安全户外牧场</strong> — 安全围栏的开阔空间<br>
        🩺 <strong>24/7兽医服务</strong> — 全天候专业兽医在场<br>
        🎾 <strong>游乐与监护</strong> — 森林散步、草地及室内游乐场<br><br>
        您想了解哪项服务？🐾`]
    },

    // ── GROOMING ──
    {
        keys: ['grooming', 'groom', 'spa', 'haircut', 'hair cut', 'bath', 'bathe', 'wash', 'trim', 'shampoo', 'nail', 'fur',
               '美容', '洗澡', '剪毛', '修甲', '护理', '水疗', '梳毛'],
        answers: [`✂️ Our <strong>Grooming Salon & Spa</strong>:<br><br>
        🛁 Full bath & blowdry<br>
        ✂️ Breed-specific haircuts & trimming<br>
        💅 Nail clipping & filing<br>
        👂 Ear cleaning<br>
        🌸 Spa treatments & conditioning<br>
        🎀 Finishing touches & fragrance<br><br>
        Every dog leaves looking and feeling amazing! 🐾`],
        answers_zh: [`✂️ 我们的<strong>美容沙龙与水疗</strong>服务：<br><br>
        🛁 全套洗澡及吹干<br>
        ✂️ 针对犬种的专业剪毛<br>
        💅 修剪及打磨指甲<br>
        👂 清洁耳道<br>
        🌸 水疗护理<br>
        🎀 完美造型收尾<br><br>
        每只狗狗离开时都光彩照人！🐾`]
    },

    // ── ROOMS ──
    {
        keys: ['room', 'rooms', 'sleep', 'bed', 'heating', 'cooling', 'tv', 'television', 'underfloor', 'suite', 'accommodation',
               '房间', '客房', '住宿', '睡觉', '电视', '地暖', '空调', '取暖'],
        answers: [`🛏️ Our <strong>rooms</strong> are designed for maximum comfort:<br><br>
        🌡️ <strong>Underfloor heating & cooling</strong> — perfect temperature year-round<br>
        📺 <strong>Personal TV</strong> in every room<br>
        🛏️ Cozy beds & premium soft bedding<br>
        🔒 Safe, secure, and fully private<br>
        📸 Daily photo updates sent to you<br>
        🧼 Cleaned & sanitised daily<br><br>
        Your dog will feel right at home! 😄🐾`],
        answers_zh: [`🛏️ 我们的<strong>客房</strong>专为最大舒适度而设计：<br><br>
        🌡️ <strong>地暖及空调</strong> — 全年保持完美温度<br>
        📺 每间房配备<strong>专属电视</strong><br>
        🛏️ 舒适床铺及高级软质寝具<br>
        🔒 安全、私密的独立空间<br>
        📸 每日为您发送照片更新<br>
        🧼 每日清洁消毒<br><br>
        您的爱犬会感觉宾至如归！😄🐾`]
    },

    // ── DELIVERY ──
    {
        keys: ['delivery', 'pickup', 'pick up', 'drop off', 'dropoff', 'transport', 'collect', 'driver', 'bring',
               '接送', '上门', '接狗', '送狗', '运输', '接送服务'],
        answers: [`🚗 Yes! We offer a <strong>door-to-door delivery service</strong>!<br><br>
        📍 We pick up your dog from your home<br>
        🏠 And safely return them when the stay is over<br>
        🛡️ Drivers are trained to handle dogs with care<br>
        📱 You'll be notified when we're on the way<br>
        🗺️ Available throughout Hong Kong<br><br>
        Just mention it when booking! 🐾`],
        answers_zh: [`🚗 是的！我们提供<strong>上门接送服务</strong>！<br><br>
        📍 我们从您家接走爱犬<br>
        🏠 住宿结束后安全送回<br>
        🛡️ 司机经过专业培训，温柔对待每只狗狗<br>
        📱 出发前会提前通知您<br>
        🗺️ 服务覆盖香港全区<br><br>
        预订时告知我们即可！🐾`]
    },

    // ── OUTDOOR ──
    {
        keys: ['outdoor', 'pasture', 'grass', 'outside', 'garden', 'open air', 'field', 'roam', 'run', 'nature',
               '户外', '草地', '牧场', '花园', '户外活动', '跑步', '大自然'],
        answers: [`🌿 Our <strong>Safe Outdoor Pastures</strong> — your dog's paradise!<br><br>
        🌳 Fully <strong>fenced & secured</strong> — no escape risk<br>
        🌱 Lush natural grass areas<br>
        ☀️ Fresh air & sunshine<br>
        👁️ Always supervised by our staff<br>
        🐕 Safe socialisation with other friendly dogs<br>
        🌧️ Covered areas for rainy days<br><br>
        Your dog can run, explore, and breathe freely! 🐾`],
        answers_zh: [`🌿 我们的<strong>安全户外牧场</strong>——爱犬的天堂！<br><br>
        🌳 全封闭安全围栏<br>
        🌱 郁郁葱葱的天然草地<br>
        ☀️ 新鲜空气与阳光<br>
        👁️ 全程工作人员监护<br>
        🐕 与友善狗狗安全社交<br>
        🌧️ 雨天有遮盖区域<br><br>
        您的爱犬可以自由奔跑探索！🐾`]
    },

    // ── VET ──
    {
        keys: ['vet', 'veterinary', 'veterinarian', 'doctor', 'medical', '24/7', '24 hours', 'health', 'sick', 'emergency', 'medicine', 'medication',
               '兽医', '医疗', '健康', '生病', '紧急', '药物', '医生', '24小时'],
        answers: [`🩺 Your dog's health is our <strong>top priority</strong>!<br><br>
        ⏰ <strong>24/7 veterinary care</strong> — always on-site<br>
        👨‍⚕️ Certified & experienced vet team<br>
        💊 Medication administration if needed<br>
        🚨 Emergency response at any time<br>
        📋 Full health monitoring & daily check-ups<br>
        📞 We'll contact you immediately if anything arises<br><br>
        Rest easy — your dog is in the safest hands! 🐾`],
        answers_zh: [`🩺 您爱犬的健康是我们的<strong>首要任务</strong>！<br><br>
        ⏰ <strong>24/7兽医服务</strong> — 全天候在场<br>
        👨‍⚕️ 认证且经验丰富的兽医团队<br>
        💊 如需服药可代为管理<br>
        🚨 随时应对紧急情况<br>
        📋 全面健康监测及每日检查<br>
        📞 如有任何异常立即联系您<br><br>
        放心交给我们，您的爱犬最安全！🐾`]
    },

    // ── PLAY ──
    {
        keys: ['play', 'walk', 'walks', 'forest', 'monitor', 'playground', 'indoor', 'agility', 'sand', 'exercise', 'active', 'activity',
               '玩耍', '散步', '森林', '游乐场', '室内', '敏捷', '沙地', '运动', '活动'],
        answers: [`🎾 Our <strong>Play & Monitoring</strong> service keeps your dog happy & active!<br><br>
        🌲 <strong>Forest walks</strong> — fresh air & new scents<br>
        🌱 <strong>Private grass area</strong> — safe free play<br>
        🏟️ <strong>Indoor playground</strong> — fun on rainy days<br>
        🏃 <strong>Agility course</strong> — great for energetic dogs<br>
        🏖️ <strong>Sand digging area</strong> — they'll love it!<br>
        👁️ <strong>Constant monitoring</strong> by trained staff<br><br>
        Your dog will never be bored with us! 🐾`],
        answers_zh: [`🎾 我们的<strong>游乐与监护</strong>服务让您的爱犬快乐又活跃！<br><br>
        🌲 <strong>森林散步</strong> — 新鲜空气与新奇气味<br>
        🌱 <strong>私人草地</strong> — 安全自由玩耍<br>
        🏟️ <strong>室内游乐场</strong> — 雨天也不无聊<br>
        🏃 <strong>敏捷训练场</strong> — 活力狗狗的最爱<br>
        🏖️ <strong>沙地挖掘区</strong> — 超级有趣！<br>
        👁️ <strong>全程专业监护</strong><br><br>
        在我们这里，您的爱犬绝不会感到无聊！🐾`]
    },

    // ── ALL PACKAGES ──
    {
        keys: ['packages', 'package', 'plans', 'plan', 'options', 'pricing', 'price', 'prices', 'cost', 'how much', 'fees', 'rates',
               '套餐', '方案', '价格', '费用', '多少钱', '收费', '报价'],
        answers: [`📦 We have <strong>4 packages</strong> to suit every dog:<br><br>
        ⭐ <strong>Premium</strong> — 4 walks/day, private grass, daily photos & treats<br>
        🏅 <strong>Classic</strong> — 3 walks/day, indoor play, grooming session included<br>
        🌞 <strong>Day</strong> — 2 walks/day, outdoor play, agility & sand area<br>
        🎨 <strong>Custom</strong> — Long stays or special needs, fully personalised<br><br>
        Not sure which to choose? Type <em>"recommend"</em> and I'll help! 🐾`],
        answers_zh: [`📦 我们有<strong>4个套餐</strong>满足每只狗狗的需求：<br><br>
        ⭐ <strong>尊享套餐</strong> — 每日4次散步、私人草地、每日照片及零食<br>
        🏅 <strong>经典套餐</strong> — 每日3次散步、室内游乐、包含美容护理<br>
        🌞 <strong>日托套餐</strong> — 每日2次散步、户外游乐、敏捷场及沙地<br>
        🎨 <strong>定制套餐</strong> — 长期住宿或特殊需求，完全个性化<br><br>
        不确定选哪个？输入<em>"推荐"</em>，我来帮您！🐾`]
    },

    // ── PREMIUM ──
    {
        keys: ['premium', 'best package', 'luxury', 'vip', 'most popular', 'top package',
               '尊享', '最好的套餐', '豪华', '最受欢迎'],
        answers: [`⭐ The <strong>Premium Package</strong> — our most loved choice!<br><br>
        🚶 <strong>4 walks per day</strong><br>
        🌱 <strong>Private grass area</strong><br>
        📸 <strong>Daily updates & photos</strong> sent to you<br>
        🍖 <strong>Treats</strong> as agreed<br>
        🛏️ Premium room with TV & underfloor heating<br>
        🩺 24/7 vet monitoring included<br><br>
        For owners who want only the <strong>very best</strong>! 🐾`],
        answers_zh: [`⭐ <strong>尊享套餐</strong> — 最受欢迎的选择！<br><br>
        🚶 每日<strong>4次散步</strong><br>
        🌱 <strong>私人草地</strong><br>
        📸 每日为您发送<strong>更新照片</strong><br>
        🍖 按约定提供<strong>零食</strong><br>
        🛏️ 配备电视及地暖的尊享客房<br>
        🩺 全天候兽医监护<br><br>
        为追求<strong>最高品质</strong>的主人而设！🐾`]
    },

    // ── CLASSIC ──
    {
        keys: ['classic', 'standard', 'regular', 'mid', 'middle',
               '经典', '标准', '普通'],
        answers: [`🏅 The <strong>Classic Package</strong> — comfort, fun & great value!<br><br>
        🚶 <strong>3 walks per day</strong><br>
        🏟️ <strong>Indoor play area</strong><br>
        😌 <strong>Relaxation zone</strong><br>
        ✂️ <strong>Grooming & cleaning session</strong> included<br>
        🛏️ Cozy room with heating & cooling<br><br>
        A wonderful all-round experience! 🐾`],
        answers_zh: [`🏅 <strong>经典套餐</strong> — 舒适、有趣、超值！<br><br>
        🚶 每日<strong>3次散步</strong><br>
        🏟️ <strong>室内游乐区</strong><br>
        😌 <strong>放松休闲区</strong><br>
        ✂️ 包含<strong>美容清洁</strong>护理<br>
        🛏️ 配备冷暖设备的舒适客房<br><br>
        全面优质的住宿体验！🐾`]
    },

    // ── DAY PACKAGE ──
    {
        keys: ['day package', 'day stay', 'daycare', 'day care', 'one day', 'single day', 'few hours',
               '日托', '一天套餐', '白天', '几小时'],
        answers: [`🌞 The <strong>Day Package</strong> — a fun-filled day!<br><br>
        🚶 <strong>2 walks per day</strong><br>
        🌿 <strong>Outdoor play area</strong><br>
        🏃 <strong>Agility course</strong><br>
        🏖️ <strong>Sand digging area</strong><br>
        👁️ Full supervision throughout<br><br>
        Perfect when you're busy for the day! 🐾`],
        answers_zh: [`🌞 <strong>日托套餐</strong> — 充满乐趣的一天！<br><br>
        🚶 每日<strong>2次散步</strong><br>
        🌿 <strong>户外游乐区</strong><br>
        🏃 <strong>敏捷训练场</strong><br>
        🏖️ <strong>沙地挖掘区</strong><br>
        👁️ 全程专业监护<br><br>
        当您忙碌时的完美选择！🐾`]
    },

    // ── CUSTOM ──
    {
        keys: ['custom', 'special', 'long stay', 'long term', 'personalised', 'personalized', 'specific', 'requirements', 'unique',
               '定制', '特殊', '长期', '个性化', '特定需求'],
        answers: [`🎨 The <strong>Custom Package</strong> — built just for your dog!<br><br>
        ✓ Ideal for <strong>long-term stays</strong><br>
        ✓ Perfect for dogs with <strong>special medical needs</strong><br>
        ✓ <strong>Fully personalised</strong> care plan<br>
        ✓ Flexible schedule & services<br><br>
        Contact us and we'll create the perfect plan! 🐾`],
        answers_zh: [`🎨 <strong>定制套餐</strong> — 专为您的爱犬量身定制！<br><br>
        ✓ 适合<strong>长期住宿</strong><br>
        ✓ 适合有<strong>特殊医疗需求</strong>的狗狗<br>
        ✓ <strong>完全个性化</strong>护理方案<br>
        ✓ 灵活的时间安排和服务内容<br><br>
        联系我们，我们将创建完美方案！🐾`]
    },

    // ── BOOKING ──
    {
        keys: ['book', 'booking', 'reserve', 'reservation', 'appointment', 'contact', 'phone', 'email', 'call', 'reach',
               '预订', '预约', '联系', '电话', '邮件', '怎么订'],
        answers: [`📞 Ready to book? We'd love to welcome your dog!<br><br>
        🌐 Visit our <strong>Contact Us</strong> page<br>
        📧 Email: <strong>info@lovinghomes.com</strong><br>
        📞 Phone: <strong>+852 1234 5678</strong><br>
        📍 Location: <strong>Hong Kong, China</strong><br>
        🕐 Available <strong>24/7</strong><br><br>
        We'll get back to you quickly! 🐾`],
        answers_zh: [`📞 准备预订了吗？我们期待您爱犬的到来！<br><br>
        🌐 访问我们的<strong>联系我们</strong>页面<br>
        📧 邮箱：<strong>info@lovinghomes.com</strong><br>
        📞 电话：<strong>+852 1234 5678</strong><br>
        📍 地址：<strong>中国香港</strong><br>
        🕐 全天候<strong>24/7</strong>服务<br><br>
        我们会尽快回复您！🐾`]
    },

    // ── ABOUT ──
    {
        keys: ['about', 'who are you', 'loving homes', 'history', 'experience', 'years', 'story',
               '关于', '你们是谁', '经验', '历史', '几年', '故事'],
        answers: [`🏠 <strong>Loving Homes</strong> — Where dogs feel at home!<br><br>
        ❤️ Premium dog hotel in <strong>Hong Kong</strong><br>
        📅 Over <strong>8 years</strong> of experience<br>
        🐕 Cared for <strong>500+ happy dogs</strong><br>
        👨‍⚕️ Team of <strong>12 dedicated professionals</strong><br>
        ⭐ <strong>100% client satisfaction</strong><br>
        🕐 Available <strong>24/7</strong><br><br>
        Your dog's happiness is our mission! 🐾`],
        answers_zh: [`🏠 <strong>Loving Homes</strong> — 让狗狗感受家的温暖！<br><br>
        ❤️ 香港顶级宠物酒店<br>
        📅 超过<strong>8年</strong>专业经验<br>
        🐕 已照顾超过<strong>500只</strong>快乐的狗狗<br>
        👨‍⚕️ <strong>12位</strong>专业团队成员<br>
        ⭐ <strong>100%</strong>客户满意度<br>
        🕐 全天候<strong>24/7</strong>服务<br><br>
        您爱犬的幸福是我们的使命！🐾`]
    },

    // ── LOCATION ──
    {
        keys: ['where', 'location', 'address', 'find you', 'hong kong', 'directions',
               '在哪', '地址', '怎么去', '位置', '香港', '方向'],
        answers: [`📍 We're located in <strong>Hong Kong, China</strong>!<br><br>
        For the full address & directions, visit our <strong>Contact Us</strong> page.<br><br>
        📞 <strong>+852 1234 5678</strong><br>
        🕐 Open <strong>24/7</strong> 🐾`],
        answers_zh: [`📍 我们位于<strong>中国香港</strong>！<br><br>
        完整地址及路线，请访问我们的<strong>联系我们</strong>页面。<br><br>
        📞 <strong>+852 1234 5678</strong><br>
        🕐 全天候开放 🐾`]
    },

    // ── SAFETY ──
    {
        keys: ['safe', 'safety', 'secure', 'trust', 'worried', 'scared', 'anxiety', 'nervous',
               '安全', '放心', '担心', '害怕', '信任', '焦虑'],
        answers: [`🛡️ We completely understand — your dog is family!<br><br>
        How we keep your dog <strong>safe & happy</strong>:<br>
        🔒 Fully secured & monitored facility<br>
        🩺 24/7 on-site veterinary staff<br>
        📸 Daily photo & video updates sent to you<br>
        👁️ Constant supervision by trained staff<br>
        🌿 Safe, enclosed outdoor areas<br>
        ❤️ Loving, stress-free environment<br><br>
        You can relax — your dog is in the best hands! 🐾`],
        answers_zh: [`🛡️ 我们完全理解——您的爱犬就是家人！<br><br>
        我们如何确保您爱犬的<strong>安全与快乐</strong>：<br>
        🔒 全面安保及监控设施<br>
        🩺 24/7驻场兽医<br>
        📸 每日发送照片和视频更新<br>
        👁️ 专业人员全程监护<br>
        🌿 安全封闭的户外区域<br>
        ❤️ 温馨无压力的环境<br><br>
        请放心——您的爱犬由最好的人照顾！🐾`]
    },

    // ── BREED / SIZE ──
    {
        keys: ['breed', 'size', 'big dog', 'small dog', 'large', 'tiny', 'puppy', 'old dog', 'senior', 'aggressive',
               '品种', '大小', '大狗', '小狗', '幼犬', '老狗', '年龄'],
        answers: [`🐕 We welcome dogs of <strong>all breeds and sizes</strong>!<br><br>
        🐩 Small & toy breeds<br>
        🐕 Medium breeds<br>
        🦮 Large & giant breeds<br>
        🐶 Puppies (with extra gentle care!)<br>
        🦴 Senior dogs (special attention)<br>
        🐾 Dogs with special behavioural needs<br><br>
        For special requirements, our <strong>Custom Package</strong> is perfect! 🐾`],
        answers_zh: [`🐕 我们欢迎<strong>所有品种和体型</strong>的狗狗！<br><br>
        🐩 小型犬及玩具犬<br>
        🐕 中型犬<br>
        🦮 大型及巨型犬<br>
        🐶 幼犬（额外温柔照顾！）<br>
        🦴 老年犬（特别关注）<br>
        🐾 有特殊行为需求的狗狗<br><br>
        有特殊需求？我们的<strong>定制套餐</strong>完美适合！🐾`]
    },

    // ── FOOD / DIET ──
    {
        keys: ['food', 'feed', 'diet', 'meal', 'eat', 'allergy', 'allergies', 'nutrition',
               '食物', '喂食', '饮食', '餐食', '过敏', '营养', '吃什么'],
        answers: [`🍖 We take your dog's diet seriously!<br><br>
        🥣 We can follow your <strong>dog's regular diet</strong><br>
        🚫 We respect all <strong>food allergies & restrictions</strong><br>
        🍗 Treats given <strong>as agreed with you</strong><br>
        💧 Fresh water available <strong>at all times</strong><br>
        📋 Just let us know your dog's dietary needs when booking!<br><br>
        Your dog eats right with us! 🐾`],
        answers_zh: [`🍖 我们认真对待您爱犬的饮食！<br><br>
        🥣 可按照您爱犬的<strong>日常饮食</strong>喂食<br>
        🚫 严格遵守所有<strong>食物过敏及限制</strong><br>
        🍗 按<strong>与您商定的内容</strong>提供零食<br>
        💧 <strong>随时</strong>提供新鲜饮水<br>
        📋 预订时告知我们您爱犬的饮食需求！<br><br>
        您的爱犬在我们这里吃得健康！🐾`]
    },

    // ── UPDATES / PHOTOS ──
    {
        keys: ['update', 'updates', 'photo', 'photos', 'picture', 'video', 'news', 'check in', 'how is my dog',
               '更新', '照片', '图片', '视频', '消息', '我的狗怎么样'],
        answers: [`📸 We keep you <strong>connected with your dog</strong> throughout the stay!<br><br>
        📷 <strong>Daily photos & videos</strong> sent to you<br>
        📱 Updates on activities, meals & mood<br>
        🩺 Health updates from our vet team<br>
        📞 You can call us anytime to check in<br><br>
        You'll never feel out of touch with your furry friend! 🐾`],
        answers_zh: [`📸 我们让您与爱犬<strong>全程保持联系</strong>！<br><br>
        📷 每日发送<strong>照片和视频</strong><br>
        📱 活动、饮食和情绪更新<br>
        🩺 兽医团队的健康状况汇报<br>
        📞 您可以随时致电查询<br><br>
        让您与爱犬始终保持联系！🐾`]
    },

    // ── MULTIPLE DOGS ──
    {
        keys: ['two dogs', 'multiple dogs', 'both dogs', 'siblings', 'together', '2 dogs', 'more than one',
               '两只狗', '多只', '一起', '兄弟姐妹', '两只'],
        answers: [`🐕🐕 Great news — we welcome <strong>multiple dogs</strong>!<br><br>
        👫 Dogs from the same family can <strong>stay together</strong><br>
        🛏️ We can arrange rooms accordingly<br>
        🌿 They can play and socialise together<br>
        💰 Ask us about our <strong>multi-dog discount</strong>!<br><br>
        Contact us to arrange the perfect setup for your dogs! 🐾`],
        answers_zh: [`🐕🐕 好消息——我们欢迎<strong>多只狗狗</strong>！<br><br>
        👫 同一家庭的狗狗可以<strong>住在一起</strong><br>
        🛏️ 我们会相应安排房间<br>
        🌿 它们可以一起玩耍和社交<br>
        💰 咨询我们的<strong>多犬优惠</strong>！<br><br>
        联系我们为您的狗狗安排完美住宿！🐾`]
    },
];

// ============================================
//  MATCHING ENGINE
// ============================================
function normalize(text) {
    return text.toLowerCase().trim()
        .replace(/[^\w\s\u4e00-\u9fff]/g, ' ')
        .replace(/\s+/g, ' ');
}

function fuzzyMatch(word, key) {
    if (word.includes(key) || key.includes(word)) return true;
    // For Chinese characters and short words, use stricter matching
    if (word.length < 4) return word === key;
    if (Math.abs(word.length - key.length) > 2) return false;
    let diff = 0;
    for (let i = 0; i < Math.min(word.length, key.length); i++) {
        if (word[i] !== key[i]) diff++;
        if (diff > 2) return false;
    }
    return diff <= 2;
}

function pickAnswer(item, zh) {
    const arr = zh
        ? (item.answers_zh || item.answers || [item.answer])
        : (item.answers || [item.answer]);
    return arr[Math.floor(Math.random() * arr.length)];
}

function getAnswer(input) {
    const trimmed = input.trim();
    const text  = normalize(input);
    const words = text.split(' ').filter(w => w.length > 0);
    const zh    = isZh(input);

    // 1. Chinese exact match — check if input contains any Chinese key
    if (zh) {
        for (const item of knowledge) {
            for (const key of item.keys) {
                if (isZh(key)) {
                    // Exact character match for Chinese
                    if (trimmed.includes(key) || key.includes(trimmed) || trimmed === key) {
                        if (item.trigger === 'recommend') {
                            state.mode = 'recommending';
                            state.step = 0;
                            state.answers = {};
                            return recommendQuestions[0].zh;
                        }
                        return pickAnswer(item, true);
                    }
                }
            }
        }
    }

    // 2. English exact phrase match
    for (const item of knowledge) {
        for (const key of item.keys) {
            if (!isZh(key)) {
                const normKey = normalize(key);
                if (text.includes(normKey)) {
                    if (item.trigger === 'recommend') {
                        state.mode = 'recommending';
                        state.step = 0;
                        state.answers = {};
                        return zh ? recommendQuestions[0].zh : recommendQuestions[0].ask;
                    }
                    return pickAnswer(item, zh);
                }
            }
        }
    }

    // 3. Fuzzy match (English only)
    if (!zh) {
        for (const item of knowledge) {
            for (const key of item.keys) {
                if (!isZh(key)) {
                    const normKey = normalize(key);
                    if (words.some(w => w.length > 3 && fuzzyMatch(w, normKey))) {
                        if (item.trigger === 'recommend') {
                            state.mode = 'recommending';
                            state.step = 0;
                            state.answers = {};
                            return recommendQuestions[0].ask;
                        }
                        return pickAnswer(item, false);
                    }
                }
            }
        }
    }

    // 4. Fallback
    return zh
        ? `🤔 抱歉，我不太明白您的问题。<br><br>我可以帮您了解：<br>✂️ <strong>服务</strong> | 📦 <strong>套餐</strong> | 📞 <strong>预订</strong> | 🏠 <strong>关于我们</strong><br><br>或输入<em>"推荐"</em>，我为您的爱犬推荐最适合的套餐！🐾`
        : `🤔 I'm not quite sure about that!<br><br>I can help with:<br>✂️ <strong>Services</strong> | 📦 <strong>Packages</strong> | 📞 <strong>Booking</strong> | 🏠 <strong>About us</strong><br><br>Or type <em>"recommend"</em> and I'll find the perfect package for your dog! 🐾`;
}

// ============================================
//  CHAT UI
// ============================================
const chatWindow = document.getElementById('chatWindow');
const chatInput  = document.getElementById('chatInput');
const sendBtn    = document.getElementById('sendBtn');

function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `message ${type}`;
    const avatar = type === 'bot' ? '🐾' : '👤';
    msg.innerHTML = `<div class="msg-avatar">${avatar}</div><div class="msg-bubble">${text}</div>`;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTyping() {
    const t = document.createElement('div');
    t.className = 'message bot typing';
    t.id = 'typingIndicator';
    t.innerHTML = `<div class="msg-avatar">🐾</div><div class="msg-bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;
    chatWindow.appendChild(t);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById('typingIndicator');
    if (t) t.remove();
}

function typingDelay(answer) {
    const words = answer.replace(/<[^>]+>/g, '').split(' ').length;
    return Math.min(400 + words * 25, 1600);
}

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    sendBtn.disabled = true;
    showTyping();

    const answer = state.mode === 'recommending'
        ? handleRecommendFlow(text)
        : getAnswer(text);

    setTimeout(() => {
        removeTyping();
        addMessage(answer, 'bot');
        sendBtn.disabled = false;
        chatInput.focus();
    }, typingDelay(answer));
}

function askSuggestion(btn) {
    chatInput.value = btn.textContent.trim();
    sendMessage();
}

chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendMessage();
});

console.log('✅ Loving Homes — ai.js v3 loaded');