const express = require('express');
const  cors = require('cors')
const { dbConnection } = require('./database/config');
require('dotenv').config();

console.log(process.env);


//1. Crear servidor express
const app = express();

//base de datos
dbConnection();

//cors
app.use(cors());

//4.Directorio público
app.use(express.static("public"));

//Lectura y parseo del body. Pasamos todas las peticiones por el siguiente middleware
//las peticiones que vienen en formato json las procesa aqui y se extrae su contenido

app.use(express.json())

//3.Creación rutas: me lo llevo a carpeta routes porque voy a tener mas de una ruta

//4.Especificar la ruta en la que quiero que esten habilitados los endpoints que voy a crear
app.use('/api/auth', require('./routes/auth')); //ruta y archivo


//2.Escuchar peticiones
app.listen(4000, ()=>{
    console.log("servidor corriendo..")
})