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
            const updateData = {
                primeiro_nome,
                ultimo_nome,
                email,
                username,
                pin
            };

            if (senha) {
                updateData.senha = await bcrypt.hash(senha, 10);
            }

            await AdminModel.update(req.params.id, updateData);
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
            const { username, senha, pin, adminId } = req.body;
            let admin = null;

            if (username) {
                admin = await AdminModel.getByUsername(username);
            } else if (adminId) {
                admin = await AdminModel.getById(adminId);
            }

            if (!admin) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            if (senha) {
                const isValid = await bcrypt.compare(senha, admin.senha);
                if (!isValid) return res.status(401).json({ message: 'Credenciais inválidas' });

                if (!pin) {
                    return res.json({ pinRequired: true, idAdm: admin.idAdm });
                }
            }

            if (!pin || !adminId) {
                return res.status(400).json({ message: 'PIN e ID necessários' });
            }

            if (admin.idAdm !== adminId || admin.pin !== pin) {
                return res.status(401).json({ message: 'PIN inválido' });
            }

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