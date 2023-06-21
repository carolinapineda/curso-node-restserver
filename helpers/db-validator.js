const Role = require('../models/role');
const {Usuario, Categoria, Producto }= require('../models');

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
        throw new Error(`El id ${id} no existe`)
    }
}

const existeProductoPorId = async(id) => {

    const existeProductoPorId = await Producto.findById(id);
    if( !existeProductoPorId ){
        throw new Error(`El id ${id} no existe`)
    }
}

// Validar colecciones permitidas
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if( !incluida ){
        throw new Error(`La coleccion ${coleccion} no es permitida - ${colecciones}`)
    }

    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
} 
