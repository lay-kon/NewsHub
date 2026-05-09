const pool = require('../config/db');

class CategoriaModel {
    static async getAll() {
        const [rows] = await pool.execute('SELECT * FROM categorias');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.execute('SELECT * FROM categorias WHERE idCategoria = ?', [id]);
        return rows[0];
    }

    static async create(nome) {
        const [result] = await pool.execute('INSERT INTO categorias (nome) VALUES (?)', [nome]);
        return result.insertId;
    }

    static async delete(id) {
        await pool.execute('DELETE FROM categorias WHERE idCategoria = ?', [id]);
    }
}

module.exports = CategoriaModel;
