const AddressService = require('../services/address.services')
const validateBody = require('../validations/validateUpdateBody')

const addAddress = async (req,res) => {
    const {userId} = req.user
    const newAddress = await AddressService.createAddress({...req.body,userId}, userId)
    
    return res.status(200).send({newAddress: newAddress})
}

const getAllAddress = async (req, res) => {
    const {userId} = req.user
    const addresses = await AddressService.getAllAddress(userId)
    
    res.status(201).send({addresses})
}

const setDefault = async (req, res) => {
    const {addressId } = req.body
    const {userId} = req.user

    const updateAddress = await AddressService.setDefaultAddress(userId, addressId)

    res.status(200).send({message: `Address ${updateAddress.addressName} set to default`})
}  

const updateAddress= async (req, res) => {
    const {addressId} = req.body
    const val = validateBody(req.body, 'addressId')

    const newAddress = await AddressService.updateAddress(val,addressId)
    res.status(201).send({newAddress: newAddress})
}

const deleteAddress = async (req, res) => {
    const {addressId} = req.body
    
    await AddressService.deleteAddress(addressId)
    res.status(200).send("Address was removed")
}

module.exports = {
    addAddress,
    setDefault,
    updateAddress,
    deleteAddress,
    getAllAddress
}