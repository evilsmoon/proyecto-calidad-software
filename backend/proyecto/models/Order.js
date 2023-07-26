const { Schema, model } = require('mongoose')

const OrderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    products: {
        type:[
            {
                product_id: {
                    type: Schema.Types.ObjectId,
                    required: true
                }
            },
            {
                size: {
                    type: String,
                    required: true
                }
            },
            {
                qty_order_products: {
                    type: Number,
                    required: true
                }
            },
            {
                total_product_payment: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    total_payment: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Pedido',OrderSchema);