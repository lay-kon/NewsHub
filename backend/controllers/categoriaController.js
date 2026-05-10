const CategoriaModel = require('../models/categoriaModel');

class CategoriaController {
    static async getAll(req, res) {
        try {
            const categorias = await CategoriaModel.getAll();
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const categoria = await CategoriaModel.getById(req.params.id);
            if (!categoria) return res.status(404).json({ message: 'Categoria não encontrada' });
            res.json(categoria);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Apenas administradores podem criar categorias' });
            }

            const { nome } = req.body;
            const id = await CategoriaModel.create(nome);
            res.status(201).json({ id, message: 'Categoria criada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Apenas administradores podem excluir categorias' });
            }

            await CategoriaModel.delete(req.params.id);
            res.json({ message: 'Categoria deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CategoriaController;
