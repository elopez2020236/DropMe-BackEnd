var Producto = require("../models/productos.model");
var Categoria = require("../models/categoria.model");
var Usuario= require("../controller/usuario.controller")

//Add Producto (Crear productos)
function AddProducto(req,res){
    var categoria = parametros.categoria;
    var parametros = req.body;
    var modelProductos = new Producto();
    var user = req.user.sub

    if(parametros.nombre && parametros.precio && parametros.category){
        Categoria.findOne({nombre: categoria },(err, categoriaEncontrada)=>{


            
            
            if(err){
                return res.status(500).send({mensaje:'erro en la petición 1'})
            }else if(categoriaEncontrada){
                    modelProductos.nombre= parametros.nombre;
                    modelProductos.precio = parametros.precio;
                    modelProductos.category = categoria;
                    modelProductos.fotos = [];
                    modelProductos.factura = [];
                    modelProductos.save((err,productoSaved)=>{
                        if(err){
                            return res.status(500).send({mensaje:'error en la peticion'})
                        }else if(productoSaved){
                                Usuario.findByIdAndUpdate(user,{$push:{Productos:productoSaved},(err,pruducto)})
                        }else{
                            return res.status(500).send({mensaje:'error al crear el producto'})
                        }
                    })



            }else{
                return res.status(500).send({mensaje:'error al encontrar la categoria'})            
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
    }else{
        return res.status(500).send({mensaje:'Ingrese los datos correctamente :('})
    }
}
module.exports ={
    AddProducto
  }