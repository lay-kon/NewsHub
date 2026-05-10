const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Login deve vir antes de rotas com :id
router.post('/login', AdminController.login);
router.post('/logout', (req, res) => res.json({ message: 'Logged out' }));
router.get('/', authMiddleware, AdminController.getAll);
router.get('/:id', authMiddleware, AdminController.getById);
router.post('/', AdminController.create);
router.put('/:id', authMiddleware, AdminController.update);
router.delete('/:id', authMiddleware, AdminController.delete);

module.exports = router;