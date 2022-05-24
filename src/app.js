
const _handerError = require('./api/v1/helpers/handleError')
const createError = require('http-errors')
const { authRouter, userRouter, productRouter, addressRouter, cartRouter, orderRouter, discountRouter, adminRouter } = require('./api/v1/routes')

const route = (app) =>{
    app.use('/ecommerce/v1/user', userRouter)
    app.use('/ecommerce/v1/auth', authRouter)
    app.use('/ecommerce/v1/product', productRouter)
    app.use('/ecommerce/v1/address', addressRouter)
    app.use('/ecommerce/v1/cart', cartRouter)
    app.use('/ecommerce/v1/order', orderRouter)
    app.use('/ecommerce/v1/discount', discountRouter)
    app.use('/ecommerce/v1/admin', adminRouter)

    app.use(function(req, res, next) {
        next(createError(404));
    })
    app.use(_handerError)
    
}
   
module.exports = route