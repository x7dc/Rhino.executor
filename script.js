// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animated Counter for Stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate stats when they come into view
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .stat-number, .testimonial, .help-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Download functionality
const downloadButtons = document.querySelectorAll('.download-btn');
downloadButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const os = this.getAttribute('data-os');
        
        // Simulate download process
        const originalContent = this.innerHTML;
        this.innerHTML = '<span class="loading"></span> Preparing download...';
        this.disabled = true;
        
        setTimeout(() => {
            // Create actual download
            downloadFile('Rhino.exe', 'Rhino.exe');
            
            this.innerHTML = originalContent;
            this.disabled = false;
        }, 2000);
    });
});

// Function to trigger file download
const downloadFile = (filename, displayName) => {
    const link = document.createElement('a');
    link.href = filename;
    link.download = displayName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification(`Downloading ${displayName}...`, 'success');
};

// Executor UI Simulation
const executeBtn = document.querySelector('.execute-btn');
const clearBtn = document.querySelector('.clear-btn');
const attachBtn = document.querySelector('.attach-btn');

if (executeBtn) {
    executeBtn.addEventListener('click', function() {
        this.style.background = '#10b981';
        this.textContent = 'Executing...';
        
        setTimeout(() => {
            this.style.background = '#10b981';
            this.textContent = 'Executed';
            
            setTimeout(() => {
                this.style.background = '';
                this.textContent = 'Execute';
            }, 2000);
        }, 1500);
    });
}

if (clearBtn) {
    clearBtn.addEventListener('click', function() {
        const editorContent = document.querySelector('.editor-content');
        if (editorContent) {
            editorContent.innerHTML = '<span class="code-line">-- Ready to execute</span>';
        }
    });
}

if (attachBtn) {
    attachBtn.addEventListener('click', function() {
        this.style.background = '#10b981';
        this.textContent = 'Attached!';
        
        setTimeout(() => {
            this.style.background = '';
            this.textContent = 'Attach';
        }, 2000);
    });
}

// Typing effect disabled to prevent rotation issues
// const typeWriter = (element, text, speed = 100) => {
//     let i = 0;
//     element.textContent = '';
//     
//     const type = () => {
//         if (i < text.length) {
//             element.textContent += text.charAt(i);
//             i++;
//             setTimeout(type, speed);
//         }
//     };
//     
//     type();
// };

// Initialize typing effect when page loads - DISABLED
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 50);
//     }
// });

// Reduced parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // Subtle parallax effect
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add hover effect to cards (reduced to prevent rotation)
document.querySelectorAll('.feature-card, .download-card, .help-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Form validation (if you add forms later)
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
};

// Removed Easter egg to prevent unwanted rotation effects

// Performance optimization: Debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll events (reduced functionality)
const optimizedScroll = debounce(() => {
    // Simple navbar hide/show on scroll
    const scrolled = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (scrolled > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
}, 10);

window.addEventListener('scroll', optimizedScroll);

// Removed mouse movement navbar functionality to prevent rotation issues

// Dynamic year in footer
const updateYear = () => {
    const yearElements = document.querySelectorAll('.footer-bottom p');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        if (element.textContent.includes('2025')) {
            element.textContent = element.textContent.replace('2025', currentYear);
        }
    });
};

updateYear();

// Copy to clipboard functionality
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
};

// Show notification
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
};

// Add slide animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Rhino Executor Website - Loaded Successfully! 🦏');
});
