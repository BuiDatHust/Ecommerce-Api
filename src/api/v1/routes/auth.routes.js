const express = require('express');
const { register, registerOAuth, login, logout, getNewToken } = require('../controllers/auth.controllers');
const router = express.Router();

router.post('/register', register)
router.post('/register/oAuth', registerOAuth) 
router.post('/login', login)
router.post('/token', getNewToken) // lay token khi access token het han
router.get('/logout', logout) 

module.exports = router