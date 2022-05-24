const express = require('express');
const { addAddress, setDefault, deleteAddress, updateAddress, getAllAddress } = require('../controllers/address.controller');
const { authenticateUser } = require('../middlewares/authenticateUser');
const router = express.Router()

router.get('/',authenticateUser,getAllAddress)
router.post('/addAddress',authenticateUser,addAddress )
router.patch('/setDefault',authenticateUser,setDefault)
router.patch('/softDelete', authenticateUser,deleteAddress)
router.patch('/update',authenticateUser,updateAddress)

module.exports = router 