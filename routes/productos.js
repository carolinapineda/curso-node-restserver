const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearProducto } = require('../controller/productos');

const router = Router();


router.get('/',);

router.get('/:id',);

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    validarCampos
], crearProducto);

router.put('/:id',);

router.delete('/:id',);



module.exports = router;