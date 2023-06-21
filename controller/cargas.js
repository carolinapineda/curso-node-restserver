const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");


const cargarArchivos = async(req, res = response) => {

    try {

        // Imagenes- const nombre = await subirArchivo( req.files);
        // Subir textos txt y md en una carpeta - const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos');
        
        // Subir las imagnes a un acarpeta
        const nombre = await subirArchivo( req.files, undefined, 'imgs');

        res.json({nombre});

    } catch (msg) {
        res.status(400).json({ msg });
    } 
}


const actualizarImagen = async(req, res = response) => {

    const{ id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ){
                return res.status(400).json({ 
                    msg: `No existe un usuario con el id ${id}`
                });
            }    

            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ){
                return res.status(400).json({ 
                    msg: `No existe un producto con el id ${id}`
                });
            }
            
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'})
    }


    // Limpiar imagenes previas
    if( modelo.img ){
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if( fs.existsSync( pathImagen) ){
            fs.unlinkSync(pathImagen);
        }
    }

    // Guardar imagenes en la base de datos
    const nombre = await subirArchivo( req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo); 
}

module.exports = {
    cargarArchivos,
    actualizarImagen
}