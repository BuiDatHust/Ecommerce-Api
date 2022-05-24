const express= require('express');
const { createDiscount, updateDiscount, getAllDiscount, getDetailDiscount, saveDiscount, getUserDiscount } = require('../controllers/discount.controllers');
const router = express.Router();
const {authenticateUser,authorizePermission} = require('../middlewares/authenticateUser')

router.post('/create', [authenticateUser, authorizePermission('admin')], createDiscount)
router.patch('/update', [authenticateUser, authorizePermission('admin')], updateDiscount) 
// router.delete('/', [authenticateUser, authorizePermission('admin')], deleteDiscount)
router.get('/', getAllDiscount) 
router.get('/myDiscount',authenticateUser, getUserDiscount)
router.get('/:discountId', getDetailDiscount )
router.post('/save',authenticateUser, saveDiscount)

module.exports = router