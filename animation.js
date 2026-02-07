// Advanced Animations for Raymond Musinguzi Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initScrollAnimations();
    initParallaxEffects();
    initSkillBars();
    initTypewriterEffect();
    initMouseEffects();
    initProjectHoverEffects();
});

// Scroll-based animations
function initScrollAnimations() {
    // Create CSS for animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        .animate-on-scroll {
            opacity: 0;
        }
        
        .animate-fade-up {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        .animate-fade-left {
            animation: fadeInLeft 0.8s ease forwards;
        }
        
        .animate-fade-right {
            animation: fadeInRight 0.8s ease forwards;
        }
        
        .animate-scale {
            animation: scaleIn 0.8s ease forwards;
        }
        
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-100 {
            animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
            animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
            animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
            animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
            animation-delay: 0.5s;
        }
        
        .skill-bar {
            height: 6px;
            background: #e2e8f0;
            border-radius: 3px;
            overflow: hidden;
            position: relative;
        }
        
        .skill-progress {
            height: 100%;
            background: linear-gradient(90deg, #2563eb, #3b82f6);
            border-radius: 3px;
            width: 0;
            transition: width 1.5s ease-in-out;
        }
        
        .hover-glow {
            transition: all 0.3s ease;
        }
        
        .hover-glow:hover {
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
        }
        
        .cursor-dot {
            width: 8px;
            height: 8px;
            background-color: #2563eb;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, background-color 0.3s;
        }
        
        .cursor-outline {
            width: 40px;
            height: 40px;
            border: 2px solid #2563eb;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
            opacity: 0.5;
        }
    `;
    document.head.appendChild(animationStyles);

    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add appropriate animation class based on element
                if (element.classList.contains('hero-title')) {
                    element.classList.add('animate-fade-up');
                } else if (element.classList.contains('hero-subtitle')) {
                    element.classList.add('animate-fade-up', 'animation-delay-200');
                } else if (element.classList.contains('hero-badges')) {
                    element.classList.add('animate-fade-up', 'animation-delay-300');
                } else if (element.classList.contains('hero-cta')) {
                    element.classList.add('animate-fade-up', 'animation-delay-400');
                } else if (element.classList.contains('timeline-item')) {
                    const index = Array.from(element.parentElement.children).indexOf(element);
                    element.classList.add('animate-fade-left');
                    element.style.animationDelay = `${index * 0.2}s`;
                } else if (element.classList.contains('category')) {
                    const index = Array.from(element.parentElement.children).indexOf(element);
                    element.classList.add('animate-scale');
                    element.style.animationDelay = `${index * 0.1}s`;
                } else if (element.classList.contains('project-card')) {
                    const index = Array.from(element.parentElement.children).indexOf(element);
                    element.classList.add('animate-fade-up');
                    element.style.animationDelay = `${index * 0.15}s`;
                } else if (element.classList.contains('highlight-card')) {
                    const index = Array.from(element.parentElement.children).indexOf(element);
                    element.classList.add('animate-scale');
                    element.style.animationDelay = `${index * 0.1}s`;
                } else {
                    element.classList.add('animate-fade-up');
                }
                
                // Stop observing once animated
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.hero-title, .hero-subtitle, .hero-badges, .hero-cta, ' +
        '.timeline-item, .category, .project-card, .highlight-card, ' +
        '.service-item, .company-collab, .founder-quote'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Parallax scrolling effects
function initParallaxEffects() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Apply parallax to hero elements
        const heroContent = heroSection.querySelector('.hero-content');
        const heroImage = heroSection.querySelector('.hero-image');
        
        if (heroContent && scrolled < heroSection.offsetHeight) {
            heroContent.style.transform = `translateY(${rate * 0.3}px)`;
        }
        
        if (heroImage && scrolled < heroSection.offsetHeight) {
            heroImage.style.transform = `translateY(${rate * 0.5}px)`;
        }
    });
}

// Animated skill bars (optional enhancement)
function initSkillBars() {
    const skillsSection = document.querySelector('.skills-section');
    if (!skillsSection) return;

    // Create skill bars for each category
    const categories = document.querySelectorAll('.category');
    categories.forEach((category, index) => {
        const skillList = category.querySelector('.skills-list');
        if (!skillList) return;

        // Replace list items with animated bars
        const items = skillList.querySelectorAll('li');
        items.forEach(item => {
            const skillName = item.textContent;
            const skillLevel = Math.floor(Math.random() * 30) + 70; // 70-100%
            
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';
            skillBar.innerHTML = `
                <div class="skill-info">
                    <span class="skill-name">${skillName}</span>
                    <span class="skill-percent">${skillLevel}%</span>
                </div>
                <div class="skill-progress" data-level="${skillLevel}"></div>
            `;
            
            // Add styles for skill info
            const style = document.createElement('style');
            style.textContent = `
                .skill-info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                }
                
                .skill-name {
                    font-weight: 500;
                    color: #1e293b;
                }
                
                .skill-percent {
                    font-weight: 600;
                    color: #2563eb;
                }
            `;
            document.head.appendChild(style);
            
            item.replaceWith(skillBar);
        });
    });

    // Animate skill bars on scroll
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    setTimeout(() => {
                        bar.style.width = `${level}%`;
                    }, 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillObserver.observe(skillsSection);
}

// Typewriter effect for hero section
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const originalText = heroTitle.innerHTML;
    const textToType = "Raymond Musinguzi";
    
    // Only apply to the highlighted name part
    const highlightSpan = heroTitle.querySelector('.highlight');
    if (!highlightSpan) return;
    
    const originalHighlightText = highlightSpan.textContent;
    
    // Split text into characters
    const characters = originalHighlightText.split('');
    highlightSpan.textContent = '';
    
    // Add cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.textContent = '|';
    cursor.style.cssText = `
        color: #2563eb;
        animation: blink 1s infinite;
        font-weight: 300;
    `;
    
    // Add cursor animation
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(cursorStyle);
    
    highlightSpan.appendChild(cursor);
    
    // Type each character
    let i = 0;
    const typeCharacter = () => {
        if (i < characters.length) {
            const charSpan = document.createElement('span');
            charSpan.textContent = characters[i];
            charSpan.style.cssText = `
                display: inline-block;
                animation: bounceIn 0.2s ease;
            `;
            
            // Add bounce animation
            const bounceStyle = document.createElement('style');
            bounceStyle.textContent = `
                @keyframes bounceIn {
                    0% { transform: scale(0); }
                    80% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(bounceStyle);
            
            highlightSpan.insertBefore(charSpan, cursor);
            i++;
            setTimeout(typeCharacter, 100);
        } else {
            // Remove cursor when done
            setTimeout(() => {
                cursor.style.animation = 'none';
                cursor.style.opacity = '0';
                setTimeout(() => cursor.remove(), 500);
            }, 1000);
        }
    };
    
    // Start typing after a delay
    setTimeout(typeCharacter, 500);
}

// Custom cursor effects
function initMouseEffects() {
    // Only enable on non-touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        return;
    }

    // Create custom cursor elements
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    const speedDot = 0.1;
    const speedOutline = 0.05;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animateCursor() {
        // Dot follows mouse directly
        dotX += (mouseX - dotX) * speedDot;
        dotY += (mouseY - dotY) * speedDot;
        
        // Outline follows with delay
        outlineX += (mouseX - outlineX) * speedOutline;
        outlineY += (mouseY - outlineY) * speedOutline;
        
        // Update positions
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Interactive elements effects
    const interactiveElements = document.querySelectorAll(
        'a, button, .project-card, .category, .highlight-card, .service-item'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.style.width = '16px';
            cursorDot.style.height = '16px';
            cursorDot.style.backgroundColor = '#7c3aed';
            
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.borderColor = '#7c3aed';
            cursorOutline.style.opacity = '0.8';
            
            element.classList.add('hover-glow');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
            cursorDot.style.backgroundColor = '#2563eb';
            
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = '#2563eb';
            cursorOutline.style.opacity = '0.5';
            
            element.classList.remove('hover-glow');
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursorDot.style.width = '12px';
        cursorDot.style.height = '12px';
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
    });
    
    document.addEventListener('mouseup', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
    });
}

// Enhanced project hover effects
function initProjectHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const image = card.querySelector('.image-placeholder');
        if (!image) return;
        
        // Create overlay effect
        const overlay = document.createElement('div');
        overlay.className = 'project-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                to top,
                rgba(37, 99, 235, 0.9) 0%,
                rgba(37, 99, 235, 0.7) 50%,
                rgba(37, 99, 235, 0.3) 100%
            );
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            border-radius: 16px;
        `;
        
        const viewText = document.createElement('span');
        viewText.textContent = 'View Details →';
        viewText.style.cssText = `
            color: white;
            font-weight: 600;
            font-size: 1.2rem;
            transform: translateY(20px);
            transition: transform 0.3s ease;
            text-align: center;
            padding: 1rem;
        `;
        
        overlay.appendChild(viewText);
        image.style.position = 'relative';
        image.appendChild(overlay);
        
        card.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            viewText.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            viewText.style.transform = 'translateY(20px)';
        });
    });
}

// Page load animation
window.addEventListener('load', () => {
    // Add loading animation
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;
    
    const loaderContent = document.createElement('div');
    loaderContent.style.cssText = `
        text-align: center;
        color: white;
    `;
    
    const loaderText = document.createElement('div');
    loaderText.textContent = 'Raymond Musinguzi';
    loaderText.style.cssText = `
        font-family: 'Poppins', sans-serif;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
        background: linear-gradient(90deg, #2563eb, #7c3aed);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255,255,255,0.1);
        border-top-color: #2563eb;
        border-radius: 50%;
        margin: 0 auto;
        animation: spin 1s linear infinite;
    `;
    
    loaderContent.appendChild(loaderText);
    loaderContent.appendChild(spinner);
    loader.appendChild(loaderContent);
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(() => loader.remove(), 500);
    }, 1000);
});