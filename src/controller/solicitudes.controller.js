const Solicutudes= require('../models/solicitudes.model');
const Productos = require('../models/productos.model');
const Usuario = require('../models/usuario.model');
const tratoP = require('../models/trado(pendiente).model');
const tratoC= require('../models/trato(Confirmado).model');

function solicitudes(req,res){

    var userid = req.user.sub;
    var solicitado = req.params.idSolicitado;
    var oferta = req.params.idferta;

    Productos.findById(solicitado,(err,solidind)=>{
        if(err){
            return res.status(500).send({mensaje:'error en la peticion1'});

        }else if(solidind){
           
            Productos.findById(oferta,(err,oferfiend)=>{
                if(err){
                    return res.status(500).send({mensaje:'error en la peticion1'});
        
                }else if(oferfiend){
                    SolicutudesModel= new Solicutudes();

                    SolicutudesModel.solicitud = solidind;
                    SolicutudesModel.oferta = oferfiend;
                    SolicutudesModel.estado = false
                    
                    SolicutudesModel.save((err,solicitudSaved)=>{
                        if(err){
                            return res.status(500).send({mensaje:'erroren la peticion 1'});
                        }else if(solicitudSaved){
                           
                            Productos.findById(solicitado,(err,productoFinded)=>{
                                if(err){
                                    return res.status(500).send({mensaje:'erro en la peticion 2'})
                                }else if(productoFinded){
                                    let userPr = productoFinded.usuario
                                    Usuario.findByIdAndUpdate(userPr,{$push:{Solicitudes: solicitudSaved._id }},(err,userUpdated)=>{
                                        if(err){
                                            return res.status(500).send({mensaje:'error em peticion 2'});
                                        }else if(userUpdated){
                                            return res.status(200).send({mensaje:'se agrego la solucitud correctamente',solicitudSaved}),console.log(solicitudSaved._id)
                                        }else{
                                            return res.status(500).send({mensaje:'erro al agregar la solicitud'})
                                        }
                                    })
                                }else {
                                    return res.status(500).send({mensaje:'erro al obtener el producto'})
                                }
                            })
                        }else{
                            return res.status(500).send({mensaje:'error al guardar la solicitud'})
                        }
                    })

        
                }else {
                    return res.status(500).send({mensaje:'erro al obtener el solicitado'})
                }
            })

        }else {
            return res.status(500).send({mensaje:'erro al obtener el solicitado'})
        }
    })



}

function aceptarSolicitud(req,res){
    var idsoli = req.params.idSolicitud;

    Solicutudes.findByIdAndUpdate(idsoli, {esatdo:true},(err,soliUpdated)=>{
        if(err){
            return res.status(500).send({mensaje:'error en la peticion 1'});

        }else if(soliUpdated){
                let idProsoli= soliUpdated.solicitud;
                let idProOfer = soliUpdated.oferta;
                Productos.findById(idProsoli,(err,productoSoli)=>{
                    if(err){
                        return res.status(500).send({mensaje:'error en la peticion 2'});
                    }else if(productoSoli){

                        Productos.findById(idProOfer,(err,productoOfer)=>{
                            if(err){
                                return res.status(500).send({mensaje:'error en la peticion 3'})

                            }else if (productoOfer){
                                let userSoli= productoSoli.usuario;
                                let userOfer = productoOfer.usuario;

                                let tratoPModel = new tratoP();
                                tratoPModel.Usuario1 = userSoli;
                                tratoPModel.Producto1=productoSoli;
                                tratoPModel.Usuario2=userOfer;
                                tratoPModel.Producto2=productoOfer;
                                tratoPModel.save((err,tratpSaved)=>{
                                    if(err){
                                        return res.status(500).send({mensaje:'error en la peticion 4'});
                                    }else if(tratpSaved){
                                            Usuario.findByIdAndUpdate(userSoli,{$pull:{Solicitudes:soliUpdated._id}},(err,userFinal)=>{
                                                if(err){
                                                    return res.status(500).send({mensaje:'error en la peticion 5'})
                                                }else if(userFinal){
                                                    return res.status(200).send({mensaje:'se genero una nueva negocioacion',tratpSaved})
                                                }else{
                                                    return res.status(500).send({mensaje:'error al remover la solicitud'})
                                                }
                                            })
                                    }else{
                                        return res.status(500).send({mensaje:'error al guardar el trato p'})
                                    }
                                })

                                

                            }else{
                                return res.status(500).send({mensaje:'erro al obtener el producto ofertado'})
                            }
                        })
                    }else{
                        return res.status(500).send({mensaje:'error obtener el producto solicitado'})
                    }
                })
        }else {
            return res.status(500).send({mensaje:'erro al editar la solicitud'})
        }
    })
    


}

function CancelarSoli(req,res){
    idSoli= req.params.idSolicitud;
    idUser= req.user.sub
    Usuario.findByIdAndUpdate(idUser,{$pull:{Solicitudes:idSoli}},{new: true},(err, userUpdated)=>{
        if(err){
            return res.status(500).send({mesaje:'error en la peticion 1'})
        }else if(userUpdated){
            Solicutudes.findByIdAndDelete( idSoli, (err,soliDele)=>{
                if(err){
                    return res.status(500).send({mesaje:'error en la peticion 2'})
                }else if (soliDele){
                        return res.status(200).send({mensaje:'se rechazo la solicitud con exito',soliDele})
                }else{
                    return res.status(500).send({mensaje:'error al eliminar la solicitud'})
                }
            })

        }else{
            return res.status(500).send({mensaje:'error al remover la solicitud'})
        }
    })

}


function confirmarTrato(req,res){
        idtra = req.params.idTrato
        tratoP.findByIdAndUpdate(idtra,{estado:true},(err,tratoUP)=>{
            if(err){
                return res.status(500).send({mensaje:'error en la peticion 1'});

            }else if (tratoUP){
                 var modeltratoC = new tratoC();
                 modeltratoC.Usuario1=tratoUP.Usuario1;
                 modeltratoC.Producto1= tratoUP.Producto1;
                 modeltratoC.Usuario2 = tratoUP.Usuario2;
                 modeltratoC.Producto2= tratoUP.Producto2;
                 modeltratoC.save((err,tratocSaved)=>{
                    if(err){
                        return res.status(500).send({mensaje:'error en la peticion 2'})
                    }else if(tratocSaved){
                            tratoP.findByIdAndDelete(idtra,(err,traRemoved)=>{
                                if(err){
                                    return res.status(500).send({mensaje:'error en la peticion 3'});
                                }else if (traRemoved){
                                        return res.status(200).send({mensaje:'se realizo el trato con exito',tratocSaved})
                                }else{
                                    return res.status(500).send({mensaje:'error al eliminar el trato P'})
                                }
                            })                           
                    }else{
                        return res.status(500).send({mensaje:'error al guardar el tratro '})
                    }
                 })
            }else{
                return res.status(500).send({mensaje:'error al actualizar el trato'})
            }
        })
}

function ObternerSolicitudes(req,res){
    Solicutudes.find((err,solicitudes)=>{
        if(err){
            return res.status(500).send({mensaje:'error en la peticion'})
        }else if(solicitudes){
                return res.status(200).send({mensaje:'las solicitudes son',solicitudes})
        }else{
            return res.status(500).send({mensaje:'erro al obtener las solucitudes'})
        }
    })

}

function obtenerSolitudesLog(req,res){
    userid= req.user.sub;
    Usuario.findById(userid,(err,userfinded)=>{
        if(err){
            return res.status(500).send({mensaje:'error en la peticion 1'})
        }else if(userfinded){
            let solis = userfinded.Solicitudes
            console.log(solis);
            return res.status(200).send({mensaje:'solicitudes',solis})
        }else{
            return res.status(500).send({mensaje:'erro al obtener las solicitudes'})
        }
    }).populate('Solicitudes')
}

module.exports = {
    solicitudes,
    aceptarSolicitud,
    confirmarTrato,
    obtenerSolitudesLog,
    CancelarSoli,
    ObternerSolicitudes


}