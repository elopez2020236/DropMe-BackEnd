const express = require('express');
const controladorProductos = require('../controller/producto.controller');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();
api.put("/addProducto/:idCat", controladorProductos.AddProducto);
api.get("/getProductos", controladorProductos.GetProducto);
api.put("/:idCat/removeProducto/:idPr", controladorProductos.ReProducto );
api.put("/:idCat/upProducto/:idPr", controladorProductos.UpProducto);

module.exports = api;