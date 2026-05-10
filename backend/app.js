const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const env = require('./config/env');

// Routes
const adminRoutes = require('./routes/adminRoutes');
const autorRoutes = require('./routes/autorRoutes');
const publicacaoRoutes = require('./routes/publicacaoRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const estadoRoutes = require('./routes/estadoRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for PDF uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/pdfs'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));
// Serve page files directly from frontend/pages so routes like /index.html work
app.use(express.static(path.join(__dirname, '../frontend/pages')));
// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/admins', adminRoutes);
app.use('/api/autores', autorRoutes);
app.use('/api/publicacoes', publicacaoRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/estados', estadoRoutes);

// Default route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/index.html'));
});

// Serve other pages
app.get(/\/(login|author-login|author-register|dashboard|author-dashboard|publicacoes|detalhes)\.html/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages', req.url));
});

module.exports = app;