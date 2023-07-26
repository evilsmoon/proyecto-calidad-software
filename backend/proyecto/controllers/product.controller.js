const { response } = require('express');
const Product = require('../models/Product');

//Get all products filtered by user if user does not select any category the method return all the products
const getFilterProducts = async(req,res = response ) => {
    const products = await Product.find(req.body);
    res.json(products)
}

//Get one product by its ID
const getProductbyID = async(req,res = response) => {
    const product = await Product.findById(req.params.id);
    res.json(product)
}

//Create a product
const createProduct = async(req,res = response) => {
    const new_product = new Product(req.body);
    await new_product.save();
    res.json({ok: true, id: new_product.id})
}

//Update a product
const updateProduct = async (req,res = response) => {
    const { id } = req.params;
    const product_data = req.body
    await Product.findByIdAndUpdate(id, {$set: product_data},{new: true});
    res.json({ok: true});
}

//Delete a product
const deleteProduct = async(req, res = response) => {
    const { id } = req.params;
    await Product.findByIdAndRemove(id);
    res.json({ok: true});
}

module.exports = {
    createProduct,
    getFilterProducts,
    getProductbyID,
    updateProduct,
    deleteProduct
}