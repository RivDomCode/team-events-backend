const { response } = require('express');
const {validationResult} = require('express-validator');

const createUser = (req, res = response) => {
    //req es la petición, aqui viene lo que pide el usuario
    // console.log(req.body);

    const { name,email,password } = req.body;

    //validación para que el nombre sea mayor de 4 caracteres y se mete el status 400,
    //que es una bad request por parte del usuario para que devuelva ese status
    // if( name.length < 4 ) {
    //     return res.status( 400 ).json({
    //         ok:false,
    //         msg: "name must be longer than 4 characters"
    //     })
    // }

    const errors = validationResult(req);
    //validacion si errors no está vacio, quiere decir que hay un error
    if( !errors.isEmpty()) {
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: "new",
        name,
        email,
        password
    })
}

const loginUser = (req, res) => {
    const {
        email,
        password
    } = req.body;

    const errors = validationResult(req);
    //validacion si errors no está vacio, quiere decir que hay un error
    if( !errors.isEmpty()) {
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: "login",
        email,
        password,
    })
}

const renewToken = (req, res) => {
    res.json({
        ok: true,
        msg: "renew"
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}