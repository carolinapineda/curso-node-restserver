const { response, request } = require('express');
const { Categoria } = require('../models');

// Obtener categoria - populate {}
const obtenerCategoriaId = async( req = request, res= response) => {

    const {id} = req.params;
    const categoria = await Categoria.findById(id)
                                    .populate('usuario', 'nombre')
                             
   res.json({
        categoria
   })

}


// ObtenerCategorias - paginado - (opcional)total de las categorias - objeto popolate(moongose)
const ObtenerCategorias = async( req = request, res= response) => {

    const {limite = 5, desde=0} = req.query;
    const query = {estado: true};

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
    });

}



// Crear Categorias
const crearCategoria = async(req, res = response) => {
    
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save(); 

    res.status(201).json(categoria);
}

// Actualizar categoria(nombre)
const actualizarCategoria = async(req = request, res = response) => {
    const {id} = req.params;
    const {estado, usuario, ...resto} = req.body

    resto.nombre = resto.nombre.toUpperCase()
    
    const categoria = await Categoria.findByIdAndUpdate(id, resto);

    res.json(categoria);
}

// Borrar categoria(cambiar el estado a false) - solicitar id

const borrarCategoria = async(req = request, res = respose) => {

    const {id} = req.params;
    
    // Se cambia el estado del usuario a false 
    const categoria = await Categoria.findByIdAndUpdate( id, {estado: false});

    res.json({
        categoria
    })
}


module.exports = {
    crearCategoria,
    ObtenerCategorias,
    obtenerCategoriaId,
    actualizarCategoria,
    borrarCategoria
}