const pool = require('../config/db');

class EstadoModel {
    static async getAll() {
        const [rows] = await pool.execute('SELECT * FROM estados');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.execute('SELECT * FROM estados WHERE idestado = ?', [id]);
        return rows[0];
    }

    static async getByName(estado) {
        const [rows] = await pool.execute('SELECT * FROM estados WHERE estado = ?', [estado]);
        return rows[0];
    }
}

module.exports = EstadoModel;
