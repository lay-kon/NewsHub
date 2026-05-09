const AdminModel = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

class AdminController {
    // Get all admins
    static async getAll(req, res) {
        try {
            const admins = await AdminModel.getAll();
            res.json(admins);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get admin by ID
    static async getById(req, res) {
        try {
            const admin = await AdminModel.getById(req.params.id);
            if (!admin) return res.status(404).json({ message: 'Admin not found' });
            res.json(admin);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Create admin
    static async create(req, res) {
        try {
            const { primeiro_nome, ultimo_nome, email, username, senha, pin } = req.body;
            const hashedPassword = await bcrypt.hash(senha, 10);
            const id = await AdminModel.create({
                primeiro_nome,
                ultimo_nome,
                email,
                username,
                senha: hashedPassword,
                pin
            });
            res.status(201).json({ id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update admin
    static async update(req, res) {
        try {
            const { primeiro_nome, ultimo_nome, email, username, senha, pin } = req.body;
            const hashedPassword = senha ? await bcrypt.hash(senha, 10) : undefined;
            await AdminModel.update(req.params.id, {
                primeiro_nome,
                ultimo_nome,
                email,
                username,
                senha: hashedPassword || req.body.senha,
                pin
            });
            res.json({ message: 'Admin updated' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete admin
    static async delete(req, res) {
        try {
            await AdminModel.delete(req.params.id);
            res.json({ message: 'Admin deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Login
    static async login(req, res) {
        try {
            const { username, senha } = req.body;
            const admin = await AdminModel.getByUsername(username);
            if (!admin) return res.status(401).json({ message: 'Credenciais inválidas' });

            const isValid = await bcrypt.compare(senha, admin.senha);
            if (!isValid) return res.status(401).json({ message: 'Credenciais inválidas' });

            const token = jwt.sign({ id: admin.idAdm, role: 'admin' }, env.JWT_SECRET, { expiresIn: '24h' });
            res.json({ 
                token,
                id: admin.idAdm,
                username: admin.username,
                nome: `${admin.primeiro_nome} ${admin.ultimo_nome}`,
                email: admin.email
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AdminController;