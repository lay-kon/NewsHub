class AuthService {
    static login(token, userType = 'admin', userId = null, userName = null) {
        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType);
        if (userId) localStorage.setItem('userId', userId);
        if (userName) localStorage.setItem('userName', userName);
        
        if (userType === 'admin') {
            window.location.href = 'dashboard.html';
        } else if (userType === 'author') {
            window.location.href = 'author-dashboard.html';
        }
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        window.location.href = 'index.html';
    }

    static isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static getUserType() {
        return localStorage.getItem('userType') || 'guest';
    }

    static getUserId() {
        return localStorage.getItem('userId');
    }

    static getUserName() {
        return localStorage.getItem('userName');
    }

    static isAdmin() {
        return this.getUserType() === 'admin';
    }

    static isAuthor() {
        return this.getUserType() === 'author';
    }
}

window.AuthService = AuthService;