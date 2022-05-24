const mongoose = require('mongoose');
const {Schema} = mongoose 

const discountSchema = new Schema({
    name: {
        type: 'string',
        required: true 
    }, 
    category: {
        type: 'string',
        enum: ['percentage', 'money', 'shippingfee'],
        required: true
    },
    minusPrice:{
        type:String,
        required: false
    },
    startTime: { 
        type: Date, 
        required: true 
    },
    endTime: { 
        type: Date, 
        required: true 
    },
    condition1:{ 
        type: String,
        required: false 
    },
    condition2: {
        type: Number ,
        required: false
    },
    survive: {
        type: Number ,
        required: false
    },
    listUser: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        }
    ]
},{
    timestamps: true
})

const Discount = new mongoose.model("Discount", discountSchema)

module.exports = Discount