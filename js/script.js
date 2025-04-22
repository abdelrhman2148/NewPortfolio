// Modern DevOps Engineer Portfolio - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Terminal typing effect
    const terminalCommands = document.querySelectorAll('.command');
    const cursor = document.querySelector('.cursor');

    // Simulate typing for each command
    if (terminalCommands.length > 0) {
        terminalCommands.forEach((command, index) => {
            const originalText = command.textContent;
            command.textContent = '';
            
            // Delay each command typing to create a sequence
            setTimeout(() => {
                typeText(command, originalText, 0, 100);
            }, index * 2000); // Stagger the commands
        });
    }

    function typeText(element, text, index, speed) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(() => typeText(element, text, index, speed), speed);
        }
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.section-title, .project-card, .tech-icon');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .section-title, .project-card, .tech-icon {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .section-title.animate, .project-card.animate, .tech-icon.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .project-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .tech-icon:nth-child(n) {
            transition-delay: calc(0.1s * var(--i, 0));
        }
    `;
    document.head.appendChild(style);

    // Set index for tech icons to create staggered animation
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach((icon, index) => {
        icon.style.setProperty('--i', index);
    });
});

<form action="https://formspree.io/f/myzwgapl" method="POST">
    <input type="text" name="_subject" value=" ">
    <input type="text" name="_next" value=" ">
</form>