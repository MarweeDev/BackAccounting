const usersRoutes = require('./usersEndPoint');
const collaboratorRoutes = require('./collaboratorEndPoint');

module.exports = {
  users: usersRoutes,
  collaborator: collaboratorRoutes
};