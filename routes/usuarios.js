
const {Router} = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controller/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validator');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
 ] ,usuariosPut);

router.post('/', [
    /* isEmpty() significa que debe de estar vacio pero al momento de ponerle el not() quiere decir que no debe de estar vacio
    al ponerle el not se le estaria llevando la contraria al isEmpty*/
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({min:6}),
    check('correo').custom(emailExiste),
    // check('rol', 'No ers un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
] ,usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);





module.exports = router;
