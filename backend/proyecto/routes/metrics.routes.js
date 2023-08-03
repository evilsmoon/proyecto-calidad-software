const { Router } = require("express");
const { 
    registerBillingTime,
    registerErrorBilling,
    registerOnlineHelp
    } = require("../controllers/metrics.controller");

const router = Router();

router.post('/billingtime', registerBillingTime);
router.post('/errorbilling', registerErrorBilling);
router.post('/onlinehelp', registerOnlineHelp);

// router.get('/',getFilterOrders);
// router.get('/:id',getOrderbyID);

module.exports = router;