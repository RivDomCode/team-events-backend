// Rutas de Eventoss /
// host + /api/events

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const router = Router();
const { validateJWT } = require('../middlewares/validate-jwt');
const { isDate } = require("../helpers/isDate");


//Todas tienen que pasar la validación del JWT
router.use( validateJWT);

//Obtener todos los eventos
router.get('/', getEvents );

//Crear un event
router.post(
    "/",
    [
        check('title', 'title is required').not().isEmpty(),
        check('start', 'start date is required').custom(isDate), //Este lo creamos personalizado
        check('end', 'end date is required').custom(isDate), //Este lo creamos personalizado
        fieldsValidator
    ],
    createEvent )

// Actualizar un evento
router.put("/:id",updateEvent)

//Borrar un evento
router.delete("/:id",deleteEvent)








module.exports = router;