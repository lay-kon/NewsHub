const express = require('express');
const router = express.Router();
const EstadoController = require('../controllers/estadoController');

router.get('/', EstadoController.getAll);
router.get('/:id', EstadoController.getById);

module.exports = router;
