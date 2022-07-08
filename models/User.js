const { Schema, model } = require('mongoose');

//Schema es la info que voy a grabar en la base de datos

const UserSchema = Schema({
    name:{
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    }
});


//exportamos el model que se va a llamar User, y el schema va a manejar
//ese usuario

module.exports = model( 'User', UserSchema);
