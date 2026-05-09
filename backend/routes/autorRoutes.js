const express = require('express');
const router = express.Router();
const AutorController = require('../controllers/autorController');
const authMiddleware = require('../middlewares/authMiddleware');

// Login deve vir antes de rotas com :id
router.post('/login', AutorController.login);
router.post('/registro', AutorController.create);
router.get('/', AutorController.getAll);
router.get('/:id', AutorController.getById);
router.put('/:id', authMiddleware, AutorController.update);
router.delete('/:id', authMiddleware, AutorController.delete);

module.exports = router;