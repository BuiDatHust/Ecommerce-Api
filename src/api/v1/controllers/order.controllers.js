const OrderService = require('../services/order.services')

const checkoutOrder = async (req, res) => {
    const {userId} = req.user
    const {discountId} = req.body
    
    const newOrder = await OrderService.checkoutService(userId,discountId)
    await OrderService.addScoreToUser(userId, newOrder.total)
    
    return res.status(200).send({newOrder})
}

const getAllOrder = async (req, res) => {
    const {userId} = req.user
    const orders = await OrderService.getAllOrder(userId)
    
    return res.status(200).send({orders})
}

const getDetailOrder = async (req, res) => {
    const {orderId} = req.params
    const order = await OrderService.getDetailOrder(orderId)
    
    return res.status(200).send({order})
}

const OrderNotLogin = async (req, res) => {
    const {name,email,phone,nameProduct,classifyProduct} = req.body  
}

const deleteOrder = async (req, res) => {

}

module.exports = {
    checkoutOrder,
    getAllOrder,
    getDetailOrder,
    deleteOrder
}