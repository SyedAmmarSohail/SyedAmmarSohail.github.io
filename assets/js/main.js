// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(13, 17, 23, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(13, 17, 23, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-item, .stat-item, .timeline-item, .carousel-container, .contact-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize animation styles
    const initAnimations = function() {
        const elements = document.querySelectorAll('.service-item, .stat-item, .timeline-item, .carousel-container, .contact-item');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    };
    
    // Run animations
    initAnimations();
    animateOnScroll();
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Add typing effect to hero text
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = function() {
                if (i < text.length) {
                    heroName.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            typeWriter();
        }, 500);
    }
    
    // Add hover effects to tech stack items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn, .project-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.3);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            // Add ripple styles if not already added
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                    .btn, .project-link {
                        position: relative;
                        overflow: hidden;
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add particle effect to hero section
    const createParticles = function() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 107, 53, 0.3);
                border-radius: 50%;
                animation: float ${Math.random() * 20 + 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 0;
            `;
            hero.appendChild(particle);
        }
        
        // Add particle animation styles
        if (!document.querySelector('#particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
                    50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
                    100% { transform: translateY(0px) rotate(360deg); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    // Initialize particles
    createParticles();
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    });
    
    // Set initial body opacity
    document.body.style.opacity = '0';
    
    // Add intersection observer for better performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        const observeElements = document.querySelectorAll('.service-item, .stat-item, .timeline-item, .carousel-container, .contact-item');
        observeElements.forEach(el => observer.observe(el));
    }
    
    // Add active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a');
    
    const highlightNav = function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
    
    // Add active nav styles
    const navStyle = document.createElement('style');
    navStyle.textContent = `
        .nav-menu a.active {
            color: var(--accent-color);
        }
        .nav-menu a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(navStyle);
    
    // Carousel Functionality
    initializeCarousel();
});

// Carousel Implementation
function initializeCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;
    
    const cards = track.querySelectorAll('.project-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let maxIndex = Math.max(0, totalCards - cardsPerView);
    let isAutoPlaying = true;
    let autoPlayInterval;
    
    // Create dot indicators
    function createDots() {
        dotsContainer.innerHTML = '';
        const totalDots = maxIndex + 1;
        
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Get number of cards to show based on screen size
    function getCardsPerView() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1200) return 3;
        if (screenWidth >= 768) return 2;
        return 1;
    }
    
    // Update carousel position
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 32; // 32px for gap
        const translateX = -currentIndex * cardWidth;
        track.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === maxIndex;
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateCarousel();
        resetAutoPlay();
    }
    
    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    }
    
    // Next slide
    function nextSlide() {
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        } else if (isAutoPlaying) {
            // Loop back to start for auto-play
            goToSlide(0);
        }
    }
    
    // Auto-play functionality
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            if (isAutoPlaying) {
                nextSlide();
            }
        }, 4000);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    function resetAutoPlay() {
        if (isAutoPlaying) {
            stopAutoPlay();
            startAutoPlay();
        }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        pauseAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        pauseAutoPlay();
    });
    
    // Pause auto-play temporarily when user interacts
    function pauseAutoPlay() {
        isAutoPlaying = false;
        stopAutoPlay();
        setTimeout(() => {
            isAutoPlaying = true;
            startAutoPlay();
        }, 8000); // Resume after 8 seconds
    }
    
    // Handle window resize
    function handleResize() {
        const newCardsPerView = getCardsPerView();
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
            maxIndex = Math.max(0, totalCards - cardsPerView);
            currentIndex = Math.min(currentIndex, maxIndex);
            createDots();
            updateCarousel();
        }
    }
    
    // Keyboard navigation
    function handleKeydown(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            pauseAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            pauseAutoPlay();
        }
    }
    
    // Touch/swipe support
    let startX = 0;
    let isDragging = false;
    
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        track.style.transition = 'none';
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        const cardWidth = cards[0].offsetWidth + 32;
        const currentTranslateX = -currentIndex * cardWidth;
        
        track.style.transform = `translateX(${currentTranslateX - diffX}px)`;
    }
    
    function handleTouchEnd(e) {
        if (!isDragging) return;
        
        isDragging = false;
        track.style.transition = 'transform 0.5s ease-in-out';
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentIndex < maxIndex) {
                nextSlide();
            } else if (diffX < 0 && currentIndex > 0) {
                prevSlide();
            } else {
                updateCarousel(); // Snap back
            }
            pauseAutoPlay();
        } else {
            updateCarousel(); // Snap back
        }
    }
    
    // Intersection Observer for auto-play control
    const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoPlay();
            } else {
                stopAutoPlay();
            }
        });
    });
    
    // Initialize
    createDots();
    updateCarousel();
    startAutoPlay();
    
    // Add event listeners
    window.addEventListener('resize', debounce(handleResize, 250));
    document.addEventListener('keydown', handleKeydown);
    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchmove', handleTouchMove, { passive: true });
    track.addEventListener('touchend', handleTouchEnd, { passive: true });
    carouselObserver.observe(track);
    
    // Pause auto-play when hovering over carousel
    const carouselContainer = track.closest('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            stopAutoPlay();
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            if (isAutoPlaying) {
                startAutoPlay();
            }
        });
    }
    
    // Cleanup function
    return function cleanup() {
        stopAutoPlay();
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('keydown', handleKeydown);
        track.removeEventListener('touchstart', handleTouchStart);
        track.removeEventListener('touchmove', handleTouchMove);
        track.removeEventListener('touchend', handleTouchEnd);
        carouselObserver.disconnect();
    };
}

// Add mobile menu functionality (if needed in future)
const addMobileMenu = function() {
    // Mobile menu toggle functionality can be added here
    // This is a placeholder for future mobile menu implementation
};

// Performance optimization
const debounce = function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};