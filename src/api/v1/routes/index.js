const authRouter = require('./auth.routes')
const userRouter = require('./user.routes')
const productRouter = require('./product.routes')
const addressRouter = require('./address.routes')
const cartRouter = require('./cart.routes')
const orderRouter = require('./order.routes')
const discountRouter = require('./discount.routes')
const adminRouter = require('./admin.routes')

module.exports = {
    authRouter,
    userRouter,
    productRouter,
    addressRouter,
    cartRouter,
    orderRouter,
    discountRouter,
    adminRouter
}