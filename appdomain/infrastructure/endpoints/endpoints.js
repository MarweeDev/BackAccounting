//source
const authRoutes = require('./authEndPoint');
const usersRoutes = require('./usersEndPoint');
const collaboratorRoutes = require('./collaboratorEndPoint');
const moduleRoutes = require('./moduleEndPoint');
const componentRoutes = require('./componentEndPoint');
const mesaRoutes = require('./mesaEndPoint');
const productRoutes = require('./productEndPoint');
const orderRoutes = require('./orderEndPoint');
const clientRoutes = require('./clientEndPoint');
const shoppingRoutes = require('./shoppingEndPoint');
const supplierRoutes = require('./supplierEndPoint');
const stockRoutes = require('./stockEndPoint');
const settingParameterRoutes = require('./settingParameterEndPoint');
const developmentResourceRoutes = require('./developmentResourceEndPoint');
const componentPermissionRoutes = require('./componentPermissionEndPoint');
const accessControlRoutes = require('./accessControlEndPoint');
const peripheralRoutes = require('./peripheralEndPoint');
const paymentMethodRoutes = require('./paymentMethodEndPoint');

//shared
const statusRoutes = require('./statusEndPoint');
const roleRoutes = require('./roleEndPoint');
const categoryRoutes = require('./productCategoryEndPoint');
const typepayRoutes = require('./typePayEndPoint');

module.exports = {
  auth: authRoutes,
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
  client: clientRoutes,
  shopping: shoppingRoutes,
  supplier: supplierRoutes,
  stock: stockRoutes,
  settingParameter: settingParameterRoutes,
  developmentResource: developmentResourceRoutes,
  componentPermission: componentPermissionRoutes,
  accessControl: accessControlRoutes,
  peripheral: peripheralRoutes,
  paymentMethod: paymentMethodRoutes
};
