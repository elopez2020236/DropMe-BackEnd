const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tratoC = Schema({

    Usuario1:{ type: Schema.Types.ObjectId, ref: 'Usuarios'},
    Producto1:[],

    Usuario2:{ type: Schema.Types.ObjectId, ref: 'Usuarios'}, 
    Producto2:[],
    estado:Boolean,
});

module.exports = mongoose.model("tratoC", tratoC);