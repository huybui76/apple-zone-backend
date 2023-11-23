const OrderService = require('../services/OrderService')
const Joi = require('joi');

const orderSchema = Joi.object({
  paymentMethod: Joi.string().required(),
  itemsPrice: Joi.number().required(),
  shippingPrice: Joi.number().required(),
  totalPrice: Joi.number().required(),
  user: Joi.string().required(),
  paidAt: Joi.number().required(),
  deliveredAt: Joi.number().required(),
  phone: Joi.number().required(),
})

const createOrder = async (req, res) => {
    try { 
        const {error} = orderSchema.validate(req.body);
        if(error){
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

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getAllOrderDetails(userId)
        return res.status(200).json(response)
    } catch (error) {
        // console.log(e)
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
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getOrderDetails(orderId)
        return res.status(200).json(response)
    } catch (error) {
        // console.log(e)
        return res.status(404).json({
            message: error
        })
    }
}

const cancelOrderDetails = async (req, res) => {
    try {
        const data= req.body.orderItems
        const orderId= req.body.orderId
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId, data)
        return res.status(200).json(response)
    } catch (error) {
        // console.log(e)
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
        // console.log(e)
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    getAllOrder
}
