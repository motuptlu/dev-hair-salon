// ===================================
// MAIN JAVASCRIPT
// ===================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: false,
    mirror: true,
    offset: 100,
});

// ===================================
// PRELOADER
// ===================================

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 1500);
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================

const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// ===================================
// HERO SLIDER (SWIPER)
// ===================================

const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
        delay: 2000, // 2 seconds per slide
        disableOnInteraction: false,
    },
    speed: 1500, // Transition speed
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// ===================================
// TESTIMONIALS SLIDER
// ===================================

const testimonialsSwiper = new Swiper('.testimonials-swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    speed: 800,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================

const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// GSAP SCROLL ANIMATIONS
// ===================================

gsap.registerPlugin(ScrollTrigger);

// Parallax effect on images
gsap.utils.toArray('.welcome-img').forEach(img => {
    gsap.to(img, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    });
});

// Service cards stagger animation
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%',
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

// Section titles animation
gsap.utils.toArray('.section-title').forEach(title => {
    const splitTitle = new SplitText(title, { type: 'words' });
    
    gsap.from(splitTitle.words, {
        scrollTrigger: {
            trigger: title,
            start: 'top 85%',
        },
        opacity: 0,
        y: 50,
        rotationX: -90,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)'
    });
});

// Counter animation
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.badge-number');
            if (number && !number.classList.contains('counted')) {
                const target = parseInt(number.textContent);
                number.textContent = '0';
                animateCounter(number, target);
                number.classList.add('counted');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.experience-badge').forEach(badge => {
    counterObserver.observe(badge);
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// LAZY LOADING IMAGES
// ===================================

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===================================
// FORM VALIDATION (for contact/booking)
// ===================================

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// ===================================
// CURSOR ANIMATION (Optional Premium Effect)
// ===================================

const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateCursor() {
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;
    
    cursorX += distX * 0.1;
    cursorY += distY * 0.1;
    
    cursorFollower.style.left = cursorX + 'px';
    cursorFollower.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
document.querySelectorAll('a, button, .service-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// Add custom cursor styles
const cursorStyles = `
.custom-cursor {
    width: 10px;
    height: 10px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s;
}

.custom-cursor.hover {
    transform: scale(2);
}

.cursor-follower {
    width: 40px;
    height: 40px;
    border: 1px solid var(--primary-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    opacity: 0.5;
    transition: transform 0.3s;
}

.cursor-follower.hover {
    transform: scale(1.5);
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = cursorStyles;
document.head.appendChild(styleSheet);

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScroll = debounce(() => {
    // Your scroll logic here
}, 10);

window.addEventListener('scroll', optimizedScroll);

console.log('🎨 Dev Hair Colourist Salon - Website Loaded Successfully!');
