const UserService = require('../services/user.services')

const getSingleUser = async (req,res) => {
    try{
        const {userId} = req.user
        const user = await UserService.getSingleUser(userId) 
        res.status(200).send({user})
    }catch(err){
        res.status(200).send({message: "not Found User"})
        throw err 
    }
    
}

const updatePassword = async (req,res) => {
    const {oldPassword, newPassword} = req.body 
    const {userId} = req.user 
    
    const user = await UserService.getSingleUser(userId)
    const isMatch = await UserService.comparePassword(user, oldPassword)

    if(!isMatch) {
        return res.status(400).send({message: "Password Incorrect"}) 
    }
    user.password = newPassword ;
    await user.save()

    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    
    res.send(200).send({message: "Success Update Password,please login again! "})
}

const forgotPassword = async (req, res) => {
    
}

module.exports  ={
    getSingleUser,
    updatePassword,
    forgotPassword
}