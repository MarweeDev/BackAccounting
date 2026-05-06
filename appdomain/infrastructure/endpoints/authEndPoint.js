const express = require('express');
const authEndPoint = express.Router();
const Controller = require('../../services/webServices/controllers/authController');

authEndPoint.post('/auth/login', Controller.authController.login);

module.exports = authEndPoint;
