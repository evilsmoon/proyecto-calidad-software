const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        console.log(process.env.DB_CONN);
        await mongoose.connect( process.env.DB_CONN, {
            useNewUrlParser: true
        } );
        console.log('DB en línea');
    } catch (error) {
        console.log(error); 
        throw new Error('Error a la hora de inicializar la base de datos');
    }
}

module.exports = {
    dbConnection
}