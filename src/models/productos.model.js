const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PructosSchema = Schema({
  nombre: String,
  category: String,
  precio: String,
  fotos:[],
  factura:[{ type: Schema.Types.ObjectId, ref: 'Pructos'}]
});

module.exports = mongoose.model("Pructos", PructosSchema);
