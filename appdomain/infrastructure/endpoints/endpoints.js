//source
const usersRoutes = require('./usersEndPoint');
const collaboratorRoutes = require('./collaboratorEndPoint');
const moduleRoutes = require('./moduleEndPoint');
const componentRoutes = require('./componentEndPoint');
const mesaRoutes = require('./mesaEndPoint');
const productRoutes = require('./productEndPoint');
const orderRoutes = require('./orderEndPoint');
const clientRoutes = require('./clientEndPoint');

//shared
const statusRoutes = require('./statusEndPoint');
const roleRoutes = require('./roleEndPoint');
const categoryRoutes = require('./productCategoryEndPoint');
const typepayRoutes = require('./typePayEndPoint');

module.exports = {
  users: usersRoutes,
  collaborator: collaboratorRoutes,
  status: statusRoutes,
  role: roleRoutes,
  module: moduleRoutes,
  component: componentRoutes,
  mesa: mesaRoutes,
  product: productRoutes,
  category: categoryRoutes,
  order: orderRoutes,
  typepay: typepayRoutes,
  client: clientRoutes
};