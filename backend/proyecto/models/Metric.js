const { Schema, model } = require('mongoose')

const SuccessBillingTimeSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        require: true
    },
    time: { 
        type: Number,
        required: true 
    }
})

const BillingTime = model('PedidosExistosos', SuccessBillingTimeSchema);

const ErrorBillingSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    number_error_billings: {
        type: Number,
        required: true
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
        type: Date,
        default: Date.now,
    }
})

const OnlineHelps = model('AyudasEnLinea', OnlineHelpSchema);


module.exports = {
    BillingTime,
    ErrorBilling,
    OnlineHelps
}