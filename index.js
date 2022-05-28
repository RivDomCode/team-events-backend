const express = require('express');
require('dotenv').config();

console.log(process.env);


//1. Crear servidor express
const app = express();

//4.Directorio público
app.use(express.static("public"))

//3.Creación rutas
// app.get('/', (req, res)=>{
//     res.json({
//         ok:true,
//     })
// })

//2.Escuchar peticiones
app.listen(4000, ()=>{
    console.log("servidor corriendo..")
})