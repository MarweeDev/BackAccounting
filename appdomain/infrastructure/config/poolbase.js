const { Sequelize } = require('sequelize');
const config = require('./config.json');

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || envConfig.database,
  process.env.POSTGRES_USER || process.env.POSTGRES_USER_DEV || envConfig.username,
  process.env.POSTGRES_PASSWORD || process.env.POSTGRES_PASSWORD_DEV || envConfig.password,
  {
    host: process.env.DB_HOST || envConfig.host,
    port: Number(process.env.DB_PORT || envConfig.dbPort || 5432),
    dialect: envConfig.dialect
  }
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
