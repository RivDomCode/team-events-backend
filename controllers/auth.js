const { response } = require('express');
const {validationResult} = require('express-validator');
var bcrypt = require('bcryptjs');
const User = require("../models/User");
const { generateJWT } = require('../helpers/jwt');

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

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync(10);
        //encriptación de contraseña introducida por el usuario
        user.password = bcrypt.hashSync(password, salt)


        //guardar en DB
        await user.save();

        //generar JWT
        const token = await generateJWT(user.id, user.name);
        console.log(token);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Please talk to administrator"
        })
    }

}

const loginUser = async(req, res) => {
    const {
        email,
        password
    } = req.body;

    try {

        //comprobar si ese email está registrado en DB
        const  user = await User.findOne( {email} );
        if (!user) {
            return res.status(400).json({
                ok:false,
                msg:"No user with this email"
            })
        }

        //Confirmar que el password para el email coincide con el de la DB
        //devuelve true si coinciden y false en caso contrario
        const validPassword = bcrypt.compareSync(password, user.password); //compara el password intro por el usuario con el de la DB
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: "password not correct"
            })
        }

        //generar JWT
        const token = await generateJWT(user.id, user.name);


        //Todo ok
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Please talk to administrator"
        })
    }

}

const renewToken = async (req, res) => {

    const uid =  req.uid;
    const name = req.name;

    //generar un nuevo jwt
    const token = await generateJWT( uid, name)

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}