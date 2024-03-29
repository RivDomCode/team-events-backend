// Rutas de Usuarios / AuthenticatorAssertionResponse
// host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();  //congif de router

const { createUser, loginUser, renewToken} = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

//Crear un nuevo usuario
router.post(
    '/new',
    [ //middlewares: el primer argumento de check es el campor que quiero
       //evaluar, el segundo es el mensaje de error, lo siguiente que no esté vacio
        check('name', 'name is a required field').not().isEmpty(),
        check('email', 'email is a required field').isEmail(),
        check('password', 'password must be longer than 5 characters').isLength({ min: 6}),
        fieldsValidator
    ],
    createUser);

//Hacer login
router.post('/',
                [ //middlewares: el primer argumento de check es el campor que quiero
                //evaluar, el segundo es el mensaje de error, lo siguiente que no esté vacio
                check('email', 'email is a required field').isEmail(),
                check('password', 'password must be longer than 5 characters').isLength({ min: 6}),
                fieldsValidator
                ],
            loginUser);

//renovar el token
router.get('/renew',validateJWT, renewToken)

module.exports = router;