const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');


router.post('/create-order', OrderController.createOrder)
router.get('/get-order-by-phone/:id', OrderController.getOrderByPhone)
router.get('/get-details-order/:id', OrderController.getDetailsOrder)
router.delete('/cancel-order/:id', OrderController.cancelOrderDetails)
router.get('/get-all-order', OrderController.getAllOrder)


module.exports = router