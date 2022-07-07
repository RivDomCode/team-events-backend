// Rutas de Eventoss /
// host + /api/events

const { Router } = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const router = Router();
const { validateJWT } = require('../middlewares/validate-jwt');

//Todas tienen que pasar la validación del JWT
router.use( validateJWT);

//Obtener todos los eventos
router.get('/', getEvents );

//Crear un event
router.post("/", createEvent )

// Actualizar un evento
router.post("/:id",updateEvent)

//Borrar un evento
router.delete("/:id",deleteEvent)








module.exports = router;