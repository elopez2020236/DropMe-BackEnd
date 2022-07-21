//require('dotenv').config();


const mongoose = require('mongoose');
const app = require('./app');

const usuarioController = require('./src/controller/usuario.controller');
const productoController = require('./src/controller/producto.controller');
const categoriaController = require('./src/controller/categoria.controller');
const {RegistrarAd} = require('./src/controller/usuario.controller');
const {CategoriaDefault} = require('./src/controller/categoria.controller');
/*
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECT , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Se ha conectado correctamente a la base de datos.");

    usuarioController.RegistrarAd();

      const PORT = process.env.PORT || 3000
    app.listen(PORT, function () {
      console.log(
        'El servidor está levantado en el puerto '+ PORT 
      );
    });
  })
  .catch((error) => console.log(error));*/
  mongoose.Promise = global.Promise;                                                               
mongoose.connect('mongodb://localhost:27017/DROPME', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se encuentra conectado a la base de datos.");

    app.listen(3000, function () {
        console.log("Se esta corriendo en el puerto 3000")
    })

}).catch(error => console.log(error));

RegistrarAd();
CategoriaDefault();