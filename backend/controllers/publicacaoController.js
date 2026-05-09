const PublicacaoModel = require('../models/publicacaoModel');

class PublicacaoController {
    // Get all publicacoes
    static async getAll(req, res) {
        try {
            const publicacoes = await PublicacaoModel.getAll();
            res.json(publicacoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get publicacao by ID
    static async getById(req, res) {
        try {
            const publicacao = await PublicacaoModel.getById(req.params.id);
            if (!publicacao) return res.status(404).json({ message: 'Publicacao not found' });
            res.json(publicacao);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get publicacoes by estado
    static async getByEstado(req, res) {
        try {
            const publicacoes = await PublicacaoModel.getByEstado(req.params.estado);
            res.json(publicacoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Create publicacao
    static async create(req, res) {
        try {
            const { titulo, resumo, conteudo, imagem_destaque, arquivo_pdf, idestado, idautor, idCategoria } = req.body;
            const id = await PublicacaoModel.create({
                titulo,
                resumo,
                conteudo,
                imagem_destaque,
                arquivo_pdf,
                idestado,
                idautor,
                idCategoria
            });
            res.status(201).json({ id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update publicacao
    static async update(req, res) {
        try {
            const { titulo, resumo, conteudo, imagem_destaque, arquivo_pdf, idestado, idCategoria } = req.body;
            await PublicacaoModel.update(req.params.id, {
                titulo,
                resumo,
                conteudo,
                imagem_destaque,
                arquivo_pdf,
                idestado,
                idCategoria
            });
            res.json({ message: 'Publicacao updated' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete publicacao
    static async delete(req, res) {
        try {
            await PublicacaoModel.delete(req.params.id);
            res.json({ message: 'Publicacao deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Validate publicacao
    static async validate(req, res) {
        try {
            const { idAdm } = req.body; // Assuming from auth middleware
            await PublicacaoModel.validate(req.params.id, idAdm);
            res.json({ message: 'Publicacao validated' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PublicacaoController;