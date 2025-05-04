// DOM Elements
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');
const skillBars = document.querySelectorAll('.skill-progress');
const faders = document.querySelectorAll('.fade-in');
const form = document.querySelector('.contact-form');

// Typing effect
const typingTextElement = document.getElementById('typing-text');
const textsToType = [
    'Computer Science Student.',
    'Problem Solver.',
    'Software Developer.',
    'Competitive Programmer.'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

// Toggle Navigation
function toggleNav() {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
}

// Close nav when clicking outside
function closeNav(e) {
    if (nav.classList.contains('nav-active') && !nav.contains(e.target) && !burger.contains(e.target)) {
        toggleNav();
    }
}

// Intersection Observer for fade-in animations
const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

// Observe all fade-in elements
faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Animate skill bars when in view
const animateSkillBars = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target;
            const value = progress.getAttribute('data-progress');
            progress.style.width = value;
            animateSkillBars.unobserve(progress);
        }
    });
}, {
    threshold: 0.5
});

// Observe all skill bars
skillBars.forEach(bar => {
    animateSkillBars.observe(bar);
});

// Add sticky header on scroll
function stickyHeader() {
    if (window.scrollY > 80) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

// Highlight active section in navigation
function setActiveNav() {
    let scrollPosition = window.scrollY + header.offsetHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Type text function
function typeText() {
    const currentText = textsToType[textIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50; // Faster when deleting
    } else {
        typingTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150; // Slower when typing
    }
    
    // If word is complete, start deleting after pause
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 1500; // Pause at end of word
    } 
    // If deletion is complete, move to next word
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textsToType.length;
        typingDelay = 500; // Pause before typing new word
    }
    
    setTimeout(typeText, typingDelay);
}

// Form submission (prevent default for demo)
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Simple validation
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 600);
        }
    });
    
    if (isValid) {
        // In a real application, you would send the form data to a server here
        alert('Message sent successfully! (This is a demo - no actual message was sent)');
        form.reset();
    }
}

// Event Listeners
burger.addEventListener('click', toggleNav);
window.addEventListener('click', closeNav);
window.addEventListener('scroll', stickyHeader);
window.addEventListener('scroll', setActiveNav);
form.addEventListener('submit', handleFormSubmit);

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
    setActiveNav();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile nav if open
        if (nav.classList.contains('nav-active')) {
            toggleNav();
        }
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - header.offsetHeight,
            behavior: 'smooth'
        });
    });
});

// Reset form fields when inputs are changed
form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('shake');
    });
});