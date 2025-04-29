document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Basic validation
        if (username && password) {
            // Redirect to dashboard page after successful login
            window.location.href = 'dashboard.html';
        } else {
            alert('Please fill in all fields.');
        }
    });
    
    // Add animation effects for better UX
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.03)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Forgot password functionality
    const forgotPasswordLink = document.querySelector('.forgot-password a');
    
    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Password reset functionality would be implemented here.');
    });
    
    // Sign up functionality
    const signupLink = document.querySelector('.signup-link a');
    
    signupLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Sign up page would be accessed here.');
    });
});