const { response } = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');

//Get orders filtered or all of them, it depends if the filter ir passed or not
const getFilterOrders = async(req,res = response ) => {
    const orders = await Order.find(req.body);
    res.json(orders)
}

//Get one product by its ID
const getOrderbyID = async(req,res = response) => {
    const order = await Order.findById(req.params.id);
    res.json(order)
}

//Create an Order
const createOrder = async(req,res = response) => {
    const new_order = new Order(req.body);
    await new_order.save();
    if ( update_products(new_order.products) ){
        res.json({ok: true})
    }
    else{
        res.json({ok: false, msg:"There was an error while updating stock!"})
    }
    
}

//update quantity products in order
const update_products = (products) => {
    try{
        products.foreach( (product) => {
            //obtener el producto
            product_information = Product.findById(product.product_id);
            // const size_product_data = product_information.size;
            product_information.size.foreach( (size_info) => {
                if (size_info.value === product.size){
                    size_info.qty = size_info.qty - product.qty_order_products;
                }
            })  
            Product.findByIdAndUpdate(product_information.id, {$set: product_information},{new: true});  
        })

        return true
    }
    catch ( err ){
        return false
    }
}


//Update an Order if it's necesary
const updateOrder = async (req,res = response) => {
    const { id } = req.params;
    const order_data = req.body
    await Order.findByIdAndUpdate(id, {$set: order_data},{new: true});
    res.json({ok: true});
}

//Delete an Order if it's necesary
const deleteOrder = async(req, res = response) => {
    const { id } = req.params;
    await Order.findByIdAndRemove(id);
    res.json({ok: true});
}

module.exports = {
    createOrder,
    getFilterOrders,
    getOrderbyID,
    updateOrder,
    deleteOrder
}