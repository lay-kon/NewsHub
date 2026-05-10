const AutorModel = require('../models/autorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

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

    // Create autor (registro)
    static async create(req, res) {
        try {
            const { primeiro_nome, ultimo_nome, email, username, senha, biografia, foto_perfil } = req.body;

            if (!primeiro_nome || !ultimo_nome || !email || !username || !senha) {
                return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
            }

            const hashedPassword = await bcrypt.hash(senha, 10);
            const id = await AutorModel.create({
                primeiro_nome,
                ultimo_nome,
                email,
                username,
                senha: hashedPassword,
                biografia: biografia || null,
                foto_perfil: foto_perfil || null
            });
            res.status(201).json({ id, message: 'Autor criado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update autor
    static async update(req, res) {
        try {
            const { primeiro_nome, ultimo_nome, email, username, senha, biografia, foto_perfil } = req.body;
            const updateData = {
                primeiro_nome,
                ultimo_nome,
                email,
                username,
                biografia: biografia ?? null,
                foto_perfil: foto_perfil ?? null
            };

            if (senha) {
                updateData.senha = await bcrypt.hash(senha, 10);
            }

            await AutorModel.update(req.params.id, updateData);
            res.json({ message: 'Autor atualizado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete autor
    static async delete(req, res) {
        try {
            await AutorModel.delete(req.params.id);
            res.json({ message: 'Autor deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Login de autor
    static async login(req, res) {
        try {
            const { username, senha } = req.body;
            const autor = await AutorModel.getByUsername(username);
            if (!autor) return res.status(401).json({ message: 'Credenciais inválidas' });

            const isValid = await bcrypt.compare(senha, autor.senha);
            if (!isValid) return res.status(401).json({ message: 'Credenciais inválidas' });

            const token = jwt.sign({ id: autor.idLeitorAutor, role: 'author' }, env.JWT_SECRET, { expiresIn: '24h' });
            res.json({ token, autorId: autor.idLeitorAutor, nome: `${autor.primeiro_nome} ${autor.ultimo_nome}` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AutorController;