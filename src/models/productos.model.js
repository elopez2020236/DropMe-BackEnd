const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PructosSchema = Schema({
  nombre: String,
  category: String,
  precio: String,
  fotos:[],
  factura:[{ type: Schema.Types.ObjectId, ref: 'Pructos'}],
  usuario:{ type: Schema.Types.ObjectId, ref: 'Usuarios'},
});

module.exports = mongoose.model("Pructos", PructosSchema);
