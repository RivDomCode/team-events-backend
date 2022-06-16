const mongoose = require('mongoose');

const dbConnection = async() => {


    try {
      await  mongoose.connect(process.env.DB_CNN); //la url a la que se va a conectar, puede cambiar, por eso la agragamos a las  variables de entorno en .env
        console.log("DB online")
    } catch (error) {
        console.log(error);
        throw new Error('Error initializing DB')
    }
}

module.exports = { dbConnection };