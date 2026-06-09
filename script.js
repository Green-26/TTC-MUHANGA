/* ===============================================
   CHRISOSTOM AI & ADVANCED FUNCTIONALITY
   TTC Muhanga Premium Website JavaScript
   =============================================== */

// ===== 3D Canvas Animation =====
function init3DBackground() {
    const canvas = document.getElementById('canvas-bg');
    if (!window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    canvas.appendChild(renderer.domElement);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 2000;
        posArray[i + 1] = (Math.random() - 0.5) * 2000;
        posArray[i + 2] = (Math.random() - 0.5) * 2000;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
        size: 7,
        color: 0x667eea,
        opacity: 0.5,
        transparent: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 150;

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize on load
window.addEventListener('load', init3DBackground);

// ===== CHRISOSTOM AI CHATBOT =====
const chrisostomResponses = {
    'eclpe': 'ECLPE (Early Childhood and Lower Primary Education) is a 3-year program designed to train educators for nursery and lower primary classes. You\'ll learn child development psychology, play-based learning methods, early literacy & numeracy, and classroom management. Our graduates are highly sought after! 🧒📚',
    
    'le': 'LE (Languages Education) trains multilingual teachers in Kinyarwanda, English, and French. This 3-year program covers linguistics, teaching methodology, literature, translation, and language assessment. Perfect for those passionate about languages! 📚🌍',
    
    'sme': 'SME (Science & Mathematics Education) is our STEM-focused program. In 3 years, you\'ll master mathematics, statistics, physics, chemistry, biology, and ICT in education. With our advanced labs and experienced faculty, you\'ll be ready to inspire the next generation of scientists! 🔬🔭',
    
    'sse': 'SSE (Social Studies and Religious Education) prepares educators in history, geography, civics, ethics, and religious studies. This program emphasizes values education and peace-building—crucial for Rwanda\'s future! 🌍📖',
    
    'apply': 'Students are placed at TTC Muhanga through the Rwanda Education Board (REB) only. We don\'t accept direct applications. If you\'ve been placed by REB, contact our administration at 0786 286 911 or ttcmuhanga@yahoo.fr for enrollment details. 📝',
    
    'facilities': 'Our campus features: 12 modern classrooms, fully-equipped science labs (Chemistry, Physics, Biology), a modern IT center, digital library, language labs, and comfortable student dormitories (2 girls, 1 boys). Everything you need to excel! 🏢',
    
    'contact': 'Contact us anytime! 📞 General: 0786 286 911 | Principal: +250 788 598 705 | Email: ttcmuhanga@yahoo.fr | Address: Mubuga Cell, Shyogwe Sector, Muhanga District. We\'re open Monday-Friday, 8 AM - 5 PM.',
    
    'programs': 'TTC Muhanga offers 4 specialized programs: ECLPE (Early Childhood), LE (Languages), SME (Science & Math), and SSE (Social Studies). Each is a 3-year A1 Level program with practical experience. Which interests you? 🎓',
    
    'principal': 'Our Principal is Jeanne d\'Arc Mukabatesi, who leads TTC Muhanga with dedication and vision for excellence in teacher education. She\'s always available for important matters. 👩‍💼',
    
    'location': 'TTC Muhanga is located in Shyogwe Sector, Muhanga District, in Rwanda\'s Southern Province. We\'re about 45 minutes from Kigali City and easily accessible by bus. Beautiful surroundings for focused learning! 🗺️',
    
    'jica': 'We partner with JICA (Japan International Cooperation Agency) to enhance our science and mathematics education. JICA volunteers have been instrumental in making our programs world-class! 🤝🌏',
    
    'alumni': 'TTC Muhanga has over 2,500 successful alumni working across Rwanda! Our graduates have a 98% employment rate and are making a real impact in education. You could be next! 🌟',
    
    'default': 'That\'s a great question! I\'m Chrisostom, your AI guide. I can help with: programs (ECLPE, LE, SME, SSE), campus facilities, application process, contact info, and more. What would you like to know? 🤖'
};

function findResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(chrisostomResponses)) {
        if (msg.includes(keyword)) {
            return response;
        }
    }
    
    return chrisostomResponses.default;
}

function openChrisostom(e) {
    if (e) e.preventDefault();
    const widget = document.getElementById('chrisostom-widget');
    widget.style.display = widget.style.display === 'none' ? 'flex' : 'flex';
    document.getElementById('chat-input').focus();
}

function toggleChrisostomChat() {
    const chat = document.getElementById('chrisostom-chat');
    chat.style.display = chat.style.display === 'none' ? 'flex' : 'none';
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;

    const messagesContainer = document.getElementById('chat-messages');

    // User message
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'message-user';
    userMsgDiv.innerHTML = `<div class="message-bubble">${escapeHtml(message)}</div>`;
    messagesContainer.appendChild(userMsgDiv);

    // Clear input
    input.value = '';

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // AI response (with delay for natural feel)
    setTimeout(() => {
        const response = findResponse(message);
        const aiMsgDiv = document.createElement('div');
        aiMsgDiv.className = 'message-ai';
        aiMsgDiv.innerHTML = `<div class="message-bubble ai-bubble"><p><strong>Chrisostom:</strong> ${response}</p></div>`;
        messagesContainer.appendChild(aiMsgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);
}

function sendQuickMessage(message) {
    document.getElementById('chat-input').value = message;
    sendChatMessage();
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== SCROLL TO TOP FUNCTIONALITY =====
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.querySelector('.menu-toggle-premium');
const navLinks = document.querySelector('.nav-links-premium');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links-premium a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links-premium a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.program-card-premium, .feature-card-premium, .facility-card, .contact-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ===== RESPONSIVE CHECKS =====
let isMobile = window.innerWidth <= 768;

window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 768;

    if (wasMobile !== isMobile) {
        if (!isMobile) {
            navLinks.classList.remove('active');
        }
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll animations happen here
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ===== ACCESSIBILITY =====
// Add focus styles for keyboard navigation
document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('focus', () => {
        el.style.outline = '2px solid #667eea';
        el.style.outlineOffset = '2px';
    });

    el.addEventListener('blur', () => {
        el.style.outline = 'none';
    });
});

// ===== INITIALIZATION =====
console.log('🎓 Welcome to TTC Muhanga - Excellence in Teacher Education');
console.log('💬 Chrisostom AI is ready to help!');

// Initialize Chrisostom visibility on load
window.addEventListener('load', () => {
    const widget = document.getElementById('chrisostom-widget');
    if (widget) {
        widget.style.display = 'flex';
    }
});