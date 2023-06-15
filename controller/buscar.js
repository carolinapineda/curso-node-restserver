const { response } = require("express");
const { objectId } = require('mongoose');
const { Usuario, Categoria, Producto } = require("../models");

const coleccionespermitidadas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async( termino = '', res = response) => {

    const esMongoId = objectId.isValid( termino );

    if( esMongoId ){
        const usuario = await Usuario.findById(termino);
        res.json(usuario);
    }

   
}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if( !coleccionespermitidadas.includes( coleccion ) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionespermitidadas }`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios( termino, res );
        break;
        case 'categoria':

        break;
        case  'productos':

            
        break;
    
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
    }
}


module.exports = {
    buscar
}