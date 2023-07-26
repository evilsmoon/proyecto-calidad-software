const { Router } = require("express");
const { 
    createOrder,
    getFilterOrders,
    getOrderbyID,
    updateOrder,
    deleteOrder
    } = require("../controllers/order.controller");

const router = Router();

router.post('/register', createOrder);
router.put('/:id', updateOrder);
router.get('/',getFilterOrders);
router.get('/:id',getOrderbyID);
router.delete('/:id',deleteOrder);

module.exports = router;