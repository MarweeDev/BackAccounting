//Importación
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');  // Importa el módulo cors

// Configuración de CORS (permite todas las solicitudes desde cualquier origen)
const corsOptions = {
  origin: 'http://localhost:4200',
};
app.use(cors(corsOptions));

// Middlewares
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Endpoints
const endpointsRoutes = require('./appdomain/infrastructure/endpoints/endpoints');
app.use("/appdomain/api/", endpointsRoutes.users);
app.use("/appdomain/api/", endpointsRoutes.collaborator);
app.use("/appdomain/api/", endpointsRoutes.status);
app.use("/appdomain/api/", endpointsRoutes.role);
app.use("/appdomain/api/", endpointsRoutes.module);
app.use("/appdomain/api/", endpointsRoutes.component);
app.use("/appdomain/api/", endpointsRoutes.mesa);
app.use("/appdomain/api/", endpointsRoutes.product);
app.use("/appdomain/api/", endpointsRoutes.category);
app.use("/appdomain/api/", endpointsRoutes.order);
app.use("/appdomain/api/", endpointsRoutes.typepay);

// Sincronizar la base de datos y arrancar el servidor
const sequelize = require('./appdomain/infrastructure/config/db');
const configSettings = require('./appdomain/infrastructure/config/config.json');
const envConfig = configSettings[process.env.NODE_ENV || 'development'];
sequelize.sync().then(() => {
  app.listen(envConfig.port, () => {
    console.log(`Server en el puerto: ${envConfig.port}`);
  });
});
