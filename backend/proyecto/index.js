const express = require('express');
const cors = require('cors');
// const path = require('path');
const { dbConnection } = require('./database/config.db');
// require('dotenv').config();

const app = express();
const puerto = process.env.PORT || 3000;

//Base de datos
dbConnection();

// //Directorio Público
// app.use(express.static('public'))

//CORS
app.use( cors() );

//Lectura Body
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: '50mb'}));

//Rutas
app.use('/api/user',require('./routes/user.routes'));
app.use('/api/product',require('./routes/product.routes'));
app.use('/api/order',require('./routes/order.routes'));

//rutas de angular
// app.get('*', ( req, res ) => {
//     res.sendFile( path.resolve(__dirname, 'public/index.html'));
// })


app.listen( puerto, () => {
    console.log(`Servidor, corriendo en el puerto ${ puerto }`);
});

// module.exports = app;