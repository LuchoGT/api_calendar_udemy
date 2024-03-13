const {response}  = require('express');
const Evento = require('../models/Evento');

const getEventos =async(req,res=response)=>{


    const eventos = await Evento.find()
    .populate('user','name');
  
    res.status(200).json({
        ok:true,
        eventos
    })
}

const crearEventos=async (req,res=response)=>{


    const evento = new Evento(req.body);

    try {

        //se necesita el id del usuario de acuerdo al schema
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok:true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el admin',
          
        })
    }
   
}

const actualizarEventos=async(req,res=response)=>{

    const eventoId = req.params.id;

    const uid = req.uid;
    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe'
            });
        }

        if (evento.user.toString() !==uid) {
            return res.status(401).json({
                ok:false,
                msg:'No tiene permiso de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user:uid,
        }
        
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento, {new:true});

        res.json({
            ok:true,
            evento:eventoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Hable con el admin"
          
        })
    }
   
}

const eliminarEventos=async(req,res=response)=>{
    const eventoId = req.params.id;

    const uid = req.uid;
    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe'
            });
        }

        if (evento.user.toString() !==uid) {
            return res.status(401).json({
                ok:false,
                msg:'No tiene permiso de eliminar este evento'
            })
        }

       
        
        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok:true,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Hable con el admin"
          
        })
    }
   
}

module.exports={
getEventos,
crearEventos,
actualizarEventos,
eliminarEventos
}
