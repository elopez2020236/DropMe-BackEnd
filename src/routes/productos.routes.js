const express = require('express');
const controladorProductos = require('../controller/producto.controller');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();
api.put("/addProducto", md_autenticacion.Auth,controladorProductos.AddProducto)
api.put("/editarProducto/:idProductos", controladorProductos.editarProducto)
api.delete("/eliminarProducto/:idProductos",md_autenticacion.Auth,controladorProductos.eliminarProudcto);
api.get("/obtenerProductos",controladorProductos.ObtenerProductosMain);
api.get('/obterxId/:idProducto',controladorProductos.obtenerxId)
api.get("/obtenerProductosLog", md_autenticacion.Auth , controladorProductos.ObtenerLog);

module.exports = api;