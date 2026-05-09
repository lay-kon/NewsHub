const express = require('express');
const cors = require('cors');
const path = require('path');
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

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../frontend')));

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