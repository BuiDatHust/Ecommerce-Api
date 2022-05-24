const  mongoose  = require("mongoose")
const Address = require("../models/address.models")
const Cart = require("../models/cart.models")
const Discount = require("../models/discount.models")
const Order = require("../models/order.models")
const Product = require("../models/product.models")
const User = require("../models/user.models")
const DisCountService = require("../services/discount.services")

const shippingFee = 30000

exports.checkoutService = async (userId,discountId) =>{
    const session = await mongoose.startSession()
    let total = shippingFee; 
    
    try{
        session.startTransaction()
        const cart = await Cart.findOne({userId: userId})
                                .populate({
                                    path: "items",
                                    populate: { path:'productId' } 
                                })
                                .populate('userId') 
        total += cart.total
        
        if(discountId){
            const discount = await DisCountService.getDetailDiscount(discountId, Date.now())
            if(discount){

            let {condition1, condition2}= discount
            let check1=true , check2 =true
            
            if(condition1){
                condition1 = parseInt(condition1)
                if(cart.userId.score<condition1){
                    check1 =false ;
                }
            }

            if(condition2){
                condition2 = parseInt(condition2)
                if(total<condition2){
                    check2 = false ; 
                }
            }

            if( check1 && check2 ){
                switch( discount.category ){
                    case "money":
                        let minus = parseInt( discount.minusPrice)
                        total -= minus
                        console.log(total)
                        break
                    case "percentage":
                        let percentage = parseInt( discount.minusPrice)
                        total -= Math.floor(total*percentage/100)
                        break
                    case "shippingfee":
                        total -= 30000 
                        break
                    default:
                        break 
                }
                await Discount.findOneAndUpdate({_id: discountId}, { $inc : {'survive': -1}  }, {session} )
            }
        }else{
            return "Discount is not available"
        }
            
        }
        
        const address = await Address.findOne({userId: userId, tag:"default"})

        let newOrder = await Order.create([{
            cart:cart._id,
            address: address._id,
            total: total,
            status: "shipping"
        }], { session })
        
        cart.items.forEach(async (item) => {
            const newProduct = item.productId ;
            newProduct.survive -= item.quantity;
            if(newProduct.survive<0){
                console.log(`san pham ${item.productId.name} het hang`)
                throw new Error(`san pham ${item.productId.name} het hang`)
            }
            await Product.findOneAndUpdate({_id: newProduct._id}, {survive:newProduct.survive},{session})
        })

        await Cart.deleteOne({_id: cart._id}, {session: session})

        await session.commitTransaction()
        session.endSession()

        return newOrder

    }catch(err){
        console.log(err)
        await session.abortTransaction()
        session.endSession()

        throw err 
    }
}

exports.addScoreToUser = async (userId, totalPrice) =>{
    let subScore =5
    
    if(totalPrice>200000 && totalPrice<1000000){
        subScore = 20
    }else if( totalPrice>1000000 && totalPrice<5000000){
        subScore = 30
    }else{
        subScore =50
    }

    await User.findOneAndUpdate({_id:userId}, {
        $inc: {score: subScore}, 
    },{new: true})
}   

exports.getAllOrder = async (userId) => {
    try {
        const orders = await Order.find({userId: userId}).populate('cart').populate('address')
        
        return orders;
    } catch (error) {
        throw error;
    }
}

exports.getDetailOrder = async ( orderId ) =>{
    try {
        const order = await Order.findOne({_id: orderId}).populate('cart').populate('address')
        
        return order;
    } catch (error) {
        throw error;
    }
}
