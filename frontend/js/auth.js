class AuthService {
    static login(token) {
        localStorage.setItem('token', token);
        window.location.href = 'dashboard.html';
    }

    static logout() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    }

    static isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    static getToken() {
        return localStorage.getItem('token');
    }
}

window.AuthService = AuthService;