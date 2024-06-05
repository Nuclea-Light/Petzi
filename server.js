document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const profilePage = document.getElementById('user-info');
    const editProfileForm = document.getElementById('edit-profile-form');
    const cancelButton = document.getElementById('cancel');
    const logoutButton = document.getElementById('logout');

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
    }

    if (profilePage) {
        fetchUserInfo();
    }

    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const fullName = document.getElementById('full-name').value;
            const email = document.getElementById('email').value;
            updateUserProfile(fullName, email);
        });
    }

    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            logoutUser();
        });
    }
});

function registerUser(fullName, email, password, mobileNumber) {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, email, password, mobileNumber })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);  // Display pop-up message if user is already registered
        } else {
            alert('Registration successful! Redirecting...');
            window.location.href = 'blank.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
    });
}

function authenticateUser(email, password) {
    console.log(`Authenticating user with email: ${email} and password: ${password}`);
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        window.location.href = 'blank.html';
    } else {
        alert('Invalid email or password');
    }
}

function fetchUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('user'));

    if (userInfo) {
        document.getElementById('user-info').innerHTML = `
            <p>Name: ${userInfo.fullName}</p>
            <p>Email: ${userInfo.email}</p>
            <p>Mobile: ${userInfo.mobileNumber}</p>
        `;
    } else {
        document.getElementById('user-info').innerHTML = `
            <p>No user info found. Please log in.</p>
        `;
    }
}

function updateUserProfile(fullName, email) {
    console.log(`Updating user profile: ${fullName}, email: ${email}`);

    const user = {
        fullName: fullName,
        email: email,
        password: JSON.parse(localStorage.getItem('user')).password,
        mobileNumber: JSON.parse(localStorage.getItem('user')).mobileNumber
    };
    localStorage.setItem('user', JSON.stringify(user));

    window.location.href = 'profile.html';
}

function logoutUser() {
    console.log('User logged out');
    window.location.href = 'login.html';
}
