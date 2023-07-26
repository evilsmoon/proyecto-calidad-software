const { Router } = require("express");
const { createProduct,
        getFilterProducts, 
        getProductbyID, 
        updateProduct,
        deleteProduct 
    } = require("../controllers/product.controller");


const router = Router();

router.post('/register', createProduct);
router.put('/:id', updateProduct);
router.get('/',getFilterProducts);
router.get('/:id',getProductbyID);
router.delete('/:id',deleteProduct);

module.exports = router;