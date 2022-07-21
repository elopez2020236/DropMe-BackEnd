const Usuario = require('../models/usuario.model');
const jwt = require("../services/jwt");
const bcrypt = require("bcrypt-nodejs");


function RegistrarAd(req, res) {
    let usuarioModelo = new Usuario();
  
    usuarioModelo.nombre = "SuperAdmin";
    usuarioModelo.usuario = "SuperAdmin";
    usuarioModelo.email = "Superadmin";
    usuarioModelo.rol = "ADMIN";
    usuarioModelo.password = "12345";
  
    Usuario.find({
      $or: [{ usuario: usuarioModelo.usuario }],
    }).exec((err, buscarUsuario) => {
      if (err) return console.log("ERROR en la peticion");
  
      if (buscarUsuario && buscarUsuario.length >= 1) {
        console.log("Usuario Super Admin creado con anterioridad");
      } else {
        bcrypt.hash(usuarioModelo.password, null, null, (err, passCrypt) => {
          usuarioModelo.password = passCrypt;
        });
  
        usuarioModelo.save((err, usuarioGuardado) => {
          if (err) return console.log("ERROR al crear el usuario Admin");
  
          if (usuarioGuardado) {
            console.log("Usuario Super Admin Creado");
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
                  var carritoModel = new Carrito();
  
                  carritoModel.Usuario = usuarioGuardado._id;
                  carritoModel.Habitaciones= null;
                  carritoModel.Servicios = [];
                  carritoModel.subTotal = null;
                  carritoModel.save((err,carridoCreado)=>{
  
                    if(err) return res.status(500).send({ mensaje:'error en la petcion 2'});
                    else if (carridoCreado){
  
                      return res.status(200).send({mensaje:'se agreo el carrito y el usuario correctamente',usuarioGuardado})
  
                    }else{
                      return res.send({ mensaje:'error al crear carrito'})
                    }
  
                  })
  
  
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
                                    return res.send({message: 'Usuario actualizado', userUpdated});
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
                                return res.send({message: 'Usuario Actualozado', userUpdated});
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
        var userId = req.params.id;
    
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


function ObtenerUsuario(req, res) {
  Usuario.find({rol:'Usuario'}, (err, usuarioEncontrado) => {
    return res.status(200).send({ usuario: usuarioEncontrado });
  });
}

function ObtenerUsuarioId(req, res) {
    var idUsuario = req.params.idUsuario;
  
    Usuario.findById(idUsuario, (err, usuarioEncontrado) => {
  if(err){
    return res.status(500).send({ mensaje:'error en la peticion 1'})
  }else if(usuarioEncontrado){
    return res.status(200).send({usuario:usuarioEncontrado})
  }else{
    return res.status(500).send({ mensaje:'error al obtener el usuario'})
  }
    });
  }

  function ObterneruserLog(req,res){
    var user = req.user.sub;
     Usuario.findById(user,(err,usuarioEncontrado)=>{
      if(err){
        return res.status(500).send({ mensaje:'error en la peticion'})
      }else if (usuarioEncontrado){
            return res.status(200).send({usario:usuarioEncontrado})
      }else{
        return res.send({ mensaje: 'error al obtener '})
      }
     })
  }


  module.exports ={
    RegistrarAd,
    RegistrarUsuario,
    Login,
    EditarUsuario,
    eliminarUsuario,



  }



