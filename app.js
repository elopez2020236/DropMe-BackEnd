const express = require("express");
const cors = require("cors");
const app = express();


// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/productos
//app.use("/api", hotelesRoutes, userRoutes, habitacionesRoutes, eventosRoutes, reservacion, servicios, factura,carrito);


module.exports = app;
