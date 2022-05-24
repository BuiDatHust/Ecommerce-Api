const mongoose = require('mongoose');
const {Schema} = mongoose 

const addressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    addressName: {
        type: String ,
        required: true
    },
    phone: {
        type: String ,
        required: true 
    },
    tag: {
        type: String ,
        enum: ["default","secondary"],
        default: "secondary"
    },
    status : {
        type: String ,
        enum: ["active","inactive"],
        default:"active" 
    }
},{
    timestamps: true
})

const Address = mongoose.model('Address', addressSchema)

module.exports = Address
