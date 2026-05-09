const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/categoriaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', CategoriaController.getAll);
router.get('/:id', CategoriaController.getById);
router.post('/', authMiddleware, CategoriaController.create);
router.delete('/:id', authMiddleware, CategoriaController.delete);

module.exports = router;
