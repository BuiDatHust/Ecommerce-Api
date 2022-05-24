const express = require('express')
const { checkoutOrder, getAllOrder, getDetailOrder, deleteOrder } = require('../controllers/order.controllers')
const { authenticateUser } = require('../middlewares/authenticateUser')
const router = express.Router()

router.post('/checkout',authenticateUser, checkoutOrder )
router.get('/',authenticateUser,getAllOrder)
router.get('/:orderId',authenticateUser, getDetailOrder)
router.post('/deleteOrder',authenticateUser, deleteOrder) 

module.exports = router