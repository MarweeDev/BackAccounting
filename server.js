//Importación
require('dotenv').config();
const express = require('express');
const app = express();

// Middlewares
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Endpoints
const endpointsRoutes = require('./appdomain/infrastructure/endpoints/endpoints');
app.use("/appdomain/api/", endpointsRoutes.users);

// Sincronizar la base de datos y arrancar el servidor
const sequelize = require('./appdomain/infrastructure/config/db');
const configSettings = require('./appdomain/infrastructure/config/config.json');
const envConfig = configSettings[process.env.NODE_ENV || 'development'];

sequelize.sync().then(() => {
  app.listen(envConfig.port, () => {
    console.log(`Server en el puerto: ${envConfig.port}`);
  });
});
