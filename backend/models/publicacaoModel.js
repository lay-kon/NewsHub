const pool = require('../config/db');

class PublicacaoModel {
    // Get all publicacoes
    static async getAll() {
        const [rows] = await pool.execute(`
            SELECT p.*, la.primeiro_nome, la.ultimo_nome, e.estado, c.nome as categoria
            FROM publicacoes p
            JOIN leitorAutores la ON p.idautor = la.idLeitorAutor
            JOIN estados e ON p.idestado = e.idestado
            LEFT JOIN categorias c ON p.idCategoria = c.idCategoria
            ORDER BY p.data_publicacao DESC
        `);
        return rows;
    }

    // Get publicacao by ID
    static async getById(id) {
        const [rows] = await pool.execute(`
            SELECT p.*, la.primeiro_nome, la.ultimo_nome, e.estado, c.nome as categoria
            FROM publicacoes p
            JOIN leitorAutores la ON p.idautor = la.idLeitorAutor
            JOIN estados e ON p.idestado = e.idestado
            LEFT JOIN categorias c ON p.idCategoria = c.idCategoria
            WHERE p.idPublicacao = ?
        `, [id]);
        return rows[0];
    }

    // Get publicacoes by estado
    static async getByEstado(estado) {
        const [rows] = await pool.execute(`
            SELECT p.*, la.primeiro_nome, la.ultimo_nome, e.estado, c.nome as categoria
            FROM publicacoes p
            JOIN leitorAutores la ON p.idautor = la.idLeitorAutor
            JOIN estados e ON p.idestado = e.idestado
            LEFT JOIN categorias c ON p.idCategoria = c.idCategoria
            WHERE e.estado = ?
            ORDER BY p.data_publicacao DESC
        `, [estado]);
        return rows;
    }

    // Create publicacao
    static async create(publicacao) {
        const { titulo, resumo, conteudo, imagem_destaque, arquivo_pdf, idestado, idautor, idCategoria } = publicacao;
        const [result] = await pool.execute(
            'INSERT INTO publicacoes (titulo, resumo, conteudo, imagem_destaque, arquivo_pdf, idestado, idautor, idCategoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [titulo, resumo, conteudo, imagem_destaque, arquivo_pdf, idestado, idautor, idCategoria]
        );
        return result.insertId;
    }

    // Update publicacao
    static async update(id, publicacao) {
        const { titulo, resumo, conteudo, imagem_destaque, arquivo_pdf, idestado, idCategoria } = publicacao;
        await pool.execute(
            'UPDATE publicacoes SET titulo = ?, resumo = ?, conteudo = ?, imagem_destaque = ?, arquivo_pdf = ?, idestado = ?, idCategoria = ? WHERE idPublicacao = ?',
            [titulo, resumo, conteudo, imagem_destaque, arquivo_pdf, idestado, idCategoria, id]
        );
    }

    // Delete publicacao
    static async delete(id) {
        await pool.execute('DELETE FROM publicacoes WHERE idPublicacao = ?', [id]);
    }

    // Validate publicacao
    static async validate(idPublicacao, idAdm) {
        await pool.execute('INSERT INTO validacoes (idadm, idpublicacao) VALUES (?, ?)', [idAdm, idPublicacao]);
        await pool.execute('UPDATE publicacoes SET idestado = (SELECT idestado FROM estados WHERE estado = "publicado") WHERE idPublicacao = ?', [idPublicacao]);
    }
}

module.exports = PublicacaoModel;