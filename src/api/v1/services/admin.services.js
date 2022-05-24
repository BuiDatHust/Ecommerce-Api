const createError = require('http-errors');
const User = require('../models/user.models');

exports.getAllUser = async (next) =>{
    try {
        const users = await User.find({})

        return users 
    } catch (error) {
        next(createError(500, error.message));
    }
}


exports.getUserInTime = async (next,startTime, endTime) => {
    try {
        const users = await User.find({
            createdAt: {$gte : startTime, $lte : endTime},
        })

        return users
    } catch (error) {
        next(createError(500, error.message));
    }
}
