const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
// const app = express();

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Lectura y parceo del body
        this.app.use(express.json());

        // rUTAS DE MI APLICACION
        this.routes();
    }

    async conectarDB() {
        await dbConnection();

    }

    middlewares() {

        this.app.use(cors());
        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
       
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}


module.exports = Server;