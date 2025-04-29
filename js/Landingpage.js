document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-bar .btn');
    const sections = document.querySelectorAll('section');
    
    // Toggle Mobile Menu
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            
            // Update active link
            navItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Search functionality
    searchButton.addEventListener('click', function() {
        handleSearch();
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Show alert if search is empty
            showNotification('Silakan masukkan kata kunci pencarian', 'warning');
            return;
        }
        
        // Simulate search results (in a real application, this would be connected to a database)
        showNotification(`Mencari fitur "${searchTerm}"...`, 'info');
        
        // Clear input after search
        searchInput.value = '';
    }
    
    // Scroll to section when clicking navigation links
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <p>${message}</p>
                <button class="close-notification"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // Append to body
        document.body.appendChild(notification);
        
        // Show notification with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Setup close button
        const closeBtn = notification.querySelector('.close-notification');
        closeBtn.addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto dismiss after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add notification styles dynamically
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1100;
            max-width: 350px;
            transform: translateX(120%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            background-color: white;
            padding: 15px 20px;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification.info .notification-content {
            border-left: 4px solid #3498db;
        }
        
        .notification.success .notification-content {
            border-left: 4px solid #2ecc71;
        }
        
        .notification.warning .notification-content {
            border-left: 4px solid #f39c12;
        }
        
        .notification.error .notification-content {
            border-left: 4px solid #e74c3c;
        }
        
        .close-notification {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
            color: #999;
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = notificationStyles;
    document.head.appendChild(styleElement);
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .tool-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Add initial styles for animation
    const animationStyles = `
        .feature-card, .tool-card, .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `;
    
    const animationStyleElement = document.createElement('style');
    animationStyleElement.textContent = animationStyles;
    document.head.appendChild(animationStyleElement);
    
    // Run animation function on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Form submission handlers
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                showNotification('Silakan masukkan alamat email Anda', 'warning');
                return;
            }
            
            // Simulate successful subscription
            showNotification('Terima kasih telah berlangganan newsletter kami!', 'success');
            emailInput.value = '';
        });
    }
});