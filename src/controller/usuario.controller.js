const Usuario = require('../models/usuario.model');
const jwt = require("../services/jwt");
const bcrypt = require("bcrypt-nodejs");


function RegistrarAd() {
  var usuarioModel = new Usuario();

  Usuario.findOne({ nombre: "SuperAdmin" }, (err, SuperAdminFinded) => {
      if (err) {
          console.log(err);
      } else if (SuperAdminFinded) {
          console.log("Usuario SuperAdmin ya fue creado");
      } else {
          bcrypt.hash("123456", null, null, (err, passwordHashed) => {
              if (err) {
                  console.log("Error al encriptar contraseña de SuperAdmin");
              } else if (passwordHashed) {
                  usuarioModel.password = passwordHashed;
                  usuarioModel.nombre = "SuperAdmin";
             
                  usuarioModel.rol = "ROL_Admin";
                  usuarioModel.save((err, userSaved) => {
                      if (err) {
                          console.log("Error al crear usuario SuperAdmin");
                      } else if (userSaved) {
                          console.log("Usuario SuperAdmin creado exitosamente");
                      } else {
                          console.log("No se creó el usuario SuperAdmin");
                      }
                  });
              } else {
                  console.log("Contraseña de SuperAdmin no encriptada");
              }
          });
      }
  });
}

  function RegistrarUsuario(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();
  
    if (parametros.email && parametros.password) {
      usuarioModel.nombre = parametros.nombre;
      usuarioModel.email = parametros.email;
      usuarioModel.rol = "Usuario";
  
      Usuario.find({ email: parametros.email }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length == 0) {
          bcrypt.hash(
            parametros.password,
            null,
            null,
            (err, passwordEncriptada) => {
              usuarioModel.password = passwordEncriptada;
  
              usuarioModel.save((err, usuarioGuardado) => {
                if(err) return res.status(500).send({ mensaje:'error en la peticion 1'});
                else if(usuarioGuardado) {

                  return res.status(200).send({mensaje:'se agrego el usuario Correctamente',usuarioGuardado})
            }else{
                  return res.send({ mensaje: 'error al guardar el usuario' })
                }
             });
            }
          );
        } else {
          return res
            .status(500)
            .send({ mensaje: "Este correo, ya  se encuentra utilizado" });
        }
      });
    } else {
      return res
        .status(500)
        .send({ mensaje: "Envie los parametros obligatorios" });
    }
  }


  function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
      if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
      if (usuarioEncontrado) {
        bcrypt.compare(
          parametros.password,
          usuarioEncontrado.password,
          (err, verificacionPassword) => {
            if (verificacionPassword) {
              if (parametros.obtenerToken == "true") {
                return res
                  .status(200)
                  .send({ token: jwt.crearToken(usuarioEncontrado) });
              } else {
                usuarioEncontrado.password = undefined;
                return res.status(200).send({ usuario: usuarioEncontrado });
              }
            } else {
              return res
                .status(500)
                .send({ mensaje: "Las contraseña no coincide" });
            }
          }
        );
      } else {
        return res
          .status(500)
          .send({ mensaje: "Error, el correo no se encuentra registrado." });
      }
    });
  }

  function EditarUsuario(req, res){
    let userId = req.params.id;
    let update = req.body;

        Usuario.findById(userId, (err, userFind)=>{
            if(err){
                return res.status(500).send({ message: 'Error general'});
            }else if(userFind){
                Usuario.findOne({username: update.username},(err,userFinded)=>{
                    if(err){
                        return res.status(500).send({message: "Error al buscar nombre de usuario"});
                    }else if(userFinded){
                        if(userFinded.username == update.username){
                            Usuario.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
                                if(err){
                                    return res.status(500).send({message: 'Error general al actualizar'});
                                }else if(userUpdated){
                                    return res.send({message: 'Empresa actualizada', userUpdated});
                                }else{
                                    return res.send({message: 'No se pudo actualizar la empresa'});
                                }
                            })
                        }else{
                            return res.send({message: "Nombre de usuario ya en uso"});
                        }
                    }else{
                        Usuario.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
                            if(err){
                                return res.status(500).send({message: 'Error general al actualizar'});
                            }else if(userUpdated){
                                return res.send({message: 'Empresa actualizada', userUpdated});
                            }else{
                                return res.send({message: 'No se pudo actualizar la empresa'});
                            }
                        })
                    }
                })
            }else{
                return res.send({message: "Empresa inexistente"});
            }
        })
    }



    function eliminarUsuario(req,res){
        var userId = req.params.idPro;
    
        Usuario.findById(userId,(err,userFinded)=>{
            if(err){
                return res.status(500).send({message: "Error al buscar empresa"});
            }else if(userFinded){
                Usuario.findByIdAndRemove(userId,(err,userRemoved)=>{
                    if(err){
                        return res.status(500).send({message: "Error al eliminar empresa"});
                    }else if(userRemoved){
                        return res.send({message: "Empresa eliminada exitosamente",userRemoved});
                    }else{
                        return res.status(500).send({message: "No se eliminó la empresa"});
                    }
                })
            }else{
                return res.send({message: "Empresa inexistente o ya fue eliminada"});
            }
        })
    }

      function ObternerLog(req,res){
        user= req.user.sub;
        Usuario.findById(user,(err,userFinded)=>{
          if(err){
            return res.status(500).send({mensaje:'error en la peticion 1'});
          }else if(userFinded){
            return res.status(200).send({mensaje:'el usuario ',userFinded})
          }else{
            return res.status(500).send({mensaje:'error al obtener el usuario'})
          }
        })
      }

    function obtenerSolis(req,res){


      
    }


  module.exports ={
    RegistrarAd,
    RegistrarUsuario,
    Login,
    EditarUsuario,
    eliminarUsuario,
    ObternerLog,
  }



