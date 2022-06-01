const express = require('express');
require('dotenv').config();

console.log(process.env);


//1. Crear servidor express
const app = express();

//4.Directorio público
app.use(express.static("public"));

//3.Creación rutas: me lo llevo a carpeta routes porque voy a tener mas de una ruta

//4.Especificar la ruta en la que quiero que esten habilitados los endpoints que voy a crear
app.use('/api/auth', require('./routes/auth')); //ruta y archivo


//2.Escuchar peticiones
app.listen(4000, ()=>{
    console.log("servidor corriendo..")
})