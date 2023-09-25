const { Sequelize } = require('sequelize');
const config = require('./config.json');

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

const sequelize = new Sequelize(
  envConfig.database,
  envConfig.username || process.env.POSTGRES_USER_DEV,
  envConfig.password || process.env.POSTGRES_PASSWORD_DEV,
  {
    host: envConfig.host,
    dialect: envConfig.dialect
  },
  envConfig.port,
  envConfig.jwtSecret || process.env.JWT_SECRET
);

module.exports = sequelize;