// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
    // Get elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    console.log('Mobile toggle:', mobileMenuToggle);
    console.log('Nav links:', navLinks);
    
    // Mobile menu toggle - Simple version
    if (mobileMenuToggle) {
        mobileMenuToggle.onclick = function() {
            console.log('Button clicked!');
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                this.innerHTML = '☰';
                document.body.style.overflow = '';
                console.log('Menu closed');
            } else {
                navLinks.classList.add('active');
                document.body.classList.add('menu-open');
                this.innerHTML = '✕';
                document.body.style.overflow = 'hidden';
                console.log('Menu opened');
            }
        };
    }
    
    // Close menu when clicking on links
    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(function(link) {
        link.onclick = function() {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            mobileMenuToggle.innerHTML = '☰';
            document.body.style.overflow = '';
        };
    });
    
    // Scroll effect for navbar
    window.onscroll = function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add stagger effect for grid items
                if (entry.target.classList.contains('feature-card') ||
                    entry.target.classList.contains('product-card') ||
                    entry.target.classList.contains('platform-card') ||
                    entry.target.classList.contains('leader-card') ||
                    entry.target.classList.contains('facility-card') ||
                    entry.target.classList.contains('process-step')) {
                    
                    const parent = entry.target.parentElement;
                    const siblings = Array.from(parent.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(`
        .feature-card,
        .product-card,
        .platform-card,
        .leader-card,
        .facility-card,
        .process-step,
        .section-title,
        .section-title-large,
        .section-heading,
        .section-preheading,
        .video-container,
        .achievement-image,
        .hygiene-item,
        .location-box,
        .logistics-card,
        .benefit-card,
        .highlight-card,
        .info-block
    `);

    animatableElements.forEach(el => {
        animateOnScroll.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Form submission handler
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Create WhatsApp message
            const message = `New Quote Request from Tazij Meats Website:
            
Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
Phone: ${data.phone}
Country: ${data.country}
Product Interest: ${data.product}

Message:
${data.message}`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Redirect to WhatsApp
            window.open(`https://wa.me/923336224334?text=${encodedMessage}`, '_blank');
            
            // Show success message
            alert('Thank you! You will be redirected to WhatsApp to send your inquiry.');
            
            // Reset form
            this.reset();
        });
    }

    // Add animation on scroll
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .process-step, .facility-card, .leader-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add active class to current page in navigation
window.addEventListener('load', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});
