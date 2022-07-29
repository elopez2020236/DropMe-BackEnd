const express = require('express');
const controladorProductos = require('../controller/producto.controller');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();

api.post("/addProducto", md_autenticacion.Auth, controladorProductos.AddProducto)
api.put("/editarProducto/:idProductos", md_autenticacion.Auth, controladorProductos.editarProducto)
api.delete("/eliminarProducto/:idProductos", md_autenticacion.Auth, controladorProductos.eliminarProudcto);
api.get("/obtenerProductos", controladorProductos.ObtenerProductosMain);
api.get("/obtenerProductosLog", md_autenticacion.Auth, controladorProductos.ObtenerLog);

api.get("/producto/:idProducto", controladorProductos.ObtenerProductoId);


module.exports = api;