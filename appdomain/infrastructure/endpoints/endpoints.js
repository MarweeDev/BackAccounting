const usersRoutes = require('./usersEndPoint');
const collaboratorRoutes = require('./collaboratorEndPoint');
const statusRoutes = require('./statusEndPoint');

module.exports = {
  users: usersRoutes,
  collaborator: collaboratorRoutes,
  status: statusRoutes
};