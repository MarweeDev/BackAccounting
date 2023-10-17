//source
const usersRoutes = require('./usersEndPoint');
const collaboratorRoutes = require('./collaboratorEndPoint');
const collaboratorRoutes = require('./collaboratorEndPoint');
const moduleRoutes = require('./moduleEndPoint');
const componentRoutes = require('./componentEndPoint');

//shared
const statusRoutes = require('./statusEndPoint');
const roleRoutes = require('./roleEndPoint');

module.exports = {
  users: usersRoutes,
  collaborator: collaboratorRoutes,
  status: statusRoutes,
  role: roleRoutes,
  module: moduleRoutes,
  component: componentRoutes
};