// auth.js

function autoLogoutTemp1() {
    const expiry = localStorage.getItem('tokenExpiration');
    if (!expiry) {
        // If there's no expiry time set, log out immediately
        logoutTemp1();
        return;
    }

    const currentTime = new Date().getTime();
    const timeout = expiry - currentTime;

    if (timeout > 0) {
        setTimeout(() => {
            logoutTemp1(); // Call your logout function when the token expires
        }, timeout);
    } else {
        logoutTemp1(); // Token already expired, log out immediately
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    alert('Session expired. You have been logged out.');
    window.location.href = '/'; // Redirect to login page
}

function logoutTemp1() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    alert('Session expired. You have been logged out.');
    window.location.href = '/'; // Redirect to login page
}

function autoLogoutTemp3() {
    const expiry = localStorage.getItem('tokenExpiration_temp_3');
    if (!expiry) {
        // If there's no expiry time set, log out immediately
        logoutTemp3();
        return;
    }

    const currentTime = new Date().getTime();
    const timeout = expiry - currentTime;

    if (timeout > 0) {
        setTimeout(() => {
            logoutTemp3(); // Call your logout function when the token expires
        }, timeout);
    } else {
        logoutTemp3(); // Token already expired, log out immediately
    }
}

function logoutTemp3() {
    localStorage.removeItem('token_temp_3');
    localStorage.removeItem('tokenExpiration_temp_3');
    alert('Session expired. You have been logged out.');
    window.location.href = '/'; // Redirect to login page
}



function autoLogoutTemp4() {
    const expiry = localStorage.getItem('tokenExpiration_temp_4');
    if (!expiry) {
        // If there's no expiry time set, log out immediately
        logoutTemp4();
        return;
    }

    const currentTime = new Date().getTime();
    const timeout = expiry - currentTime;

    if (timeout > 0) {
        setTimeout(() => {
            logoutTemp4(); // Call your logout function when the token expires
        }, timeout);
    } else {
        logoutTemp4(); // Token already expired, log out immediately
    }
}

function logoutTemp4() {
    localStorage.removeItem('token_temp_4');
    localStorage.removeItem('tokenExpiration_temp_4');
    alert('Session expired. You have been logged out.');
    window.location.href = '/'; // Redirect to login page
}

export { logout, autoLogoutTemp1, logoutTemp1, autoLogoutTemp3, logoutTemp3,autoLogoutTemp4,logoutTemp4 };
