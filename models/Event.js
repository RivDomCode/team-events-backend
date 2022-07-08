const { Schema, model } = require('mongoose');

//Schema es la info que voy a grabar en la base de datos

const EventSchema = Schema({
    title:{
        type: String,
        required: true
    },
    notes:{
        type: String,
    },
    start:{
        type: Date,
        required:true
    },
    end:{
        type: Date,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true

    }

});


module.exports = model( 'Event', EventSchema);
