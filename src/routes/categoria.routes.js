const express = require('express');
const controladorCategorias = require('../controller/categoria.controller');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();
api.post("/AddCategoria", md_autenticacion.Auth,controladorCategorias.AddCategoria);
api.get("/GetCategorias", controladorCategorias.GetCategorias)

module.exports = api;