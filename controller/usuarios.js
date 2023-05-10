const {response} = require('express');

const usuariosGet = (req, res = response) =>{

    const {q,nombre} = req.query;

    res.json({
        msg: 'post API - controlador',
        q,
        nombre
    })
};

const usuariosPut = (req, res = response) =>{

    const id = req.params.id;

    res.json({
        msg: 'put API - usuarios put',
        id
       
    })
};

const usuariosPost = (req, res = response) =>{

    const body = req.body;

    res.json({
        msg: 'post API - usuarios post',
        body
    })
};

const usuariosDelete = (req, res = response) =>{
    res.json({
        msg: 'delete API - usuarios delete'
    })
}

const usuariosPatch = (req, res = response) =>{
    res.json({
        msg: 'patch API - usuarios patch'
    })
};


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}