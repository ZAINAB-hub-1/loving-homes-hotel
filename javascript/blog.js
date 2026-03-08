// ============================================
//  LOVING HOMES — blog.js
// ============================================

// ── Navbar ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));

// ── Mobile menu ──
const menuBtn  = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn) menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
if (navLinks) navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── Articles Content ──
const articles = {
    featured: {
        emoji: '🐕', tag: 'orange', tagText: '⭐ Featured',
        title: '10 Signs Your Dog is Happy and Healthy',
        title_zh: '10个迹象表明您的狗狗快乐又健康',
        meta: '📅 March 2026 &nbsp;|&nbsp; ⏱️ 5 min read',
        body: `
            <p>As a dog owner, one of the most important things you can do is learn to read your dog's body language and behaviour. A happy, healthy dog shows it in many ways!</p>
            <h4>1. 🐕 Wagging Tail</h4>
            <p>A relaxed, wagging tail is one of the clearest signs of happiness. Pay attention to the height and speed — a mid-level, loose wag usually means contentment.</p>
            <h4>2. 👁️ Bright, Clear Eyes</h4>
            <p>Healthy dogs have bright, alert eyes without discharge or cloudiness. Dull or red eyes can signal illness or stress.</p>
            <h4>3. 🍽️ Good Appetite</h4>
            <p>A healthy dog eats enthusiastically and regularly. Sudden loss of appetite can be an early sign of illness.</p>
            <h4>4. 💤 Normal Sleep Patterns</h4>
            <p>Dogs sleep 12–14 hours a day. Excessive sleeping or restlessness can both be signs of discomfort.</p>
            <h4>5. 🎾 Playfulness</h4>
            <p>Happy dogs love to play! If your dog brings you toys or initiates play, that's a wonderful sign of wellbeing.</p>
            <h4>6. 🚶 Healthy Movement</h4>
            <p>Watch for a smooth, effortless gait. Limping or stiffness can indicate joint issues or injury.</p>
            <h4>7. 🪮 Shiny Coat</h4>
            <p>A glossy, clean coat reflects good nutrition and grooming habits. Dull or patchy fur may signal dietary deficiencies.</p>
            <h4>8. 👃 Moist Nose</h4>
            <p>A moist, cool nose is generally healthy, though this can vary. Persistently dry or cracked noses deserve a vet check.</p>
            <h4>9. 💬 Vocalisation</h4>
            <p>Happy dogs communicate — a playful bark or excited whine is normal. Excessive whining or growling without cause can signal distress.</p>
            <h4>10. 🏠 Comfort at Home</h4>
            <p>A dog that relaxes freely in your home, seeks your company, and shows no fearful behaviour is a confident, happy dog.</p>
        `
    },
    bathe: {
        emoji: '🛁', tag: 'orange', tagText: '🐾 Care Tips',
        title: 'How Often Should You Bathe Your Dog?',
        title_zh: '您应该多久给狗狗洗一次澡？',
        meta: '📅 Feb 2026 &nbsp;|&nbsp; ⏱️ 3 min read',
        body: `
            <p>Bathing your dog is essential for their hygiene, but too much or too little can both cause problems. The right frequency depends on several factors.</p>
            <h4>🐕 By Breed & Coat Type</h4>
            <ul>
                <li>Short-haired dogs (e.g., Beagles): every 4–6 weeks</li>
                <li>Long-haired dogs (e.g., Collies): every 4 weeks</li>
                <li>Double-coated dogs (e.g., Huskies): every 6–8 weeks</li>
                <li>Hairless dogs (e.g., Chinese Crested): weekly</li>
            </ul>
            <h4>🌿 Natural Oils Matter</h4>
            <p>Over-bathing strips your dog's skin of natural oils, leading to dryness and irritation. Always use a dog-specific shampoo — never human products!</p>
            <h4>✅ General Rule</h4>
            <p>Most dogs benefit from a bath once a month. If your dog loves outdoor adventures or has skin conditions, consult your vet for personalised advice.</p>
        `
    },
    pasture: {
        emoji: '🌿', tag: 'teal', tagText: '📢 Hotel News',
        title: 'Loving Homes Opens New Outdoor Pasture!',
        title_zh: '温馨之家开放全新户外草地！',
        meta: '📅 Jan 2026 &nbsp;|&nbsp; ⏱️ 2 min read',
        body: `
            <p>We are absolutely thrilled to share some exciting news with our Loving Homes family — we have officially opened our brand-new, expanded outdoor pasture area!</p>
            <h4>🌱 What's New?</h4>
            <ul>
                <li>Double the outdoor space — over 500 square metres of lush green grass</li>
                <li>Fully secured perimeter fencing for complete safety</li>
                <li>Shaded rest areas for hot days</li>
                <li>New agility equipment and play structures</li>
                <li>Separate zones for large and small dogs</li>
            </ul>
            <h4>🐾 Available to All Guests</h4>
            <p>All dogs staying at Loving Homes will now have supervised access to the new pasture as part of every package. We believe fresh air and open space are essential for your dog's happiness!</p>
            <p>Come visit and let your dog enjoy their new favourite outdoor playground! 🎉</p>
        `
    },
    coat: {
        emoji: '🍖', tag: 'yellow', tagText: '🍖 Nutrition',
        title: 'The Best Foods for a Healthy Dog Coat',
        title_zh: '让狗狗毛发亮丽的最佳食物',
        meta: '📅 Jan 2026 &nbsp;|&nbsp; ⏱️ 4 min read',
        body: `
            <p>A beautiful, shiny coat isn't just about grooming — it starts with what your dog eats. The right nutrients make a huge difference.</p>
            <h4>🐟 Omega-3 Fatty Acids</h4>
            <p>Found in salmon, sardines, and flaxseed, omega-3s reduce inflammation and promote a glossy coat. Look for dog foods with fish oil listed as an ingredient.</p>
            <h4>🥚 Protein</h4>
            <p>Hair is mostly protein. High-quality animal protein (chicken, beef, fish) is essential for coat growth and strength.</p>
            <h4>🥕 Vitamins A & E</h4>
            <p>Vitamin A (found in carrots and sweet potato) supports skin cell production, while Vitamin E acts as an antioxidant protecting skin health.</p>
            <h4>💧 Hydration</h4>
            <p>Dehydration leads directly to a dull, dry coat. Always ensure fresh water is available throughout the day.</p>
            <h4>⚠️ Foods to Avoid</h4>
            <ul>
                <li>Excess processed foods — strip natural oils</li>
                <li>Artificial additives — can trigger skin reactions</li>
                <li>Too many treats — can cause nutritional imbalances</li>
            </ul>
        `
    },
    commands: {
        emoji: '🎓', tag: 'green', tagText: '🎓 Training',
        title: '5 Basic Commands Every Dog Should Know',
        title_zh: '每只狗狗都应该掌握的5个基本指令',
        meta: '📅 Dec 2025 &nbsp;|&nbsp; ⏱️ 4 min read',
        body: `
            <p>Training your dog isn't just about obedience — it builds trust, keeps them safe, and strengthens your bond. Start with these five essentials.</p>
            <h4>1. 🪑 Sit</h4>
            <p>The foundation of all training. Hold a treat above your dog's nose and slowly move it back. As their bottom lowers, say "Sit" clearly. Reward immediately.</p>
            <h4>2. ✋ Stay</h4>
            <p>Once your dog can sit reliably, ask them to sit, open your palm toward them and say "Stay". Take one step back, then reward if they don't move.</p>
            <h4>3. 📣 Come</h4>
            <p>Crouch down, open your arms and call your dog's name followed by "Come!" in a happy voice. This command can be life-saving outdoors.</p>
            <h4>4. 🛌 Down</h4>
            <p>From a sit position, hold a treat near their nose and slowly lower it to the floor. As they follow it down, say "Down" and reward.</p>
            <h4>5. 🚫 Leave It</h4>
            <p>Place a treat in your closed fist. When your dog stops trying to get it and pulls back, say "Leave it" and reward with a different treat from the other hand.</p>
            <h4>💡 Key Tips</h4>
            <ul>
                <li>Keep sessions short — 5–10 minutes maximum</li>
                <li>Always end on a positive note</li>
                <li>Be consistent with your words and tone</li>
                <li>Patience and positivity are everything</li>
            </ul>
        `
    },
    summer: {
        emoji: '🌡️', tag: 'orange', tagText: '🐾 Care Tips',
        title: 'Keeping Your Dog Cool in Summer',
        title_zh: '夏天如何让您的狗狗保持凉爽',
        meta: '📅 Dec 2025 &nbsp;|&nbsp; ⏱️ 3 min read',
        body: `
            <p>Dogs can overheat quickly in summer, especially breeds with thick coats or flat faces. Knowing the signs and prevention strategies is essential.</p>
            <h4>⚠️ Signs of Overheating</h4>
            <ul>
                <li>Excessive panting or drooling</li>
                <li>Bright red gums</li>
                <li>Weakness or collapse</li>
                <li>Vomiting or diarrhoea</li>
            </ul>
            <h4>✅ How to Keep Them Cool</h4>
            <ul>
                <li>Always provide fresh, cold water</li>
                <li>Walk during early morning or evening — avoid midday heat</li>
                <li>Never leave your dog in a parked car</li>
                <li>Provide shaded outdoor areas</li>
                <li>Use cooling mats or paddling pools</li>
                <li>Groom regularly to remove excess fur</li>
            </ul>
            <h4>🏨 At Loving Homes</h4>
            <p>All our rooms are equipped with cooling systems to ensure your dog is perfectly comfortable year-round, no matter the temperature outside!</p>
        `
    },
    award: {
        emoji: '🏆', tag: 'teal', tagText: '📢 Hotel News',
        title: 'We Won Best Dog Hotel 2025!',
        title_zh: '我们荣获2025年最佳宠物旅馆！',
        meta: '📅 Nov 2025 &nbsp;|&nbsp; ⏱️ 2 min read',
        body: `
            <p>We are overjoyed and deeply grateful to share that Loving Homes has been voted the <strong>Best Dog Hotel of 2025!</strong> 🎉</p>
            <p>This award means the world to us because it comes directly from our community — the wonderful dog owners who have trusted us with their most precious family members.</p>
            <h4>💬 A Message from Our Team</h4>
            <p>"Every day we come to work, we do it out of pure love for animals. Knowing that you see that love and appreciate it is the greatest reward we could ever receive. This award belongs to every dog who has stayed with us and every family that trusted us with their care."</p>
            <h4>🚀 What's Next?</h4>
            <p>Winning this award motivates us to continue improving. In 2026, we're expanding our facilities, launching new services, and working on our AI-powered care system. The best is yet to come!</p>
            <p>Thank you from the bottom of our hearts. 🐾❤️</p>
        `
    },
    water: {
        emoji: '💧', tag: 'yellow', tagText: '🍖 Nutrition',
        title: 'How Much Water Does Your Dog Need Daily?',
        title_zh: '您的狗狗每天需要喝多少水？',
        meta: '📅 Nov 2025 &nbsp;|&nbsp; ⏱️ 3 min read',
        body: `
            <p>Water is life — and this is just as true for dogs as it is for humans. Proper hydration affects every system in your dog's body.</p>
            <h4>📏 The General Rule</h4>
            <p>Dogs need approximately <strong>50–60ml of water per kg of body weight per day</strong>. A 10kg dog should drink roughly 500–600ml daily.</p>
            <h4>🌡️ Factors That Increase Water Needs</h4>
            <ul>
                <li>Hot weather or high humidity</li>
                <li>Vigorous exercise or play</li>
                <li>Dry kibble diet (vs wet food)</li>
                <li>Pregnancy or nursing</li>
                <li>Illness or medication</li>
            </ul>
            <h4>🚨 Signs of Dehydration</h4>
            <ul>
                <li>Dry or sticky gums</li>
                <li>Loss of skin elasticity</li>
                <li>Sunken eyes</li>
                <li>Lethargy or reduced energy</li>
            </ul>
            <h4>✅ Tips for Keeping Dogs Hydrated</h4>
            <ul>
                <li>Always have multiple fresh water bowls available</li>
                <li>Change water at least twice daily</li>
                <li>Add water to dry food for extra hydration</li>
                <li>Bring water on all outdoor trips</li>
            </ul>
        `
    },
    anxiety: {
        emoji: '🐕‍🦺', tag: 'green', tagText: '🎓 Training',
        title: 'How to Reduce Separation Anxiety in Dogs',
        title_zh: '如何减少狗狗的分离焦虑',
        meta: '📅 Oct 2025 &nbsp;|&nbsp; ⏱️ 5 min read',
        body: `
            <p>Separation anxiety is one of the most common behavioural issues in dogs. It can manifest as destructive behaviour, excessive barking, or accidents indoors when you leave.</p>
            <h4>🔍 Common Signs</h4>
            <ul>
                <li>Excessive barking or howling when alone</li>
                <li>Destructive chewing of furniture or belongings</li>
                <li>House soiling despite being toilet-trained</li>
                <li>Pacing, drooling, or trembling</li>
                <li>Trying to escape</li>
            </ul>
            <h4>🛠️ Proven Strategies</h4>
            <h4>1. Gradual Desensitisation</h4>
            <p>Start by leaving for just 1–2 minutes, then gradually increase the duration over days and weeks. This teaches your dog that departures are temporary.</p>
            <h4>2. Create a Safe Space</h4>
            <p>Designate a comfortable area with their bed, toys, and a worn item of your clothing. Familiar scents are incredibly calming.</p>
            <h4>3. Don't Make Goodbyes a Big Deal</h4>
            <p>Avoid long, emotional farewells. A calm, matter-of-fact departure reduces the emotional significance of leaving.</p>
            <h4>4. Exercise Before Leaving</h4>
            <p>A tired dog is a calmer dog. A good walk or play session before you leave can significantly reduce anxiety.</p>
            <h4>5. Consider Professional Help</h4>
            <p>In severe cases, a certified dog behaviourist or veterinary support can make a transformative difference.</p>
        `
    },
    grooming: {
        emoji: '✂️', tag: 'orange', tagText: '🐾 Care Tips',
        title: "Grooming at Home: A Beginner's Guide",
        meta: '📅 Oct 2025 &nbsp;|&nbsp; ⏱️ 4 min read',
        body: `
            <p>Regular at-home grooming keeps your dog comfortable, healthy, and looking great between professional salon visits. Here's how to get started.</p>
            <h4>🪮 Brushing</h4>
            <p>Brush your dog at least 2–3 times a week (daily for long-haired breeds). This removes loose fur, prevents matting, and distributes natural oils. Use a brush appropriate for your dog's coat type.</p>
            <h4>💅 Nail Trimming</h4>
            <p>Overgrown nails are uncomfortable and can affect your dog's posture. Trim every 3–4 weeks using dog nail clippers. If you can hear their nails clicking on the floor, it's time for a trim!</p>
            <h4>👂 Ear Cleaning</h4>
            <p>Check ears weekly for redness, odour, or discharge. Use a vet-approved ear cleaner and cotton balls — never cotton swabs inside the ear canal.</p>
            <h4>🦷 Teeth Brushing</h4>
            <p>Aim to brush your dog's teeth 2–3 times a week using dog-specific toothpaste. This prevents dental disease, which affects the majority of dogs over age 3.</p>
            <h4>💡 Pro Tips</h4>
            <ul>
                <li>Start grooming routines early in puppyhood</li>
                <li>Always reward with treats and praise</li>
                <li>Keep sessions short and positive</li>
                <li>Never force a stressed dog — take breaks</li>
            </ul>
            <p>For a full professional groom, visit our <strong>Grooming Salon & Spa</strong> at Loving Homes! 🐾✂️</p>
        `
    }
};

// ── Modal logic ──
const overlay = document.getElementById('modalOverlay');

function openPost(key) {
    const a = articles[key];
    if (!a) return;
    document.getElementById('modalEmoji').textContent  = a.emoji;
    document.getElementById('modalTag').textContent    = a.tagText;
    document.getElementById('modalTag').className      = `post-tag ${a.tag}`;
    document.getElementById('modalTitle').textContent  = a.title;
    document.getElementById('modalMeta').innerHTML     = a.meta;
    document.getElementById('modalBody').innerHTML     = a.body;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Scroll reveal ──
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.post-card').forEach(card => observer.observe(card));

console.log('✅ Loving Homes — blog.js loaded');