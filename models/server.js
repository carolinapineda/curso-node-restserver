const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
// const app = express();

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            cargas:      '/api/cargas',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios', 
        }

        // Conectar base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // rUTAS DE MI APLICACION
        this.routes();
    }

    async conectarDB() {
        await dbConnection();

    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use(express.static('public'));

        // Fileupload o Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes() {
       
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.cargas, require('../routes/cargas'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}


module.exports = Server;