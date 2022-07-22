var Producto = require("../models/productos.model");
var Categoria = require("../models/categoria.model");

//Add Producto (Crear productos)
function AddProducto(req,res){
    var idCat = req.params.idCat;
    var parametros = req.body;
    var modelProductos = new Producto();

    if(parametros.nombre && parametros.precio && parametros.category){
        Categoria.findById(idCat,(err, categoriaEncontrada)=>{

            if(err) return res.status(500).send({mensaje:'Error en la petición (Producto):('});
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
            }
        })
    }else{
        return res.status(500).send({mensaje:'Ingrese los datos correctamente :('})
    }
}

function GetProducto(req,res){
    Producto.find({}).exec((err, productosEncontrados)=>{
        if(err){
            return res.status(500).send({message: "Error al encontrar los productos"});
        }else if(productosEncontrados){
            return res.send({message: "Productos: ", productosEncontrados});
        }else{
            return res.status(403).send({message: "No se encontraron productos"});
        }
    })
}

function ReProducto(req,res){
    var idCat = req.params.idCat;
    var idPr = req.params.idPr;
    Categoria.findOneAndUpdate({_id:idCat, productos: idPr},{$pull:{productos:idPr}},{idPr: true},(err,categoriaActualizada)=>{
     if(err) return res.status(500).send({message:'error en la peticion '})
       if(!categoriaActualizada){
           Producto.findByIdAndRemove(idPr, (err,productoEliminado)=>{
              if(err) return res.status(500).send({message:'erro al eliminar el producto'});
              if(!productoEliminado){
                   return res.status(500).send({message:'no se elimino el producto'})
              }else{
                  return res.status(200).send({productos: productoEliminado})
              }

           })

       }else{
           return res.status(500).send({message:'el producto no existe'})
       }
    })
} 

function UpProducto(req,res){
    var idCat = req.params.idCat;
    var idPr = req.params.idPr;
    var parametros = req.body;
    if(parametros){
        Producto.findById(idPr,(err,productosEncontrados)=>{
           if(err) return res.status(500).send({mensaje:'Error en la petición (Producto) :('})
           if(productosEncontrados){
             Categoria.findOne({_id: idCat,idPr: idPr},(err,categoriaEncontrada)=>{
                 if(err) return res.status(500).send({mensaje:'Error en la petición (Categoria) :('});
                 if(categoriaEncontrada){
                     Producto.findByIdAndUpdate(idPr, parametros,{new: true},(err,productoActualizado)=>{
                        if(err) return res.status(500).send({mensaje:''})
                        if(!productoActualizado){
                            return res.status(500).send({mensaje:'Error al actualizar producto :( '});
                        }else{
                            return res.status(200).send({producto:productoActualizado})
                        }
                     })
                 }

             })
           }else{
               return res.status(500).send({mensaje:'El producto no existe :('})
           }       
        })
    }else{
        return res.status(500).send({mensaje:'Ingrese los parametros obligatorios :/'});
    }
}

module.exports ={
    AddProducto,
    GetProducto,
    ReProducto,
    UpProducto
  }