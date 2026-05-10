const express = require('express');
const router = express.Router();
const path = require('path');
const PublicacaoController = require('../controllers/publicacaoController');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');

// Configure multer for PDF uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/pdfs');
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

router.get('/', PublicacaoController.getAll);
router.get('/:id', PublicacaoController.getById);
router.get('/estado/:estado', PublicacaoController.getByEstado);
router.post('/', authMiddleware, upload.single('arquivo_pdf'), PublicacaoController.create);
router.put('/:id', authMiddleware, PublicacaoController.update);
router.delete('/:id', authMiddleware, PublicacaoController.delete);
router.post('/:id/validate', authMiddleware, PublicacaoController.validate);router.get('/:id/pdf', PublicacaoController.generatePDF);
module.exports = router;