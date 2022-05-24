const User = require("../models/user.models")

exports.findOne = async (email) =>{
    const user = await User.findOne({ email: email})

    if(user) return user ;
    return false ;
}

exports.count = async () =>{
    return await User.countDocuments({})
}

exports.createUser = async (body) =>{
    const user =  new User(body)

    try{
        await user.save() 
        return user ; 
    }catch(error){
        throw new Error(error)
    }
}
