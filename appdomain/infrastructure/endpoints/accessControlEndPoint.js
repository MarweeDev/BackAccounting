const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/accessControlController');
const { authenticateToken } = require('../middlewares/authMiddleware');

EndPoint.get('/access-control/summary', authenticateToken, Controller.accessControlController.summary);
EndPoint.get('/access-control/catalogs', authenticateToken, Controller.accessControlController.catalogs);

EndPoint.get('/access-control/subscribers/get', authenticateToken, Controller.accessControlController.getSubscribers);
EndPoint.post('/access-control/subscribers/post', authenticateToken, Controller.accessControlController.postSubscriber);
EndPoint.put('/access-control/subscribers/put/:id', authenticateToken, Controller.accessControlController.updateSubscriber);
EndPoint.put('/access-control/subscribers/delete/:id', authenticateToken, Controller.accessControlController.deleteSubscriber);

EndPoint.get('/access-control/users/get', authenticateToken, Controller.accessControlController.getUsers);
EndPoint.post('/access-control/users/post', authenticateToken, Controller.accessControlController.postUser);
EndPoint.put('/access-control/users/put/:id', authenticateToken, Controller.accessControlController.updateUser);
EndPoint.put('/access-control/users/delete/:id', authenticateToken, Controller.accessControlController.deleteUser);

EndPoint.put('/access-control/roles/:id/modules', authenticateToken, Controller.accessControlController.updateRoleModules);

module.exports = EndPoint;
