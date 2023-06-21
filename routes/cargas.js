const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { cargarArchivos, actualizarImagen } = require('../controller/cargas');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivosSubir } = require('../middlewares');


const router = Router();

router.post('/', validarArchivosSubir, cargarArchivos);

router.put('/:coleccion/:id', [
    validarArchivosSubir,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen)

module.exports = router;