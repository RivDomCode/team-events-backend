const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next) => {
    //como obtener el token: lo voy a pedir x-token en los headers (postman)
    const token = req.header('x-token');
    //Hacemos las validaciones
    //1. si no viene token

    if(!token) {
        return res.status(401).json({
            ok:false,
            msg:"no token received"
        })
    }

    //si viene token

    try {
        //verificamos el token y la secret key
        const { uid, name} =jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )
        //en el payload tengo el uid del usuario
        // console.log(payload)
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:"token not correct"
        })
    }

    next();
}

module.exports = { validateJWT }