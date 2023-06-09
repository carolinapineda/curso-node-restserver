const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');
const { crearCategoria, ObtenerCategorias, actualizarCategoria, obtenerCategoriaId } = require('../controller/categorias');
const { existeCategoria } = require('../helpers/db-validator');

const router = Router();

/*{{url}}/api/categorias
*/

// Obtener todas las categorias - publico
router.get('/',[
    ObtenerCategorias
], (req, res) => {
    res.json('get');
});

// Obtener una categoria por id - publico
router.get('/:id',[
    validarJWT,
    check('id').custom(existeCategoria),
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
], actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id', (req, res) => {
    res.json('delete');
});

module.exports = router;