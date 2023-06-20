const path = require('path');
const { v4: uuidv4 } = require('uuid');


const subirArchivo = ( files, extensionesValidas = ['png','jpg','gif'], carpeta = '') => {

    return new Promise(( resolve, reject ) => {

        const { archivo } = files;

        // Sacar las extensiones
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length -1 ]

        // Validad la extension
        if( !extensionesValidas.includes( extension )){
            return reject(`La extension ${ extension } no es permitida, ${extensionesValidas}`)
        }

        // Cambiarle el nombre de nuestros uploads a un uuid
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( nombreTemp );
        });
    });
    
    
}


module.exports = {
    subirArchivo
}