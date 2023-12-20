const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const ProductTypeRouter = require('./ProductTypeRouter')
const OrderRouter = require('./OrderRouter')

const routes = (app) => {
    app.use('/api/users', UserRouter)
    app.use('/api/products', ProductRouter)
    app.use('/api/productTypes', ProductTypeRouter)
    app.use('/api/orders', OrderRouter)
}
module.exports = routes;