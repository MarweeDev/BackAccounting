const usersRoutes = require('./usersEndPoint');
const collaboratorRoutes = require('./collaboratorEndPoint');
const statusRoutes = require('./statusEndPoint');
const roleRoutes = require('./roleEndPoint');

module.exports = {
  users: usersRoutes,
  collaborator: collaboratorRoutes,
  status: statusRoutes,
  role: roleRoutes
};