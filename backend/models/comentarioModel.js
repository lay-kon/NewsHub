const pool = require('../config/db');

class ComentarioModel {
    // Get all comentarios
    static async getAll() {
        const [rows] = await pool.execute(`
            SELECT c.*, la.primeiro_nome, la.ultimo_nome, p.titulo as publicacao_titulo
            FROM comentarios c
            JOIN leitorAutores la ON c.idleitor = la.idLeitorAutor
            JOIN publicacoes p ON c.idpublicacao = p.idPublicacao
            ORDER BY c.data_hora DESC
        `);
        return rows;
    }

    // Get comentarios by publicacao
    static async getByPublicacao(idPublicacao) {
        const [rows] = await pool.execute(`
            SELECT c.*, la.primeiro_nome, la.ultimo_nome
            FROM comentarios c
            JOIN leitorAutores la ON c.idleitor = la.idLeitorAutor
            WHERE c.idpublicacao = ? AND c.estado = 'aprovado'
            ORDER BY c.data_hora DESC
        `, [idPublicacao]);
        return rows;
    }

    // Get comentario by ID
    static async getById(id) {
        const [rows] = await pool.execute(`
            SELECT c.*, la.primeiro_nome, la.ultimo_nome, p.titulo as publicacao_titulo
            FROM comentarios c
            JOIN leitorAutores la ON c.idleitor = la.idLeitorAutor
            JOIN publicacoes p ON c.idpublicacao = p.idPublicacao
            WHERE c.id_comentario = ?
        `, [id]);
        return rows[0];
    }

    // Create comentario
    static async create(comentario) {
        const { conteudo, idpublicacao, idleitor } = comentario;
        const [result] = await pool.execute(
            'INSERT INTO comentarios (conteudo, idpublicacao, idleitor) VALUES (?, ?, ?)',
            [conteudo, idpublicacao, idleitor]
        );
        return result.insertId;
    }

    // Update comentario
    static async update(id, comentario) {
        const { conteudo, estado } = comentario;
        await pool.execute(
            'UPDATE comentarios SET conteudo = ?, estado = ? WHERE id_comentario = ?',
            [conteudo, estado, id]
        );
    }

    // Delete comentario
    static async delete(id) {
        await pool.execute('DELETE FROM comentarios WHERE id_comentario = ?', [id]);
    }

    // Approve comentario
    static async approve(id) {
        await pool.execute('UPDATE comentarios SET estado = "aprovado" WHERE id_comentario = ?', [id]);
    }

    // Reject comentario
    static async reject(id) {
        await pool.execute('UPDATE comentarios SET estado = "rejeitado" WHERE id_comentario = ?', [id]);
    }
}

module.exports = ComentarioModel;