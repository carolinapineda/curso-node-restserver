const { response } = require('express');
const { Categoria } = require('../models');

// ObtenerCategorias - paginado - (opcional)total de las categorias - objeto popolate(moongose)

// Obtener categoria - populate {}




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

// Borrar categoria(cambiar el estado a false) - solicitar id



module.exports = {
    crearCategoria
}