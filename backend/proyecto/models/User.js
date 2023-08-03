const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    name: {
        type:String,
        required: true
    },
    image: {
        type: String,
    },
    phone: {
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
})

module.exports = model('Usuario',UsuarioSchema);