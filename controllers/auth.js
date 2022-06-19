const { response } = require('express');
const {validationResult} = require('express-validator');
const User = require("../models/User");

const createUser = async(req, res = response) => {
    //req es la petición, aqui viene lo que pide el usuario
    // console.log(req.body);

    const { email,password } = req.body;
    try {
        //validación para ver si el email está ya registrado
        //usamos la funcion findOne del modelo user pasndo el email que viene
        //en la request
        let user = await User.findOne( {email} );
        if (user) {
            return res.status(400).json({
                ok:false,
                msg:"An user with this email already exists"
            })
        }

         user = new User(req.body); //creamos una nueva instancia del modelo User que hemos importado
        //guardar en DB
        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:"Please talk to administrator"
        })
    }

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