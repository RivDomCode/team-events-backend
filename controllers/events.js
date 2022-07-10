const { response } = require('express');
const Event = require("../models/Event")

const getEvents = async (req, res=response) => {

    const events = await Event.find()
                              .populate('user', 'name');


    return res.status(201).json({
        ok:true,
        events
    })
}

const createEvent = async (req, res=response) => {

    const event = new Event(req.body);

    try {
        event.user = req.uid   //el uid viene en la req, asi id al user del modelo

        const savedEvent = await event.save();

        res.json({
            ok:true,
            event: savedEvent
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok:false,
            msg: "talk to admin"
        })
    }

    return res.status(201).json({
        ok:true,
        msg:"event created"
    })
}

const updateEvent = async (req, res=response) => {

    const eventId = req.params.id;
    const uid = req.uid

    try {
        const event = await Event.findById(eventId);  //comprobar que el id existe en BD

        if(!event) {
               return res.status(404).json({
                ok:false,
                msg: "no event with this id"
            })
        }

        //validar si persona que creó el evento es la misma que lo va a actualizar
        //para esos extraemos el uid
        if( event.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg: "you do not have the privilege to edit this event"
            })
        }

        const newEvent = {
            ...req.body,
            user:uid
        };

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new:true});

        res.status(201).json({
            ok:true,
            event: updatedEvent
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok:false,
            msg: "talk to admin"
        })
    }

}

const deleteEvent = async (req, res=response) => {

    const eventId = req.params.id;
    const uid = req.uid

    try {
        const event = await Event.findById(eventId);  //comprobar que el id existe en BD

        if(!event) {
               return res.status(404).json({
                ok:false,
                msg: "no event with this id"
            })
        }

        //validar si persona que creó el evento es la misma que lo va a actualizar
        //para esos extraemos el uid
        if( event.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg: "you do not have the privilege to edit this event"
            })
        }


         await Event.findByIdAndDelete(eventId);

        res.status(201).json({
            ok:true,
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok:false,
            msg: "talk to admin"
        })
    }

}




module.exports={ getEvents, createEvent, updateEvent, deleteEvent }