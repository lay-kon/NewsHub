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
        background: ${type === 'error' ? '#EF4444' : '#22C55E'};
        z-index: 1000;
    `;
    document.body.appendChild(msgDiv);
    setTimeout(() => msgDiv.remove(), 3000);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('pt-BR');
}

function truncateText(text, length = 100) {
    return text.length > length ? text.substring(0, length) + '...' : text;
}

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Add navbar if not present
    if (!document.querySelector('.navbar')) {
        const navbar = document.createElement('nav');
        navbar.className = 'navbar';
        navbar.innerHTML = `
            <div>
                <a href="index.html">NewsHub</a>
            </div>
            <div>
                <a href="index.html">Home</a>
                <a href="login.html">Login</a>
                <a href="dashboard.html">Dashboard</a>
            </div>
        `;
        document.body.insertBefore(navbar, document.body.firstChild);
    }
});

window.showMessage = showMessage;
window.formatDate = formatDate;
window.truncateText = truncateText;