const Categoria = require('../models/categoria.model');

function AddCategoria(req,res){
    var parametros = req.body;
    const Categoriamodel = new Categoria();
    if(parametros.nombre){
        console.log(parametros)
        Categoria.findOne({nombre: parametros.nombre},(err, categoriaEncontrada)=>{
            if(err){
                return res.status(500).send({mensaje: "Error"});
            }else if(categoriaEncontrada){
                return res.send({mensaje: "Ya existe la Categoria, intente otra vez :("});
            }else{
                Categoriamodel.nombre = parametros.nombre;
                Categoriamodel.save((err, categoriaGuardada)=>{
                    if(err){
                        return res.status(500).send(
                            {mensaje: "Error al Agregar Categoria, intente nuevamente"}
                            );
                    }else if(categoriaGuardada){
                        return res.send(
                            {categoria: categoriaGuardada}
                            );
                    }else{
                        return res.status(404).send({mensaje: "No se puedo almacenar la Categoría"});
                    }
                })
            }
        })
    }else{
        return res.status(403).send({mensaje: "No ingresó los campos de la Categoría"});
    }
}

function CategoriaDefault(){
    var nombre = "Predeterminada"
    const modeloCategoria = new Categoria();
    Categoria.findOne({nombre: nombre},(err, categoriaEncontrada)=>{
        if(categoriaEncontrada < 1){
        if(err){
            console.log("Error al encontrar la categoria por defecto",err);
        }else if(categoriaEncontrada){
            console.log(":)");
        }else{
            modeloCategoria.nombre = "Predeterminada";
            modeloCategoria.save((err, categoriaGuardada)=>{
                if(err){
                    console.log("Error al agregar categoría :(");
                }else if(categoriaGuardada){
                    console.log("Categoría default creada :)");
                }
            })
        }
    } else{
        return console.log(":) Categoria Def")
    }
    })

}


function GetCategorias(req,res){
    Categoria.find({}).populate("productos").exec((err, TdoCategorias)=>{
        if(err){
            console.log(TdoCategorias)
            return res.status(500).send({message: "Error al obtener los datos"});
        }else if(TdoCategorias){
            return res.send({message: " Todas las categorias:", TdoCategorias});
        }else{
            return res.status(403).send({message: "No hay datos"});
        }
    })
}

module.exports = {
    AddCategoria,
    CategoriaDefault,
    GetCategorias
  }