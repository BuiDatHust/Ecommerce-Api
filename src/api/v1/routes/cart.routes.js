const express = require('express')
const { addToCart, updateItem, deleteItem, getCart } = require('../controllers/cart.controllers')
const {authenticateUser} = require('../middlewares/authenticateUser')
const router = express.Router()

router.post('/addToCart',authenticateUser, addToCart)
router.patch('/updateItem',authenticateUser, updateItem)
router.delete('/deleteItem',authenticateUser,deleteItem)
router.get('/',authenticateUser,getCart)

module.exports = router