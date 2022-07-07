const { Schema, model } = require('mongoose');

//Schema es la info que voy a grabar en la base de datos

const EventSchema = Schema({
    title:{
        type: String,
        require: true
    },
    notes:{
        type: String,
    },
    start:{
        type: Date,
        require:true
    },
    end:{
        type: Date,
        require:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }

});


//exportamos el model que se va a llamar User, y el schema va a manejar
//ese usuario

module.exports = model( 'Event', EventSchema);
