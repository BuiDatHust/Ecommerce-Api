const Discount = require("../models/discount.models")

exports.createDiscount = async (body) => {
    try {
        console.log(body)
        const newDiscount = await Discount.create(body) 

        return newDiscount;
    } catch (error) {
        console.log(error)
    }
}

exports.getAllDiscount = async (timeNow) => {
    try {
        const discounts = await Discount.find({
            endTime: { $gte: timeNow },
            startTime: { $lte: timeNow},
            survive: { $gt: 0 }
        }, "-listUser" )

        return discounts;
    } catch (error) {
        console.log(error)
    }
}

exports.getDetailDiscount = async (discountId,time) =>{
    try {
        const discount = await Discount.findOne({
            _id: discountId,
            endTime: { $gte: time },
            startTime: { $lte: time},
            survive: { $gt: 0},
        }, "-listUser")

        return discount
    } catch (error) {
        console.log(error)
    }
}

exports.updateDiscount = async (val,discountId) => {
    try {
        const updateDiscount = await Discount.findOneAndUpdate({_id: discountId}, val, {new: true})

        return updateDiscount
    } catch (error) {
        console.log(error)
    }
}

exports.saveDiscount = async (time, userId, discountId) => {
    try {
        const discount = await Discount.findOne(
            {
                _id: discountId,
                endTime: { $gte: time },
                startTime: { $lte: time}
            })

        if(!discount){
            return "The Discount is not available!"
        }
        if(discount.listUser.includes(userId)){
            return "You saved this discount"
        }

        const newDiscount = await Discount.findOneAndUpdate({_id: discountId},
            {
                "$push": {"listUser": userId}
            }, {new: true})
        return newDiscount

    } catch (error) {
        console.log(error)
    }
}

exports.getUserDiscount = async (userId,time) => {
    try {
        console.log(userId)
        const discounts = await Discount.find(
            {
                endTime: { $gte: time },
                startTime: { $lte: time},
                survive: { $gt: 0},
                listUser: userId
            })
        
        return discounts
    } catch (error) {
        console.log(error)
    }
}

exports.updateDiscountInTransaction = async (val,discountId,session) => {
    try {
        const updateDiscount = await Discount.findOneAndUpdate({_id: discountId}, val, {session})

        return updateDiscount
    } catch (error) {
        console.log(error)
    }
}