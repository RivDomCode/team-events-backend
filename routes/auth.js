// Rutas de Usuarios / AuthenticatorAssertionResponse
// host + /api/auth

const { Router } = require('express');
const router = Router();  //congif de router

const { createUser, loginUser, renewToken} = require('../controllers/auth')

//Crear un nuevo usuario
router.post('/new', createUser);

//Hacer login
router.post('/', loginUser);

//renovar el token
router.get('/renew', renewToken)

module.exports = router;