const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true , 
    },
    name: {
        type: String,
        required: true,
        trim: true,
        text: true,
        // sparse: true ,  
    } ,
    description: {
        type: String,
        required: true,
        minLength:[100, "Length is too short"] ,
        trim: true,
    },
    images: [
        {
            data: Buffer,
            contentType: String
        }
     ] ,
    price: {
        type: Number,
        required: true
    } ,
    hotprice: {
        type: Number,
        required: false 
    } ,
    survive: {
        type: Number ,
        required: true   
    } ,
    rate: {
        type: Number,
        default:5
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment" 
        }
    ],
    status: {
        type: String ,
        enum: ["active", "inactive"],
        default: "active"

    },
    productClassify: [
        {
            type: String,
            required: true
        }
    ]          
},{
    timestamps: true 
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product