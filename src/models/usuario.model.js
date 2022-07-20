const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
  nombre: String,
  apellido: String,
  email: String,
  usuario: String,
  password: String,
  rol: String,
  Productos:[{ type: Schema.Types.ObjectId, ref: 'FactPructosura'}]
});

module.exports = mongoose.model("Usuarios", UsuarioSchema);
