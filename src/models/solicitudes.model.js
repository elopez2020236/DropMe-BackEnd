const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const solicutudes = Schema({
   solicitud:{ type: Schema.Types.ObjectId, ref: 'Pructos'},
   oferta:{ type: Schema.Types.ObjectId, ref: 'Pructos'},
});

module.exports = mongoose.model("solicutudes", solicutudes);