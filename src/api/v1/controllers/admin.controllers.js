const AdminService = require('../services/admin.services')

const getStatistic = async (req,res) => {
    const {type} = req.query ;
    type = type ? type : "day" 
}

const getOrderStatistic = async (req,res) => {
    
}

const getUserStatistic = async (req,res,next) => {
    var {type,time, startTime, endTime} = req.query ;
    
    time = time ? parseInt(time) : time

    let users = await AdminService.getAllUser(next)
    let newUser = []
    let t1,t2 

    if(type!==undefined){
        if(type=="date"){
            newUser = await AdminService.getUserInTime(next,startTime,endTime)
        }else{
            if(type=="month"){
                let str =""
                str+= time + " " + 1 + "," + " "+ new Date().getFullYear() 
                t1= new Date(str)
                str=""
                str+= time+1 + " " + 1 + "," + " "+ new Date().getFullYear() 
                t2= new Date(str)

                newUser = await AdminService.getUserInTime(next, t1,t2)
            }else{
                let str =""
                str+= "January " + 1 + "," + " "+ time 
                t1= new Date(str)
                str=""
                str+= "January " + 1 + "," + " "+ time+1 
                t2= new Date(str)

                newUser = await AdminService.getUserInTime(next, t1,t2)
            }
        }
    }

    res.status(200).send({allUser: users.length, newUser: newUser ? newUser.length : 0})
}

module.exports = {
    getStatistic,
    getOrderStatistic,
    getUserStatistic 
}