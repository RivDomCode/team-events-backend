const { response } = require('express'); //Esto es para tener el tipado automatico
const { validationResult } = require('express-validator')

//next es una función que será llamada si todo el middleware se ejecuta correctamente
//entonces lo mandaremos llamar de forma condicional
const fieldsValidator = (req, res = response, next) => {

    const errors = validationResult(req);
    //validacion si errors no está vacio, quiere decir que hay un error
    if( !errors.isEmpty()) {
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }

    //Si hay un error, el next no será llamado, ya que hay un return

    next();
}


module.exports = {fieldsValidator};