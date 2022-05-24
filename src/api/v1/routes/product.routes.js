const express = require('express')
const { getProduct, getFilterProduct, getDetailProduct, searchProduct, getCategoryProduct, getFilterCategory, rateProduct, createProduct, updateProduct } = require('../controllers/product.controller')
const { authorizePermission, authenticateUser } = require('../middlewares/authenticateUser')
const uploadImageMiddleware = require('../middlewares/uploadImage.middlewares')
const router = express.Router()
const multer = require('multer')
const upload= multer({
    limits: {
      fileSize: 4 * 1024 * 1024,
    }
  });

router.get('/search',searchProduct)
router.get('/filter',getFilterProduct)
router.get('/:categoryName',getCategoryProduct)
router.get('/filter/:categoryName',getFilterCategory)
router.get('/detail/:productId',getDetailProduct)
router.put('/rateProduct',rateProduct)

router.post('/create', [ 
    authenticateUser,authorizePermission('admin'),
    uploadImageMiddleware.uploadImages,
    uploadImageMiddleware.resizeImages
    ], createProduct)
router.patch('/update', [authenticateUser,authorizePermission('admin')], updateProduct)

router.get('',getProduct)

module.exports = router 