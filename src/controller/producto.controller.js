var Producto = require("../models/productos.model");
var Categoria = require("../models/categoria.model");
var Usuario = require("../models/usuario.model")

//Add Producto (Crear productos)
function AddProducto(req, res) {

    var parametros = req.body;
    var modelProductos = new Producto();
    var categoria = parametros.categoria;
    var user = req.user.sub

    if (parametros.nombre && parametros.precio && parametros.categoria) {
        Categoria.findOne({ nombre: parametros.categoria }, (err, categoriaEncontrada) => {




            if (err) {
                return res.status(500).send({ mensaje: 'Error en la petición 1' })
            } else if (categoriaEncontrada) {
                modelProductos.nombre = parametros.nombre;
                modelProductos.precio = parametros.precio;
                modelProductos.categoria = categoria;
                modelProductos.fotos = [];
                modelProductos.factura = [];
                modelProductos.usuario = user
                modelProductos.save((err, productoSaved) => {
                    if (err) {
                        return res.status(500).send({ mensaje: 'Error en la peticion 1' })
                    } else if (productoSaved) {
                        Usuario.findByIdAndUpdate(user, { $push: { Productos: productoSaved._id } }, (err, productoupdetes) => {
                            if (err) {
                                return res.status(500).send({ mensaje: 'Error en la peticion 2' });
                            } else if (productoupdetes) {
                                Categoria.findByIdAndUpdate(categoriaEncontrada._id, { $push: { productos: productoSaved._id } }, (err, categoriaUpdated) => {
                                    if (err) {
                                        return res.status(500).send({ mensaje: 'Error en la petición 3' });
                                    } else if (categoriaUpdated) {
                                        let id = productoSaved._id
                                        Usuario.findByIdAndUpdate(user, { $push: { Producto: productoSaved._id } }, (err, userUpdates) => {
                                            if (err) {
                                                return res.status(500).send({ mensaje: 'Error en la peticion 4' });
                                            } else if (userUpdates) {
                                                return res.status(500).send({ mensaje: 'El producto se agregó correctamente', productoSaved })
                                            } else {
                                                return res.status(500).send({ mensaje: 'Error al agregar el producto a el usuario' })
                                            }
                                        })
                                    } else {
                                        return res.status(500).send({ mensaje: 'Error al agregar el producto en la categoria' });
                                    }
                                })
                            } else {
                                return res.status(500).send({ mensaje: 'Error al agregar el producto al usuario' })
                            }
                        })
                    } else {
                        return res.status(500).send({ mensaje: 'Error al crear el producto' })
                    }
                })



            } else {
                return res.status(500).send({ mensaje: 'Error al encontrar la categoria' })
            }
            /*if(err) return res.status(500).send({mensaje:'Error en la petición (Producto):('});
            if(categoriaEncontrada){
                Producto.findOne({nombre: parametros.nombre},(err, productoEncontrado)=>{
                    if(err) return res.status(500).send({mensaje:'Error en la petición (Producto) :('});
                    if(productoEncontrado){
                        return res.status(500).send({mensaje:'El producto está registrado :('})
                    }else{
                        modelProductos.nombre= parametros.nombre;
                        modelProductos.precio = parametros.precio;
                        modelProductos.category = parametros.category;
                        modelProductos.fotos = [];
                        modelProductos.factura = [];
                        modelProductos.save((err,productoSaved)=>{
                        if(err) return res.status(500).send({mensaje:'Error en la creación del Producto :('});
                        if(productoSaved){
                            Categoria.findByIdAndUpdate(idCat, { $push: {productos: productoSaved._id }},{new: true},(err,categoriaUpdated)=>{
                              if(err) return res.status(500).send({mensaje:'Error en la petición :('});
                              if(!productoSaved)return res.status(500).send({mensaje:'Error al agregar en Categoría :('});
                              console.log(categoriaUpdated);
                              return res.status(200).send({producto: categoriaUpdated});
                            })
                        }
                        
                        })
                    }
                })                 
            }*/
        })
    } else {
        return res.status(500).send({ mensaje: 'Ingrese los datos correctamente :(' })
    }
}



function editarProducto(req, res) {
    var idProducto = req.params.idProductos;
    var parametros = req.body;
    Producto.findByIdAndUpdate(idProducto, parametros, { new: true }, (err, productoUpdates) => {
        if (err) {
            return res.status(500).send({ mensaje: 'error en la peticion 1' })
        } else if (productoUpdates) {
            return res.status(200).send({ mensaje: 'Se edito el producto con exito ', productoUpdates })
        } else {
            return res.status(500).send({ mensaje: 'error al editar el producto' })
        }
    })
}

function eliminarProudcto(req, res) {
    var idProducto = req.params.idProductos;
    Producto.findByIdAndDelete(idProducto, (err, producRemoved) => {
        if (err) {
            return res.status(500).send({ mensaje: 'error en la peticion 1' });

        } else if (producRemoved) {
            Usuario.findByIdAndUpdate(req.user.sub, { $pull: { Productos: { idProductos: idProducto } } }, (err, userUpdated) => {
                if (err) {
                    return res.status(500).send({ mensaje: 'error en la peticion 2' });
                } else if (userUpdated) {
                    return res.status(200).send({ mensaje: 'se removio el producto con exito', producRemoved })
                } else {
                    return res.status(500).send({ mensaje: 'erro al remover el producto del usuario' })
                }

            })

        } else {
            return res.status(500).send({ mensaje: 'erro al eliminar el producto' })
        }
    })
}



function ObtenerProductosMain(req, res) {


    Producto.find((err, productos) => {
        if (err) {
            return res.status(200).send({ mensaje: 'erro en la peticion' })
        } else if (productos) {
            return res.status(200).send({ mensaje: 'Productos', productos })
        } else {
            return res.status(200).send({ mensaje: 'error al obtener los productos' })
        }
    })

}

//Obtener un producto en específico
function ObtenerProductoId(req, res) {
    const idPro = req.params.idProducto;

    Productos.findById(idPro, (err, productoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!productoEncontrado) return res.status(500).send({ mensaje: 'Error al obtener el producto' });

        return res.status(200).send({ mensaje: productoEncontrado })
    })
}

function ObtenerLog(req, res) {
    var user = req.user.sub;

    Usuario.findById(user, (err, userfinded) => {
        if (err) {
            return res.status(500).send({ mensaje: 'error en la peticion 1' })
        } else if (userfinded) {
            let productos = userfinded.Productos;
            console.log(productos);
            return res.status(200).send({ productos: productos })
        } else {
            return res.status(500).send({ mensaje: 'error al obtener los productos' })
        }
    }).populate('Productos')

}


function obtenerxId(req, res) {
    var id = req.paramas.idProducto
    Producto.findById(id, (err, producFined) => {
        if (err) {
            return res.status(500).send({ mensaje: 'erro en la petiocn 1' });
        } else if (producFined) {
            return res.status(200).send({ mensaje: 'producto', producFined })
        } else {
            return res.status(500).send({ mensaje: 'error al obtener el producto' })
        }
    })
}

module.exports = {
    AddProducto,
    editarProducto,
    eliminarProudcto,
    ObtenerProductosMain,
    ObtenerLog,
    ObtenerProductoId
}