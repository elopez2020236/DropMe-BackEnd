var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categoriaSchema = ({
    nombre: String,
    productos: [{type: Schema.ObjectId, ref: "Pructos"}]
})

module.exports = mongoose.model("Categoria", categoriaSchema);