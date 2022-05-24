const User = require("../models/user.models");

exports.getSingleUser = async (userId) => {
    const user = await User.findOne({_id: userId});
    return user ;
}

exports.comparePassword = async (user,password) => {
    const isMatch = await user.comparePassword(password)
    return isMatch
}