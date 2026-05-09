const EstadoModel = require('../models/estadoModel');

class EstadoController {
    static async getAll(req, res) {
        try {
            const estados = await EstadoModel.getAll();
            res.json(estados);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const estado = await EstadoModel.getById(req.params.id);
            if (!estado) return res.status(404).json({ message: 'Estado não encontrado' });
            res.json(estado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = EstadoController;
