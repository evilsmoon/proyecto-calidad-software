const { Schema, model } = require('mongoose')

const SuccessBillingTimeSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        require: true
    },
    time: { 
        type: Number,
        required: true 
    },
    date: {
        year:{
            type: String,
            required: true
        },
        month:{
            type: String,
            required: true
        },
        day:{
            type: String,
            required: true
        }
    }
})

const BillingTime = model('PedidosExistosos', SuccessBillingTimeSchema);

const ErrorBillingSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        require: true
    },
    date: {
        year:{
            type: String,
            required: true
        },
        month:{
            type: String,
            required: true
        },
        day:{
            type: String,
            required: true
        }
    }
})

const ErrorBilling = model('PedidosCancelados', ErrorBillingSchema);

const OnlineHelpSchema = new Schema({
    user_id: { 
        type: Schema.Types.ObjectId,
        required: true
    },
    number_helps: {
        type: Number,
        required: true
    },
    date: {
        year:{
            type: String,
            required: true
        },
        month:{
            type: String,
            required: true
        },
        day:{
            type: String,
            required: true
        }
    }
})

const OnlineHelps = model('AyudasEnLinea', OnlineHelpSchema);


module.exports = {
    BillingTime,
    ErrorBilling,
    OnlineHelps
}