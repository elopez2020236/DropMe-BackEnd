const express = require('express');
const controladorSolicitud = require('../controller/solicitudes.controller');
const md_autenticacion = require('../middlewares/autenticacion');


const api = express.Router();
api.post('/generarSolicitud/:idSolicitado/:idferta',md_autenticacion.Auth,controladorSolicitud.solicitudes);
api.put('/aceptarSoli/:idSolicitud',md_autenticacion.Auth,controladorSolicitud.aceptarSolicitud);
api.put ('/aceptarTratos/:idTrato',md_autenticacion.Auth,controladorSolicitud.confirmarTrato);
api.get('/obtenerSolisLog',md_autenticacion.Auth,controladorSolicitud.obtenerSolitudesLog);
api.put('/rechazarSolicitud/:idSolicitud',md_autenticacion.Auth,controladorSolicitud.CancelarSoli)
module.exports = api;