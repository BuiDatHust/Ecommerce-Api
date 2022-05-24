const express = require('express') 
const { getStatistic, getOrderStatistic, getUserStatistic } = require('../controllers/admin.controllers')
const { authenticateUser, authorizePermission } = require('../middlewares/authenticateUser')
const router = express.Router()

router.get('/statistic', [authenticateUser, authorizePermission('admin')],getStatistic )
router.get('/statistic/order', [authenticateUser, authorizePermission('admin')],getOrderStatistic)
router.get('/statistic/user', [authenticateUser, authorizePermission('admin')],getUserStatistic)

module.exports = router