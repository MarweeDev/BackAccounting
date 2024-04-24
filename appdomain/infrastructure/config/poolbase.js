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

async function runRawQuery(sqlQuery, params) {
  try {
    const result = await sequelize.query(sqlQuery, 
      { 
        replacements: params, 
        type: Sequelize.QueryTypes.SELECT 
      });
    return result;
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error;
  }
}

module.exports = runRawQuery;