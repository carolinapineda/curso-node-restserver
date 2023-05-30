const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { Promise } = require('mongoose');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { emailExiste } = require('../helpers/db-validator');




const usuariosGet = async(req, res = response) =>{

    // const {q,nombre} = req.query;

    const {limite = 5, desde=0} = req.query;
    const query = {estado: true};
    const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

const total = await Usuario.countDocuments(query);

const resp = Promise.all([
    Usuario.count()
])

    res.json({
        total,
        usuarios
    })
};

const usuariosPut = async(req, res = response) =>{

    const {id} = req.params;
    const { password, google, correo, ...resto } = req.body;

    // Validar contra base de datos
    if( password ){
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
      
};

const  usuariosPost = async(req, res = response) =>{

    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json(errors);
    // }

    

    const {nombre, correo, password , rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
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