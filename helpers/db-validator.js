const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') =>{
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

// Verificar si el correo existe
const emailExiste = async (correo = '')=>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        // return res.status(400).json({
        //     msg: 'Ese correo ya esta registrado'
        // })
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}


module.exports = {
    esRoleValido,
    emailExiste
}
