const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, AdminController.getAll);
router.get('/:id', authMiddleware, AdminController.getById);
router.post('/', AdminController.create);
router.put('/:id', authMiddleware, AdminController.update);
router.delete('/:id', authMiddleware, AdminController.delete);
router.post('/login', AdminController.login);

module.exports = router;