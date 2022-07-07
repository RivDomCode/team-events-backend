const { response } = require('express');

const getEvents = (req, res=response) => {
    return res.status(201).json({
        ok:true,
        msg:"getting events"
    })
}

const createEvent = (req, res=response) => {
    //Verificar que tenemos el evento
    console.log(req.body)


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