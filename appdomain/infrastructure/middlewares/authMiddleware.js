const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

function getJwtSecret() {
  return process.env.JWT_SECRET || envConfig.jwtSecret;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const jwtSecret = getJwtSecret();
  if (!jwtSecret || jwtSecret === 'change_me') {
    return res.status(500).json({ message: 'JWT_SECRET no esta configurado' });
  }

  try {
    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalido o expirado' });
  }
}

module.exports = {
  authenticateToken
};
