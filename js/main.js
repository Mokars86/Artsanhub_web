// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');

// Function to close mobile menu
function closeMobileMenu() {
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
}

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Sticky Header with Performance Optimization
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
                closeMobileMenu();
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
            ticking = false;
        });
        
        ticking = true;
    }
});

// FAQ Accordion with Accessibility
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    
    const answer = question.nextElementSibling;
    answer.setAttribute('role', 'region');
    answer.setAttribute('aria-hidden', 'true');
    
    question.addEventListener('click', () => {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        
        // Toggle answer visibility
        answer.style.display = isExpanded ? 'none' : 'block';
        answer.setAttribute('aria-hidden', isExpanded);
        question.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle icon
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
        
        // Close other open answers
        faqQuestions.forEach(q => {
            if (q !== question) {
                const otherAnswer = q.nextElementSibling;
                otherAnswer.style.display = 'none';
                otherAnswer.setAttribute('aria-hidden', 'true');
                q.setAttribute('aria-expanded', 'false');
                q.querySelector('i').classList.remove('fa-chevron-up');
                q.querySelector('i').classList.add('fa-chevron-down');
            }
        });
    });

    // Keyboard accessibility
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// Smooth Scrolling with Performance Optimization
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        
        if (target) {
            // Close mobile menu if open
            closeMobileMenu();
            
            // Smooth scroll with fallback
            if ('scrollBehavior' in document.documentElement.style) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Fallback for browsers that don't support smooth scrolling
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Enhanced Testimonials Slider with Touch Support
const testimonials = [
    {
        name: "John Doe",
        image: "images/testimonial1.jpg",
        stars: 5,
        comment: "Amazing service! Found a great plumber within minutes."
    },
    {
        name: "Jane Smith",
        image: "images/testimonial2.jpg",
        stars: 5,
        comment: "The app is so easy to use. Highly recommended!"
    },
    {
        name: "Mike Johnson",
        image: "images/testimonial3.jpg",
        stars: 4,
        comment: "Professional service providers and excellent support."
    }
];

const testimonialsContainer = document.querySelector('.testimonials-slider');
let currentTestimonial = 0;
let touchStartX = 0;
let touchEndX = 0;

function renderTestimonial(testimonial) {
    const stars = '★'.repeat(testimonial.stars) + '☆'.repeat(5 - testimonial.stars);
    
    return `
        <div class="testimonial" role="group" aria-roledescription="slide">
            <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-image" loading="lazy">
            <div class="testimonial-content">
                <div class="stars" aria-label="${testimonial.stars} out of 5 stars">${stars}</div>
                <p class="comment">${testimonial.comment}</p>
                <h4 class="name">${testimonial.name}</h4>
            </div>
        </div>
    `;
}

function updateTestimonials(direction = 1) {
    currentTestimonial = (currentTestimonial + direction + testimonials.length) % testimonials.length;
    const newTestimonial = renderTestimonial(testimonials[currentTestimonial]);
    
    // Add slide animation class
    testimonialsContainer.style.opacity = '0';
    setTimeout(() => {
        testimonialsContainer.innerHTML = newTestimonial;
        testimonialsContainer.style.opacity = '1';
    }, 300);
}

// Touch events for testimonials
testimonialsContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

testimonialsContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;
    
    if (Math.abs(diff) > swipeThreshold) {
        updateTestimonials(diff > 0 ? -1 : 1);
    }
}

// Initialize testimonials
updateTestimonials();

// Auto-rotate testimonials (pause on hover/touch)
let testimonialInterval = setInterval(() => updateTestimonials(), 5000);

testimonialsContainer.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialsContainer.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => updateTestimonials(), 5000);
});

// Enhanced Newsletter Form with Validation
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (!isValidEmail(email)) {
        showFormError(emailInput, 'Please enter a valid email address');
        return;
    }
    
    // Here you would typically send this to your backend
    console.log('Newsletter signup:', email);
    
    // Show success message
    showFormSuccess('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    
    // Remove any existing error message
    const existingError = input.parentElement.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    input.parentElement.appendChild(errorDiv);
    input.setAttribute('aria-invalid', 'true');
    
    // Remove error message after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
        input.removeAttribute('aria-invalid');
    }, 3000);
}

function showFormSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.textContent = message;
    
    newsletterForm.appendChild(successDiv);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Intersection Observer for Animations with Performance Optimization
const animatedElements = document.querySelectorAll('.feature-card, .step, .service-card');

// Check if the browser supports Intersection Observer
if ('IntersectionObserver' in window) {
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });
} else {
    // Fallback for browsers that don't support Intersection Observer
    animatedElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
}

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(testimonialInterval);
    } else {
        testimonialInterval = setInterval(() => updateTestimonials(), 5000);
    }
});

// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update toggle button icon
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add animation class
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);
    
    setTheme(newTheme);
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    setTheme(newTheme);
});

// Initialize theme on page load
initializeTheme(); 