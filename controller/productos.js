const { response, request } = require('express');
const { Producto } = require("../models/producto");



// Obtener Productos 
const obtenerProductos = async(req, res = respose) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado:true };

    const [total, productos] = await Promise.all([
        Producto.countDocument(query),
        Producto.find(query)
                .skip(Number(desde))
                .limit(Number(limite))

    ]);

    res.json({
        productos,
        total
    })
};


// Crear Producto
const crearProducto = async(req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre});

    if( productoDB ){
        return res.status(400).json({
            msg: `El producto ${ productoDB } ya existe `
        })
    }

    // Generar la data a guardar 
    const data = {
        nombre, 
        usuario: req.usuario._id,
    }

    const producto = new Producto(data);

    // Guardar DB
    await producto.save();

    res.status(201).json(producto);
};




module.exports = {
    obtenerProductos,
    crearProducto
}