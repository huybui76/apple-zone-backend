const OrderService = require('../services/OrderService')
const Joi = require('joi');

const orderSchema = Joi.object({
    itemsPrice: Joi.number().required(),
    shippingPrice: Joi.number().required(),
    totalPrice: Joi.number().required(),
    phone: Joi.number().required(),
    fullName: Joi.string().required(),
    address: Joi.string().required(),
    orderItems: Joi.array(),
    paymentMethod: Joi.string().required(),

    //user: Joi.string().required(),
    //paidAt: Joi.number().required(),
    //deliveredAt: Joi.number().required(),
})

const createOrder = async (req, res) => {
    try {
        const { error } = orderSchema.validate(req.body);
        if (error) {
            return res.status(404).json({
                status: 'ERR',
                message: error.details[0].message,
            })
        }
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }
}

const getOrderByPhone = async (req, res) => {
    try {
        const phone = req.params.id
        if (!phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The phone is required'
            })
        }
        const response = await OrderService.getOrderByPhone(phone)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.getOrderDetails(orderId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const cancelOrderDetails = async (req, res) => {
    try {
        const data = req.body.orderItems
        const orderId = req.params.id
        //console.log("ffffffffffffffff", data, orderId)
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId, data)

        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createOrder,
    getOrderByPhone,
    getDetailsOrder,
    cancelOrderDetails,
    getAllOrder
}
