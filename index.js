const express = require('express');
require('dotenv').config();
const {dbConnection}  = require('./database/config');
const cors = require('cors');

console.log(process.env);

// Crear el sv de express

const app = express();

//Base de datos
dbConnection();

//CORS

app.use(cors())

//Directorio publico

// app.use(express.static('public'));

//Lectura y parseo del body

app.use(express.json());


app.get("/", (req, res) =>{
    res.send("Hola mi server en Express calendar back ");
  });
  

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'))
//auth
//crud

//Escuchar peticiones
app.listen(process.env.PORT, ()=>
console.log(`Servidor corriendo en el puerto ${process.env.PORT}`));


