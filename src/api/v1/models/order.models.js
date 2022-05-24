const mongoose = require('mongoose');
const {Schema} = mongoose 

const orderSchema = new Schema({
    cart: {
        type: Schema.Types.ObjectId,
        ref:"Cart",
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true  
    },
    discount: {
        type: Schema.Types.ObjectId,
        ref: "Discount",
        required: false  
    },
    total: {
        type: Number ,
        required: true,
    },
    status: {
        type:String,
        enum: ["fail","shipping","success"] ,
        required: true
    }
},{
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order