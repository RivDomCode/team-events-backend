const { Schema, model } = require('mongoose');

//Schema es la info que voy a grabar en la base de datos

const UserSchema = Schema({
    name:{
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        require: true
    }
});


//exportamos el model que se va a llamar User, y el schema va a manejar
//ese usuario

module.exports = model( 'User', UserSchema);
