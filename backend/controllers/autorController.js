const AutorModel = require('../models/autorModel');
const bcrypt = require('bcryptjs');

class AutorController {
    // Get all autores
    static async getAll(req, res) {
        try {
            const autores = await AutorModel.getAll();
            res.json(autores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get autor by ID
    static async getById(req, res) {
        try {
            const autor = await AutorModel.getById(req.params.id);
            if (!autor) return res.status(404).json({ message: 'Autor not found' });
            res.json(autor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Create autor
    static async create(req, res) {
        try {
            const { primeiro_nome, ultimo_nome, email, username, senha, biografia, foto_perfil } = req.body;
            const hashedPassword = await bcrypt.hash(senha, 10);
            const id = await AutorModel.create({
                primeiro_nome,
                ultimo_nome,
                email,
                username,
                senha: hashedPassword,
                biografia,
                foto_perfil
            });
            res.status(201).json({ id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update autor
    static async update(req, res) {
        try {
            const { primeiro_nome, ultimo_nome, email, username, senha, biografia, foto_perfil } = req.body;
            const hashedPassword = senha ? await bcrypt.hash(senha, 10) : undefined;
            await AutorModel.update(req.params.id, {
                primeiro_nome,
                ultimo_nome,
                email,
                username,
                senha: hashedPassword || req.body.senha,
                biografia,
                foto_perfil
            });
            res.json({ message: 'Autor updated' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete autor
    static async delete(req, res) {
        try {
            await AutorModel.delete(req.params.id);
            res.json({ message: 'Autor deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AutorController;