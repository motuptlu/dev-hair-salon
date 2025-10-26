// ===================================
// ADVANCED ANIMATIONS
// ===================================

// Logo Animation on Load
window.addEventListener('load', () => {
    const logo = document.querySelector('.logo-svg');
    if (logo) {
        logo.style.animation = 'logoAppear 1.5s ease-out';
    }
});

// GSAP Scroll Trigger Animations
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax Images
    gsap.utils.toArray('.welcome-img, .story-img').forEach(img => {
        gsap.to(img, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
        });
    });
    
    // Service Cards Stagger
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    // Why Cards Animation
    gsap.from('.why-card', {
        scrollTrigger: {
            trigger: '.why-choose-grid',
            start: 'top 80%',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });
    
    // Gallery Items
    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out'
    });
    
    // Team Members
    gsap.from('.team-member-card', {
        scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 80%',
        },
        y: 80,
        opacity: 0,
        rotation: -5,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
    });
    
    // Value Cards
    gsap.from('.value-card', {
        scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 80%',
        },
        rotationY: 90,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out'
    });
}

// Intersection Observer for Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepTime);
}

// Observe all counters
document.querySelectorAll('[data-target]').forEach(counter => {
    counterObserver.observe(counter);
});

// Smooth Reveal on Scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
});

// Text Typing Effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Apply typing effect to specific elements
document.querySelectorAll('.typing-effect').forEach(el => {
    const text = el.textContent;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(el, text);
                observer.unobserve(el);
            }
        });
    });
    observer.observe(el);
});

// Magnetic Button Effect
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Ripple Effect on Click
document.querySelectorAll('.btn-primary, .btn-secondary, .service-card').forEach(el => {
    el.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles
const rippleStyles = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: rippleEffect 0.6s ease-out;
    pointer-events: none;
}

@keyframes rippleEffect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = rippleStyles;
    document.head.appendChild(style);
}

// Tilt Effect on Cards
document.querySelectorAll('.service-card, .team-member-card, .blog-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

console.log('🎨 Advanced animations loaded successfully!');
