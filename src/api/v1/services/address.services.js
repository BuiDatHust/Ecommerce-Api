const Address = require("../models/address.models")

exports.getAllAddress = async (userId) => {
    try {
        const addresses = await Address.find({userId: userId, status: "active"})
        
        return addresses 
    } catch (error) {
        console.log(error)
    }
}

exports.createAddress = async (address,userId) =>{
    try{
        const addressList = await Address.find({userId})
        console.log(addressList)
        
        if(addressList.length==0){
            address.tag = "default"
        }
        const newAddress = await Address.create(address) ;
        return newAddress
    }catch(err){
        console.log(err)
    }
}

exports.setDefaultAddress = async (userId,addressId) => {
    try{
        
        await Address.findOneAndUpdate({userId: userId , tag: "default"}, {tag: "secondary"})
        const newAddress = await Address.findByIdAndUpdate({_id: addressId}, {tag: "default"})
        
        return newAddress
    }catch(err){
        console.log(err)
    }
}

exports.updateAddress = async (updateAddress,addressId) => {
    try {
        const newAddress = await Address.findOneAndUpdate({_id: addressId}, updateAddress, {new:true})
        
        return newAddress
    } catch (error) {
        console.log(newAddress)
    }
}

exports.deleteAddress = async (addressId) =>{
    try {
        await Address.findOneAndUpdate({_id:addressId}, {status:"inactive" })
    } catch (error) {
        console.log(error)
    }
}