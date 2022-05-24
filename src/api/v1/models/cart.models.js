const mongoose = require('mongoose');
const {Schema} = mongoose 

const item = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    price: {
        type:Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    productClassify: {
        type: String ,
        required: true 
    },
    // status: {
    //     type: String,
    //     enum: ["active","inactive"], 
    //     default: "active"
    // }
    //them status de thong ke don da mua
})

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    total: {
        type: Number,
        default: 0 
    },
    items: [item] 
},{
    timestamps: true
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart