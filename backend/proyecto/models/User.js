const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
    name: {
        first: {
            type:String,
            required: true
        },
        last: {
            type:String,
            required: true
        }
    },
    image: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    ci: {
        type:String,
        required: true,
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
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

module.exports = model('Usuario',UsuarioSchema);