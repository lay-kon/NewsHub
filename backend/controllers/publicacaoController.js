const PublicacaoModel = require('../models/publicacaoModel');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

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
            const { titulo, resumo, conteudo, imagem_destaque, idestado, idCategoria } = req.body;
            const idautor = req.user.id; // Get from authenticated user
            const arquivo_pdf = req.file ? `/uploads/pdfs/${req.file.filename}` : null;
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
            const { titulo, resumo, conteudo, imagem_destaque, idestado, idCategoria } = req.body;
            const arquivo_pdf = req.file ? `/uploads/pdfs/${req.file.filename}` : req.body.arquivo_pdf;
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

    // Generate PDF for publicacao
    static async generatePDF(req, res) {
        try {
            const publicacao = await PublicacaoModel.getById(req.params.id);
            if (!publicacao) return res.status(404).json({ message: 'Publicacao not found' });

            const doc = new PDFDocument();
            const filename = `publicacao-${req.params.id}.pdf`;
            const filepath = path.join(__dirname, '../../uploads/pdfs', filename);

            // Ensure directory exists
            if (!fs.existsSync(path.dirname(filepath))) {
                fs.mkdirSync(path.dirname(filepath), { recursive: true });
            }

            const stream = fs.createWriteStream(filepath);
            doc.pipe(stream);

            // Add watermark
            doc.fontSize(50).fillColor('lightgray').text('NewsHub', 100, 300, { angle: 45, opacity: 0.3 });

            // Reset color
            doc.fillColor('black');

            // Title
            doc.fontSize(24).text(publicacao.titulo, 50, 50);

            // Author
            doc.fontSize(12).text(`Por: ${publicacao.primeiro_nome} ${publicacao.ultimo_nome}`, 50, 100);

            // Date
            doc.text(`Publicado em: ${new Date(publicacao.data_publicacao).toLocaleDateString()}`, 50, 120);

            // Content
            doc.fontSize(14).text(publicacao.conteudo, 50, 150, { width: 500, align: 'justify' });

            doc.end();

            stream.on('finish', () => {
                res.download(filepath, filename);
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }