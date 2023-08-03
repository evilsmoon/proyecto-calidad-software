const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    name: {
        type:String,
        required: true
    },
    image: {
        type: String,
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    gender: {
        type: String,
    },
    role: {
        type: String,
        required: true
    },
    address: {
        province: {
            type: String,
        },
        city: {
            type: String,
        },
        streetaddress: {
            type: String,
        },
        neighborhood: {
            type: String,
        },        
        phone_number: {
            type: String,
        }
    }
})

module.exports = model('Usuario',UsuarioSchema);