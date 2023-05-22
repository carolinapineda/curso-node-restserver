const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExiste } = require('../helpers/db-validator');




const usuariosGet = (req, res = response) =>{

    const {q,nombre} = req.query;

    res.json({
        msg: 'post API - controlador',
        q,
        nombre
    })
};

const usuariosPut = (req, res = response) =>{

    const id = req.params.id;

    res.json({
        msg: 'put API - usuarios put',
        id
       
    })
};

const  usuariosPost = async(req, res = response) =>{

    const {nombre, correo, password , rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en db
    await usuario.save();

    res.json({
        usuario
    })
};

const usuariosDelete = (req, res = response) =>{
    res.json({
        msg: 'delete API - usuarios delete'
    })
}

const usuariosPatch = (req, res = response) =>{
    res.json({
        msg: 'patch API - usuarios patch'
    })
};


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}