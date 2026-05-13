const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/cashShiftController');
const { authenticateToken } = require('../middlewares/authMiddleware');

EndPoint.get('/cash/shift/current', authenticateToken, Controller.cashShiftController.current);
EndPoint.post('/cash/shift/open', authenticateToken, Controller.cashShiftController.open);
EndPoint.put('/cash/shift/close/:id', authenticateToken, Controller.cashShiftController.close);

module.exports = EndPoint;
