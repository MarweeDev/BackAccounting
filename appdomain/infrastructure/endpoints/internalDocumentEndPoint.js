const express = require('express');
const EndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/internalDocumentController');
const { authenticateToken } = require('../middlewares/authMiddleware');

EndPoint.post('/documents/internal/send-email', authenticateToken, Controller.internalDocumentController.sendEmail);

module.exports = EndPoint;
