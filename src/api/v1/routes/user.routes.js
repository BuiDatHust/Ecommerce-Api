const express = require('express')
const { getSingleUser, updatePassword, forgotPassword } = require('../controllers/user.controllers')
const { authenticateUser } = require('../middlewares/authenticateUser')
const router = express.Router() 

router.get('/', authenticateUser,  getSingleUser)
router.patch('/updatePassword',authenticateUser, updatePassword) 
router.post('/forgotPassword',authenticateUser, forgotPassword) 

module.exports = router