const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tratoP = Schema({

    Usuario1:{ type: Schema.Types.ObjectId, ref: 'Usuarios'},
    Producto1:{ type: Schema.Types.ObjectId, ref: 'Pructos'},

    Usuario2:{ type: Schema.Types.ObjectId, ref: 'Usuarios'}, 
    Producto2:{ type: Schema.Types.ObjectId, ref: 'Pructos'},
    estado:Boolean,
});

module.exports = mongoose.model("tratoP", tratoP);