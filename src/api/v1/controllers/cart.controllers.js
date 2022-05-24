const CartService = require('../services/cart.services')

const addToCart = async (req, res) => {
    const {userId} = req.user
    const cartNow = await CartService.findCart(userId)
    let newCart
    
    if(cartNow){
        newCart = await CartService.addToCart(req.body,cartNow._id)

        return res.status(200).send({newCart})
    }
    newCart = await CartService.createNewCart(userId)  
    const cart = await CartService.addToCart(req.body,newCart._id)

    res.status(200).send({newCart: cart})
}

const updateItem = async (req, res) => {
    const {userId} = req.user 
    let {itemId,typeQuantity, productClassify} = req.body 
    let newCart 

    if(typeQuantity!==undefined) {
        typeQuantity = typeQuantity=="increase" ? 1 : -1
        newCart = await CartService.updateAmountItem(itemId,userId,typeQuantity)
    }
    if(productClassify!==undefined){
        newCart = await CartService.updateProductClassify(itemId,userId,productClassify)
    }
    
    res.status(201).send({newCart})
}

const deleteItem = async (req, res) => {
    const {itemId} = req.body
    const {userId} = req.user  
    
    const newCart = await CartService.deleteItem(itemId, userId )
    res.status(200).send({newCart}) 
}

const getCart = async (req, res) => {
    const {userId} = req.user 
    const cart = await CartService.getCart(userId)
    
    res.status(201).send({cart}) 
}

module.exports = {
    addToCart,
    updateItem,
    deleteItem,
    getCart   
}