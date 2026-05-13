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
app.use(express.json());

//Endpoints
const endpointsRoutes = require('./appdomain/infrastructure/endpoints/endpoints');
app.use("/appdomain/api/", endpointsRoutes.auth);
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
app.use("/appdomain/api/", endpointsRoutes.client);
app.use("/appdomain/api/", endpointsRoutes.shopping);
app.use("/appdomain/api/", endpointsRoutes.supplier);
app.use("/appdomain/api/", endpointsRoutes.stock);
app.use("/appdomain/api/", endpointsRoutes.settingParameter);
app.use("/appdomain/api/", endpointsRoutes.developmentResource);
app.use("/appdomain/api/", endpointsRoutes.componentPermission);
app.use("/appdomain/api/", endpointsRoutes.accessControl);
app.use("/appdomain/api/", endpointsRoutes.peripheral);
app.use("/appdomain/api/", endpointsRoutes.paymentMethod);
app.use("/appdomain/api/", endpointsRoutes.tax);
app.use("/appdomain/api/", endpointsRoutes.inventoryMovement);
app.use("/appdomain/api/", endpointsRoutes.cashShift);
app.use("/appdomain/api/", endpointsRoutes.reports);
app.use("/appdomain/api/", endpointsRoutes.internalDocument);
// Endpoint para servir archivos estáticos (imágenes)
app.use('/uploads', express.static('uploads'));

const { errorHandler, notFoundHandler } = require('./appdomain/infrastructure/middlewares/errorMiddleware');
app.use(notFoundHandler);
app.use(errorHandler);

// Sincronizar la base de datos y arrancar el servidor
const sequelize = require('./appdomain/infrastructure/config/db');
const configSettings = require('./appdomain/infrastructure/config/config.json');
const envConfig = configSettings[process.env.NODE_ENV || 'development'];
const appPort = process.env.APP_PORT || envConfig.appPort || 3000;
sequelize.sync().then(() => {
  app.listen(appPort, () => {
    console.log(`Server en el puerto: ${appPort}`);
  });
});
