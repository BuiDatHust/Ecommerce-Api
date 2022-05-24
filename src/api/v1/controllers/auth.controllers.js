const AuthServices = require('../services/auth.services')
const { generateAccessToken, attachTokenToRes, isToken, isRefreshToken } = require('../helpers/jwt');
const { client } = require('../db/connectRedis');

const register = async (req,res) => {
    const {email,name,password} = req.body ;
    
    try{
        const user = await AuthServices.findOne(email)
        if(user){
            throw new Error("Email already Exist!")
        }else{
            const count = await AuthServices.count() ;
            if(count==0){
                req.body.role= "admin"
            } 

            const newUser = await AuthServices.createUser(req.body)
            res.status(201).send({newUser}) 
        }
    }catch(e){
        throw new Error(e)
    }
    
}

const registerOAuth = (req,res) => {

}

const login = async (req,res) => {
    const {email,password} = req.body 

    const user = await AuthServices.findOne(email)
    if(!user){
        return res.status(404).send({message: "User Not Exist"})
    } 

    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(404).send({message: "Incorrect Password"})
    }

    const {refreshCount, accessCount} = await updateToken()
    attachTokenToRes(res, user,accessCount,refreshCount)

    res.status(200).send({message: "Login Success"})
}

const logout = (req,res) => {
    res.clearCookie('accessToken')
    res.clearCookie("refreshToken")
    
    res.status(200).send({message: "Logout Success"}) 
}

const getNewToken = async (req, res) => {
    const fakeRefreshToken = req.signedCookies.refreshToken 
    
    if(fakeRefreshToken){
        const refreshToken = await client.get(fakeRefreshToken)
        const user = await isRefreshToken(refreshToken)
        console.log(user)
     
        const {refreshCount, accessCount} = await updateToken() 

        attachTokenToRes(res, user,accessCount,refreshCount)
        res.send({message:"Have new Token Access"})
    }
    
}

const updateToken = async () =>{
    const val= await client.get("tokenCounter")
    const refreshVal= await client.get("refreshCounter")
    
    const accessCount = parseInt(val) + 1
    const refreshCount = parseInt(refreshVal) + 1
    
    client.set("tokenCounter", accessCount+"");
    client.set("refreshCounter", refreshCount+ "")

    return {refreshCount, accessCount} ; 
}

module.exports = {
    register ,
    registerOAuth,
    login,
    logout ,
    getNewToken
}