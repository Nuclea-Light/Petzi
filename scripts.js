document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const forgotPasswordButton = document.getElementById('forgot-password');

    // Initially hide all tabs except login
    tabContents.forEach(content => {
        if (content.id === 'login') {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });

    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const fullName = document.getElementById('full-name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const mobileNumber = document.getElementById('mobile-number').value;
            registerUser(fullName, email, password, mobileNumber);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            authenticateUser(email, password);
        });

        if (forgotPasswordButton) {
            forgotPasswordButton.addEventListener('click', function(event) {
                event.preventDefault();
                const email = document.getElementById('email').value;
                sendPasswordResetLink(email);
            });
        }
    }
});

function registerUser(fullName, email, password, mobileNumber) {
    // Registration code...
}

function authenticateUser(email, password) {
    // Authentication code...
}

function showTab(tabId) {
    // Tab switching code...
}

function sendPasswordResetLink(email) {
    // Logic to send password reset link to the registered mobile number
    alert(`Password reset link sent to ${email}`);
}
