const express = require('express');
const router = express.Router();
const PublicacaoController = require('../controllers/publicacaoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', PublicacaoController.getAll);
router.get('/:id', PublicacaoController.getById);
router.get('/estado/:estado', PublicacaoController.getByEstado);
router.post('/', authMiddleware, PublicacaoController.create);
router.put('/:id', authMiddleware, PublicacaoController.update);
router.delete('/:id', authMiddleware, PublicacaoController.delete);
router.post('/:id/validate', authMiddleware, PublicacaoController.validate);

module.exports = router;