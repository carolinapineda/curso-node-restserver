const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');

const { crearCategoria, 
        ObtenerCategorias, 
        actualizarCategoria, 
        obtenerCategoriaId, 
        borrarCategoria } = require('../controller/categorias');

const { existeCategoriaPorId } = require('../helpers/db-validator');

const router = Router();

/*{{url}}/api/categorias
*/

// Obtener todas las categorias - publico
router.get('/',[
    validarCampos
], ObtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoriaId);

// Crear categoria - privado - cualquier persona con un  token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], crearCategoria);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id').custom(existeCategoriaPorId)
], actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria);

module.exports = router;