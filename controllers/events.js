const { response } = require('express');
const Event = require("../models/Event")

const getEvents = (req, res=response) => {
    return res.status(201).json({
        ok:true,
        msg:"getting events"
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
            ok:fale,
            msg: "talk to admin"
        })
    }

    return res.status(201).json({
        ok:true,
        msg:"event created"
    })
}

const updateEvent = (req, res=response) => {
    return res.status(201).json({
        ok:true,
        msg:"event updated"
    })
}

const deleteEvent = (req, res=response) => {
    return res.status(201).json({
        ok:true,
        msg:"event deleted"
    })
}




module.exports={ getEvents, createEvent, updateEvent, deleteEvent }