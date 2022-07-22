const express = require('express');
const controladorCategorias = require('../controller/categoria.controller');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();
api.post("/AddCategoria", controladorCategorias.AddCategoria);
api.get("/getCategorias",  controladorCategorias.GetCategorias);
api.delete("/reCategoria/:idCat", controladorCategorias.RemoveCategoria);
api.put("/upCategoria/:idCat", controladorCategorias.UpCategoria);

module.exports = api;