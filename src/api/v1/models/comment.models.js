const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User" 
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product" 
    },
    context: {
        type: String,
        required: true,  
    }
},{
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;