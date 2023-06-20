
const dbValidators = require('./db-validator');
const generarJWT = require('./generar-jwt');
const subirArchivo = require('./subir-archivo');


module.exports = {
    // los (...) significa esparciendo todo su contenido, exportando tambien las funciones o constantes que se tienen en cada uno de los archivos.
    ...dbValidators,
    ...generarJWT,
    ...subirArchivo
}