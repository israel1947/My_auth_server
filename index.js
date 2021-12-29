const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConection } = require('./db/config');
require('dotenv').config();//cuando carge la aplicacion, lee el archivo .env

//console.log(process.env);

//crear servidor/applicacion de express
const app = express();

//Base de datos
dbConection();

//Directorio público
app.use(express.static('public') ); 

//CORS
app.use(cors() );

//Lectura y parseo del Body
app.use(express.json() );


//Rutas
app.use('/api/auth', require('./routes/auth') );

//Manejar otras rutas
app.get('*', (req, resp)=>{
    resp.sendFile(path.resolve(__dirname, 'public/index.html') );
})


app.listen(process.env.PORT, ()=> {
//funcion que se ejucatara cuando este levantado el servidor
console.log(`servidor corriendo en puerto ${process.env.PORT}`);

});
