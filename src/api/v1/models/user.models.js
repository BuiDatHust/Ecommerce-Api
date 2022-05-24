const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true ,
        trim: true  
    },
    email: {
        type: String  ,
        required: true ,
        unique: true ,
        validate: {
            validator: (val) => validator.isEmail(val),
            message: "email is invalid"
      }, 
    },
    password: {
        type: String ,
        required: true ,
        minLength:[7, "password length is too short"],
        trim: true 
    }, 
    role: {
        type: String ,
        enum: ["user","admin"] ,
        default: "user"
    },
    score: {
        type: Number ,
        default: 0  
    }
},{
    timestamps: true 
})

//Hash plain password before saving
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};


const User = mongoose.model('User' , userSchema)

module.exports = User 