const Solicutudes= require('../models/solicitudes.model');
const Productos = require('../models/productos.model');
const Usuario = require('../models/usuario.model');
function solicitudes(req,res){

    var userid = req.user.sub;
    var solicitado = req.params.idSolicitado;
    var oferta = req.params.idferta;

    SolicutudesModel= new Solicutudes();

    SolicutudesModel.solicitud = solicitado;
    SolicutudesModel.oferta = oferta;
    SolicutudesModel.save((err,solicitudSaved)=>{
        if(err){
            return res.status(500).send({mensaje:'erroren la peticion 1'});
        }else if(solicitudSaved){
            Usuario.findByIdAndUpdate(userid,{$push:{Solicitudes: solicitudSaved._id }},(err,userUpdated)=>{
                if(err){
                    return res.status(500).send({mensaje:'error em peticion 2'});
                }else if(userUpdated){
                    return res.status(200).send({mensaje:'se agrego la solucitud correctamente',solicitudSaved})
                }else{
                    return res.status(500).send({mensaje:'erro al agregar la solicitud'})
                }
            })
        }else{
            return res.status(500).send({mensaje:'error al guardar la solicitud'})
        }
    })


}