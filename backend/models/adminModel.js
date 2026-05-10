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
            [
                primeiro_nome,
                ultimo_nome,
                email,
                username,
                senha,
                pin
            ]
        );
        return result.insertId;
    }

    // Update admin
    static async update(id, admin) {
        const fields = [];
        const values = [];

        if (admin.primeiro_nome !== undefined) {
            fields.push('primeiro_nome = ?');
            values.push(admin.primeiro_nome);
        }
        if (admin.ultimo_nome !== undefined) {
            fields.push('ultimo_nome = ?');
            values.push(admin.ultimo_nome);
        }
        if (admin.email !== undefined) {
            fields.push('email = ?');
            values.push(admin.email);
        }
        if (admin.username !== undefined) {
            fields.push('username = ?');
            values.push(admin.username);
        }
        if (admin.senha !== undefined) {
            fields.push('senha = ?');
            values.push(admin.senha);
        }
        if (admin.pin !== undefined) {
            fields.push('pin = ?');
            values.push(admin.pin);
        }

        if (fields.length === 0) {
            return;
        }

        values.push(id);
        await pool.execute(
            `UPDATE administradores SET ${fields.join(', ')} WHERE idAdm = ?`,
            values
        );
    }

    // Delete admin
    static async delete(id) {
        await pool.execute('DELETE FROM administradores WHERE idAdm = ?', [id]);
    }
}

module.exports = AdminModel;