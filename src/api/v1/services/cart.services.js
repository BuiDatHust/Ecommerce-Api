const { default: mongoose } = require('mongoose')
const Cart = require('../models/cart.models')

exports.findCart = async (userId) =>{
    try {
        const cart = await Cart.findOne({userId: userId})
    
        return cart
    } catch (error) {
        console.log(error)
    }
}

exports.createNewCart = async (userId) =>{
    try {
        const newCart = await Cart.create({userId,items: [] })

        return newCart
    }catch(err) {
        console.error(err)
    }
}

exports.addToCart = async (item,cartId) =>{
    try {
        const subtotal = item.price*item.quantity

        const newCart = await Cart.findByIdAndUpdate(
            {_id: cartId}, 
            { $push: {items: item}, 
            $inc: { total:subtotal } }, {new: true})

        return newCart
    } catch (error) {
        console.log(error)
    }
}

exports.updateAmountItem = async (itemId,userId, typeQuantity) =>{
    try {
        let newCart = await Cart.findOne({userId: userId})
        
        let newTotal = newCart.total
        newCart.items.forEach(item =>{
            if(item._id==itemId){
                item.quantity += typeQuantity
                newTotal+= item.quantity*item.price
            }
        })
        
        const updateCart = await Cart.findByIdAndUpdate(
            {userId:userId} ,{
                items: newCart.items,
                total: newCart   
            }, {new: true}
        )
        return updateCart
    } catch (error) {
        console.log(error)
    }
} 

exports.updateProductClassify = async (itemId,userId,productClassify) =>{
    try {
        const newCart = await Cart.findOne({userId})
        
        newCart.items.forEach(item =>{
            if(item._id==itemId){
                item.productClassify = productClassify
            }
        })
        
        const updateCart = await Cart.findByIdAndUpdate(
            {userId:userId} ,{
                items: newCart.items,
            }, {new: true}
        )
        return updateCart
    } catch (error) {
        console.log(error)
    }
}

exports.getCart = async (userId) =>{
    try {
        const cart = await Cart.findById({userId: userId})
        if(!cart) return {}

        return cart
    } catch (error) {
        console.log(error)
    }
}

exports.deleteItem = async (itemId, userId) =>{
    try {
        const newCart = await Cart.findOneAndUpdate({userId}, {
            $pull: { items: { _id: itemId } }
        }, {new: true})

        return newCart 
    } catch (error) {
        
    }
}