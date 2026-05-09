const ComentarioModel = require('../models/comentarioModel');

class ComentarioController {
    // Get all comentarios
    static async getAll(req, res) {
        try {
            const comentarios = await ComentarioModel.getAll();
            res.json(comentarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get comentarios by publicacao
    static async getByPublicacao(req, res) {
        try {
            const comentarios = await ComentarioModel.getByPublicacao(req.params.idPublicacao);
            res.json(comentarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get comentario by ID
    static async getById(req, res) {
        try {
            const comentario = await ComentarioModel.getById(req.params.id);
            if (!comentario) return res.status(404).json({ message: 'Comentario not found' });
            res.json(comentario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Create comentario
    static async create(req, res) {
        try {
            const { conteudo, idpublicacao, idleitor } = req.body;
            const id = await ComentarioModel.create({
                conteudo,
                idpublicacao,
                idleitor
            });
            res.status(201).json({ id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update comentario
    static async update(req, res) {
        try {
            const { conteudo, estado } = req.body;
            await ComentarioModel.update(req.params.id, {
                conteudo,
                estado
            });
            res.json({ message: 'Comentario updated' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete comentario
    static async delete(req, res) {
        try {
            await ComentarioModel.delete(req.params.id);
            res.json({ message: 'Comentario deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Approve comentario
    static async approve(req, res) {
        try {
            await ComentarioModel.approve(req.params.id);
            res.json({ message: 'Comentario approved' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Reject comentario
    static async reject(req, res) {
        try {
            await ComentarioModel.reject(req.params.id);
            res.json({ message: 'Comentario rejected' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ComentarioController;