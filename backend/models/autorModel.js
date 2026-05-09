const pool = require('../config/db');

class AutorModel {
    // Get all autores
    static async getAll() {
        const [rows] = await pool.execute('SELECT * FROM leitorAutores');
        return rows;
    }

    // Get autor by ID
    static async getById(id) {
        const [rows] = await pool.execute('SELECT * FROM leitorAutores WHERE idLeitorAutor = ?', [id]);
        return rows[0];
    }

    // Get autor by username
    static async getByUsername(username) {
        const [rows] = await pool.execute('SELECT * FROM leitorAutores WHERE username = ?', [username]);
        return rows[0];
    }

    // Create autor
    static async create(autor) {
        const { primeiro_nome, ultimo_nome, email, username, senha, biografia, foto_perfil } = autor;
        const [result] = await pool.execute(
            'INSERT INTO leitorAutores (primeiro_nome, ultimo_nome, email, username, senha, biografia, foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [primeiro_nome, ultimo_nome, email, username, senha, biografia, foto_perfil]
        );
        return result.insertId;
    }

    // Update autor
    static async update(id, autor) {
        const { primeiro_nome, ultimo_nome, email, username, senha, biografia, foto_perfil } = autor;
        await pool.execute(
            'UPDATE leitorAutores SET primeiro_nome = ?, ultimo_nome = ?, email = ?, username = ?, senha = ?, biografia = ?, foto_perfil = ? WHERE idLeitorAutor = ?',
            [primeiro_nome, ultimo_nome, email, username, senha, biografia, foto_perfil, id]
        );
    }

    // Delete autor
    static async delete(id) {
        await pool.execute('DELETE FROM leitorAutores WHERE idLeitorAutor = ?', [id]);
    }
}

module.exports = AutorModel;