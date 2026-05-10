const API_BASE = 'http://localhost:3000/api';

class ApiService {
    static async request(endpoint, options = {}) {
        const url = `${API_BASE}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    // Admin
    static async loginAdmin(credentials) {
        return this.request('/admins/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    // Publicacoes
    static async getPublicacoes() {
        return this.request('/publicacoes');
    }

    static async getPublicacao(id) {
        return this.request(`/publicacoes/${id}`);
    }

    static async createPublicacao(data) {
        return this.request('/publicacoes', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // Comentarios
    static async getComentarios(publicacaoId) {
        return this.request(`/comentarios/publicacao/${publicacaoId}`);
    }

    static async createComentario(data) {
        return this.request('/comentarios', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // Autores
    static async getAutores() {
        return this.request('/autores');
    }

    static async registroAutor(data) {
        return this.request('/autores/registro', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    static async loginAutor(credentials) {
        return this.request('/autores/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    static async updateAutor(id, data) {
        return this.request(`/autores/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // Categorias
    static async getCategorias() {
        return this.request('/categorias');
    }

    static async createCategoria(data) {
        return this.request('/categorias', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    static async deleteCategoria(id) {
        return this.request(`/categorias/${id}`, {
            method: 'DELETE'
        });
    }

    // Estados
    static async getEstados() {
        return this.request('/estados');
    }

    static async updatePublicacao(id, data) {
        return this.request(`/publicacoes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    static async deletePublicacao(id) {
        return this.request(`/publicacoes/${id}`, {
            method: 'DELETE'
        });
    }
}

window.ApiService = ApiService;