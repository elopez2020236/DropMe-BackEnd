const express = require("express");
const cors = require("cors");
const app = express();



const Usuario = require('./src/routes/usuario.routes');

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/productos
//app.use("/api", hotelesRoutes, userRoutes, habitacionesRoutes, eventosRoutes, reservacion, servicios, factura,carrito);

app.use("/api",Usuario)


module.exports = app;
