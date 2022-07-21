const express = require('express');
const controladorProductos = require('../controller/producto.controller');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();
api.put("/addProducto/:idCat", controladorProductos.AddProducto)


module.exports = api;