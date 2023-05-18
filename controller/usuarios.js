const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');



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

    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json(errors);
    // }

    const {nombre, correo, password , rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(400).json({
            msg: 'Ese correo ya esta registrado'
        })
    }

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