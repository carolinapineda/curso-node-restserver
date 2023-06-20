const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');

const { login } = require('../controller/auth');
const { cargarArchivos } = require('../controller/cargas');


const router = Router();

router.post('/', cargarArchivos);

module.exports = router;