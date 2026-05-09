const express = require('express');
const router = express.Router();
const ComentarioController = require('../controllers/comentarioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, ComentarioController.getAll);
router.get('/:id', authMiddleware, ComentarioController.getById);
router.get('/publicacao/:idPublicacao', ComentarioController.getByPublicacao);
router.post('/', ComentarioController.create);
router.put('/:id', authMiddleware, ComentarioController.update);
router.delete('/:id', authMiddleware, ComentarioController.delete);
router.post('/:id/approve', authMiddleware, ComentarioController.approve);
router.post('/:id/reject', authMiddleware, ComentarioController.reject);

module.exports = router;