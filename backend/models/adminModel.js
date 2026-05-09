const pool = require('../config/db');

class AdminModel {
    // Get all admins
    static async getAll() {
        const [rows] = await pool.execute('SELECT * FROM administradores');
        return rows;
    }

    // Get admin by ID
    static async getById(id) {
        const [rows] = await pool.execute('SELECT * FROM administradores WHERE idAdm = ?', [id]);
        return rows[0];
    }

    // Get admin by username
    static async getByUsername(username) {
        const [rows] = await pool.execute('SELECT * FROM administradores WHERE username = ?', [username]);
        return rows[0];
    }

    // Create admin
    static async create(admin) {
        const { primeiro_nome, ultimo_nome, email, username, senha, pin } = admin;
        const [result] = await pool.execute(
            'INSERT INTO administradores (primeiro_nome, ultimo_nome, email, username, senha, pin) VALUES (?, ?, ?, ?, ?, ?)',
            [primeiro_nome, ultimo_nome, email, username, senha, pin]
        );
        return result.insertId;
    }

    // Update admin
    static async update(id, admin) {
        const { primeiro_nome, ultimo_nome, email, username, senha, pin } = admin;
        await pool.execute(
            'UPDATE administradores SET primeiro_nome = ?, ultimo_nome = ?, email = ?, username = ?, senha = ?, pin = ? WHERE idAdm = ?',
            [primeiro_nome, ultimo_nome, email, username, senha, pin, id]
        );
    }

    // Delete admin
    static async delete(id) {
        await pool.execute('DELETE FROM administradores WHERE idAdm = ?', [id]);
    }
}

module.exports = AdminModel;