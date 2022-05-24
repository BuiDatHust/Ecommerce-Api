const DiscountService = require('../services/discount.services')
const validateBody = require('../validations/validateUpdateBody')

const createDiscount = async (req,res) => {
    let {startTime, endTime,condition2, survive} = req.body 

    startTime = Date.parse(startTime)
    endTime = Date.parse(endTime)
    condition2 = condition2 ? parseInt(condition2) : undefined 
    survive = survive ? parseInt(survive) : undefined
    
    req.body = {...req.body, condition2: condition2, startTime: startTime, endTime:endTime,survive:survive}
    const newDiscount = await DiscountService.createDiscount(req.body)
    
    res.status(200).send({newDiscount})
}

const updateDiscount = async (req,res) => {
    let {startTime, endTime,condition2, survive, discountId} = req.body
    
    startTime = startTime ? Date.parse(startTime) : undefined
    endTime = endTime ? Date.parse(endTime) : undefined
    condition2 = condition2 ? parseInt(condition2) : undefined 
    survive = survive ? parseInt(survive) : undefined

    req.body = {...req.body, condition2: condition2, startTime: startTime, endTime:endTime,survive:survive}

    const val = validateBody(req.body, 'discountId')

    const updateDiscount = await DiscountService.updateDiscount(val,discountId);
     
    res.status(201).send({updateDiscount})
    
}

const getAllDiscount = async (req,res) => {
    const timeNow = new Date() ; 

    const discounts = await DiscountService.getAllDiscount(timeNow) ;
    res.status(201).send({discounts})

}

const getDetailDiscount = async (req,res) => {
    const {discountId} = req.params
    
    const discount = await DiscountService.getDetailDiscount(discountId)
    res.status(200).send({discount})
}

const getUserDiscount = async (req, res) => {
    const {userId}= req.user ;
    const time = Date.now()
    
    const discounts = await DiscountService.getUserDiscount(userId, time)
    res.status(200).send({discounts})
}

const saveDiscount = async (req, res) => {
    const {userId} = req.user   
    const {discountId} = req.body 

    const timeNow = Date.now()
    const newDiscount = await DiscountService.saveDiscount(timeNow,userId, discountId)

    if(typeof newDiscount == 'string'){
        res.status(500).send({message: newDiscount})
    }else{
        res.status(200).send({newDiscount})
    }
}


module.exports = {
    createDiscount,
    updateDiscount,
    getAllDiscount,
    getDetailDiscount,
    saveDiscount,
    getUserDiscount
}