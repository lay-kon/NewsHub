// Utility functions
function showMessage(message, type = 'info') {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;
    msgDiv.textContent = message;
    msgDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem;
        border-radius: 4px;
        color: white;
        background: ${type === 'error' ? '#EF4444' : type === 'warning' ? '#F59E0B' : '#22C55E'};
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(msgDiv);
    setTimeout(() => msgDiv.remove(), 4000);
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function truncateText(text, length = 100) {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Add navbar if not present
    if (!document.querySelector('.navbar')) {
        const navbar = document.createElement('nav');
        navbar.className = 'navbar';
        
        const userType = AuthService.getUserType();
        const isLoggedIn = AuthService.isLoggedIn();
        const userName = AuthService.getUserName();
        
        let navLinksHTML = `
            <div class="nav-logo">
                <a href="index.html" id="nav-logo-link"><strong>NewsHub</strong></a>
            </div>
            <div class="nav-menu">
                <a href="index.html">Home</a>
                <a href="publicacoes.html">Publicações</a>
        `;
        
        if (!isLoggedIn) {
            navLinksHTML += `
                <a href="author-login.html">Entrar</a>
            `;
        } else if (userType === 'admin') {
            navLinksHTML += `
                <a href="dashboard.html">Dashboard</a>
                <span class="user-info">👤 ${userName || 'Admin'}</span>
                <button class="nav-logout" onclick="AuthService.logout()">Sair</button>
            `;
        } else if (userType === 'author') {
            navLinksHTML += `
                <a href="author-dashboard.html">Minhas Publicações</a>
                <span class="user-info">👤 ${userName || 'Autor'}</span>
                <button class="nav-logout" onclick="AuthService.logout()">Sair</button>
            `;
        }
        
        navLinksHTML += `
            </div>
        `;
        
        navbar.innerHTML = navLinksHTML;
        document.body.insertBefore(navbar, document.body.firstChild);

        const logoLink = navbar.querySelector('#nav-logo-link');
        let logoClicks = 0;
        let logoTimer = null;
        if (logoLink) {
            logoLink.addEventListener('click', function(event) {
                event.preventDefault();
                logoClicks += 1;

                if (logoClicks >= 4 && !isLoggedIn) {
                    logoClicks = 0;
                    if (logoTimer) {
                        clearTimeout(logoTimer);
                        logoTimer = null;
                    }
                    window.location.href = 'login.html';
                    return;
                }

                if (logoTimer) {
                    clearTimeout(logoTimer);
                }

                logoTimer = setTimeout(() => {
                    logoClicks = 0;
                    logoTimer = null;
                    window.location.href = 'index.html';
                }, 3000);
            });
        }
    }
});

window.showMessage = showMessage;
window.formatDate = formatDate;
window.truncateText = truncateText;
window.getQueryParam = getQueryParam;