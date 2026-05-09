const express = require('express');
const router = express.Router();
const AutorController = require('../controllers/autorController');

router.get('/', AutorController.getAll);
router.get('/:id', AutorController.getById);
router.post('/', AutorController.create);
router.put('/:id', AutorController.update);
router.delete('/:id', AutorController.delete);

module.exports = router;