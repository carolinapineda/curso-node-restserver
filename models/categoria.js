const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
        // required quiere decir que se necesita tener ese dato si no manda error
    },
    usuario: {
        // Tiene que ser otro objeto mandado a mongo
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }

});



module.exports = model('Categoria', CategoriaSchema);