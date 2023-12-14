const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');


router.post('/', OrderController.createOrder)
router.get('/order-by-phone/:id', OrderController.getOrderByPhone)
router.get('/:id', OrderController.getDetailsOrder)
router.delete('/:id', OrderController.cancelOrderDetails)
router.get('/', OrderController.getAllOrder)


module.exports = router