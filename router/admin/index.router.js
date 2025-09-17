const systemConfig = require('../../config/system');

const dashboardRouter = require('./dashboard.router');
const productRouter = require('./product.router');

module.exports = (app) => {

  const PATH_ADMIN = systemConfig.prefexAdmin;

  app.use(PATH_ADMIN + '/dashboard', dashboardRouter)
  app.use(PATH_ADMIN + '/products', productRouter)


}