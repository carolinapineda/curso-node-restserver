const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');

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


const existeUsuarioPorId = async (id)=>{
    
    const existeUsuarioPorId = await Usuario.findById(id);
    if(!existeUsuarioPorId){
        throw new Error(`El id no existe ${id}`)
    }
}

const existeCategoriaPorId = async (id) => {

    const existeCategoriaPorId = await Categoria.findById(id);
    if(!existeCategoriaPorId){
        throw new Error(`La categoria ${id} no existe`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId
} 
