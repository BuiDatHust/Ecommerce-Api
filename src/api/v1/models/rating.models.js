const mongoose = require('mongoose');
const {Schema} = mongoose

const rateSchema = new mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    rating: {
        type: Number,
        required: true,
    } ,
      
},{
    timestamps: true
})

const Rating = mongoose.model('Rating',rateSchema);

module.exports = Rating;