const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidadas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async( termino = '', res = response) => {

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ){
        const usuario = await Usuario.findById(termino);
        return res.json({
            // Si es usuario existe(?) entonces retorname un arreglo con el asuario si no existe(:) retorname un arreglo vacio.
            results: (usuario) ? [usuario] : []
        });
    }

    // Expresiones regulares
    // La expresion es el termino y la 'i' quiere decir que sea insensible a las mayusculas y minusculas.
    const regex = new RegExp( termino, 'i' );

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });

   
}

const buscarCategoria = async( termino = '', res = response ) => {

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ){
        const categoria = await Categoria.findById( termino );
        res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    const regex = new RegExp( termino, 'i');

    const categorias = await Categoria.find({ nombre: regex, estado: true });

    res.json(categorias);
}

const buscarProductos = async( termino = '', res = response ) =>{

    const esMongoId = ObjectId.isValid(termino);

    if( esMongoId ){
        const producto = await Producto.findById(termino)
                                        .populate('categoria', 'nombre')
        res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp( termino, 'i');

    const productos = await Producto.find({ nombre: regex, estado: true })
                                    .populate('categoria', 'nombre')

    res.json(productos);
}


const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if( !coleccionesPermitidadas.includes( coleccion ) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidadas }`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios( termino, res );
        break;
        case 'categoria':
            buscarCategoria( termino, res )

        break;
        case 'productos':
            buscarProductos( termino, res )
            
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