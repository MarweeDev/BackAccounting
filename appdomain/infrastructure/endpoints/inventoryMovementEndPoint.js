const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/inventoryMovementController');
const { authenticateToken } = require('../middlewares/authMiddleware');

EndPoint.get('/inventory/movement/get', authenticateToken, Controller.inventoryMovementController.get);

module.exports = EndPoint;
