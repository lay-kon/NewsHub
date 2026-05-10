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
        const params = [
            primeiro_nome ?? null,
            ultimo_nome ?? null,
            email ?? null,
            username ?? null,
            senha ?? null,
            biografia ?? null,
            foto_perfil ?? null
        ];
        const [result] = await pool.execute(
            'INSERT INTO leitorAutores (primeiro_nome, ultimo_nome, email, username, senha, biografia, foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?)',
            params
        );
        return result.insertId;
    }

    // Update autor
    static async update(id, autor) {
        const fields = [];
        const values = [];

        if (autor.primeiro_nome !== undefined) {
            fields.push('primeiro_nome = ?');
            values.push(autor.primeiro_nome);
        }
        if (autor.ultimo_nome !== undefined) {
            fields.push('ultimo_nome = ?');
            values.push(autor.ultimo_nome);
        }
        if (autor.email !== undefined) {
            fields.push('email = ?');
            values.push(autor.email);
        }
        if (autor.username !== undefined) {
            fields.push('username = ?');
            values.push(autor.username);
        }
        if (autor.senha !== undefined) {
            fields.push('senha = ?');
            values.push(autor.senha);
        }
        if (autor.biografia !== undefined) {
            fields.push('biografia = ?');
            values.push(autor.biografia);
        }
        if (autor.foto_perfil !== undefined) {
            fields.push('foto_perfil = ?');
            values.push(autor.foto_perfil);
        }

        if (fields.length === 0) {
            return;
        }

        values.push(id);
        await pool.execute(
            `UPDATE leitorAutores SET ${fields.join(', ')} WHERE idLeitorAutor = ?`,
            values
        );
    }

    // Delete autor
    static async delete(id) {
        await pool.execute('DELETE FROM leitorAutores WHERE idLeitorAutor = ?', [id]);
    }
}

module.exports = AutorModel;