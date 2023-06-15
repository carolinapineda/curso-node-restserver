const { response, request } = require('express');
const { Producto } = require("../models");
const { Categoria } = require("../models");


// Obtener productos por id 
const obtenerProductosId = async(req, res = response) => {

    const {id} = req.params;

    const producto = await Producto.findById(id)
                                   .populate('usuario', 'nombre')

    res.json(producto);
};


// Obtener Productos 
const obtenerProductos = async(req, res = respose) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado:true };

    const [ total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('usuario', 'nombre')

    ]);

    // const { nombre } = req.body.categoria;
    // const categoria = await Categoria.nombre.findOne({nombre:nombre})


    res.json({
        total,
        productos
        
    })
};


// Crear Producto
const crearProducto = async(req = request, res = response) => {

    const { estado, usuario, ...total } = req.body;

    const productoDB = await Producto.findOne({nombre: total.nombre});

    if( productoDB ){
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre } ya existe `
        })
    }

    // Generar la data a guardar 
    const data = {
        ...total,
        nombre: total.nombre.toUpperCase(),
        usuario: req.usuario._id,
    }

    const producto = new Producto(data);

    // Guardar DB
    await producto.save();

    res.status(201).json(producto);
};


// Actualizar Producto
const actualizarProducto = async(req, res = response) => {

    const {id} = req.params;
    const { estado, usuario, ...resto} = req.body;

    resto.nombre = resto.nombre.toUpperCase();

    const producto = await Producto.findByIdAndUpdate(id, resto, {new:true});

    res.json(producto);
    
};


// Borrar productos 
const borrarProductos = async(req, res = respose) => {

    const {id} = req.params;

    const producto = await Producto.findByIdAndUpdate(id, {estado:false});

    res.json(producto);
}




module.exports = {
    obtenerProductosId,
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    borrarProductos
}