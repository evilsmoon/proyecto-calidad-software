const { response } = require('express');
const {BillingTime, ErrorBilling, OnlineHelps} = require('../models/Metric');

//Get all products filtered by user if user does not select any category the method return all the products
// const getFilterProducts = async(req,res = response ) => {
//     const products = await Product.find(req.body);
//     res.json(products)
// }

// //Get one product by its ID
// const getProductbyID = async(req,res = response) => {
//     const product = await Product.findById(req.params.id);
//     res.json(product)
// }


const registerBillingTime = async(req,res = response) => {
    const new_billing_time = new BillingTime(req.body);
    await new_billing_time.save();
    res.json({ok: true, id: new_billing_time.id})
}

const getBillingTIme = async(req,res = response) => {
    const billingtime= await BillingTime.find(req.body);
    res.json(billingtime)
}


const registerErrorBilling = async(req,res = response) => {
    const error_billing = new ErrorBilling(req.body);
    await error_billing.save();
    res.json({ok: true, id: error_billing.id})
}


const registerOnlineHelp = async(req,res = response) => {
    const online_help = new OnlineHelps(req.body);
    await online_help.save();
    res.json({ok: true, id: online_help.id})
}

module.exports = {
    registerBillingTime,
    getBillingTIme,
    registerErrorBilling,
    registerOnlineHelp
}