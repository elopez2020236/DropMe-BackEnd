const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const solicutudes = Schema({
   solicitud:[],
   oferta:[],
   estado:Boolean,
});

module.exports = mongoose.model("solicutudes", solicutudes);