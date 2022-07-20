const express = require('express');
const controladorUsuario = require('../controller/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();

api.post('/registrarUsuario',controladorUsuario.RegistrarUsuario);
api.post('/login',controladorUsuario.Login);
api.put('/editarUsario/:id',controladorUsuario.EditarUsuario);
api.delete('/eliminarUsuario/:id',controladorUsuario.eliminarUsuario);

module.exports = api;