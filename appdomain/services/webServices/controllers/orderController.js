const path = require('path');
console.log('Directorio de trabajo actual:', __dirname);
console.log("path ruta:", path.join(__dirname, '../../infrastructure/models/source/orderDTO'))
console.log("path ruta:", '../../../infrastructure/models/source/orderDTO')
const ModelDTO = require(path.join(__dirname, '../../infrastructure/models/source/orderDTO'));
const ModelDetailDTO = require('../../infrastructure/models/source/DetailOrderDto');
const runQuery = require('../../infrastructure/config/poolbase');
const Constants = require('../../infrastructure/resources/ConstantsQuery');
const utilitys = require('../../utility/utilitys');
const utilitys_ = new utilitys();

const orderController = {
  
  get: async (req, res) => {
    try {
      const result = await ModelDTO.findAll({where: {id_estadoorden : 7}});
      res.json({ result });
    } catch (error) {
      console.error('Error al obtener orden:', error);
      res.status(500).json({ message: 'Error al obtener orden' });
    }
  },

  getAll: async (req, res) => {
    try {
      const rows = await runQuery(Constants.ServicesMethod.GetOrderAll);
      console.log('Rows result: ', rows)
      // Verificar si hay resultados
      if (rows.length == 0) {
        return res.status(400).json({ message: 'Todas están en uso por alguna orden activa' });
      }

      res.json({ result: rows });
    } catch (error) {
      console.error('Error al obtener orden:', error);
      res.status(500).json({ message: 'Error al obtener orden' });
    }
  },

  getFind: async (req, res) => {
    const { id_estadoorden, fecha_creacion } = req.query;

    try {
      const rows = await runQuery(Constants.ServicesMethod.GetOrderFind, [Number.parseInt(id_estadoorden), Number.parseInt(id_estadoorden), fecha_creacion]);
      console.log('Rows result: ', rows)
      // Verificar si hay resultados
      if (rows.length == 0) {
        return res.status(200).json({ message: 'No se encontro ninguna relación de orden' });
      }

      res.json({ result: rows });
    } catch (error) {
      console.error('Error al obtener orden por ID:', error);
      res.status(500).json({ message: 'Error al obtener orden por ID' });
    }
  },

  getById: async (req, res) => {
    const codigo = req.params.id;

    try {
      const rows = await runQuery(Constants.ServicesMethod.GetOrderID, [codigo.toString()]);
      console.log('Rows result: ', rows)
      // Verificar si hay resultados
      if (rows.length == 0) {
        return res.status(400).json({ message: 'No se encontro ninguna relación de orden' });
      }

      res.json({ result: rows });
    } catch (error) {
      console.error('Error al obtener orden por ID:', error);
      res.status(500).json({ message: 'Error al obtener orden por ID' });
    }
  },

  getFindExport: async (req, res) => {
    const { fecha_init, fecha_fin } = req.query;

    try {
      console.log('parameters: ', fecha_init,fecha_fin)
      const rows = await runQuery(Constants.ServicesMethod.GetOrderFindExport, [fecha_init, fecha_fin]);
      console.log('Rows result: ', rows)
      // Verificar si hay resultados
      if (rows.length == 0) {
        return res.status(200).json({ message: 'No se encontro ninguna relación de orden' });
      }

      res.json({ result: rows });
    } catch (error) {
      console.error('Error al obtener orden por ID:', error);
      res.status(500).json({ message: 'Error al obtener orden por ID' });
    }
  },

  getCodeOrder: async (req, res) =>{
    try {
      const existingOrders = await ModelDTO.findAll({
        attributes: ['codigo'],
        group: ['codigo'],
        logging: console.log
      });

      let generateCodigo = utilitys_.getGenerateCodeOrder("FA", existingOrders.length);

      const existing = await ModelDTO.findOne({ where: { codigo : generateCodigo } });
      if (existing) {
        return res.json({message: "Código orden", status: generateCodigo + "r"});
      }
      else {
        return res.json({message: "Código orden", status: generateCodigo});
      }
    } catch (error) {
      console.error('Error al obtener orden:', error);
      res.status(500).json({ message: 'Error al obtener orden', status : error });
    }
  },

  post: async (req, res) => {
    const ordersList = req.body; // Cambio para obtener la lista de órdenes

    try {
      // Verificar si alguna orden ya existe en la base de datos
      /*const existingOrders = await Promise.all(ordersList.map(async (order) => {
        if (order.id_mesa != 0) {
          const existing = await ModelDTO.findOne({ where: { id_mesa: order.id_mesa, id_estadoorden: 7 } });
          return existing;
        }
        else{
          const existing = await ModelDTO.findOne({ where: { id_mesa: order.id_mesa } });
          return existing;
        }
      }));

      if (existingOrders.some(order => order)) {
        return res.status(400).json({ message: 'Al menos una orden ya existe' });
      }*/

      const fecha = utilitys_.getCurrentTimestamp();

      const resultOrder = await ModelDTO.create({
        codigo: ordersList[0].codigo,
        id_usuario: ordersList[0].id_usuario,
        id_client: ordersList[0].id_client,
        id_tipopago: ordersList[0].id_tipopago,
        id_subtipopago: ordersList[0].id_subtipopago,
        fecha_creacion: fecha,
        id_estadoorden: ordersList[0].id_estadoorden
      });

      // Crear todas las órdenes en la lista
      const createdOrders = await Promise.all(ordersList.map(async (order) => {
        const result = await ModelDetailDTO.create(order.detalle);
        return result;
      }));

      res.json({ message: 'Órdenes registradas exitosamente', status: createdOrders });
    } catch (error) {
      console.error('Error al registrar órdenes:', error);
      res.status(500).json({ message: 'Error al registrar órdenes' });
    }
  },

  update: async (req, res) => {
    const Id = req.params.id;
    const { id_mesa } = req.body;

    try {
      const result = await ModelDTO.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'Orden no encontrado' });
      }

      await ModelDTO.update(
        {
            id_mesa
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Orden actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar orden', error);
      res.status(500).json({ message: 'Error al actualizar orden' });
    }
  },

  updatePay: async (req, res) => {
    const { codigo, id_tipopago, id_subtipopago } = req.body;

    try {
      // Validación de entrada
      if (!codigo || !id_tipopago || id_subtipopago === undefined) {
        return res.status(400).json({ message: 'Datos incompletos' });
      }

      const result = await ModelDTO.findOne({ where: { codigo: codigo } });

      if (!result) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }

      let status = 8; //Pagada
      if (id_tipopago == 5){
        status = 10; //Debiendo
      }
      if (id_tipopago == 1) {
        status = 9; //Cancelada
      }

      await ModelDTO.update(
        {
            id_tipopago : id_tipopago,
            id_subtipopago : id_subtipopago,
            id_estadoorden : status
        },
        { where: { codigo: codigo } }
      );

      res.json({ message: 'Orden actualizada en su estado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar orden', error);
      res.status(500).json({ message: 'Error al actualizar orden' });
    }
  },

  delete: async (req, res) => {
    const Id = req.params.id;

    try {
      const result = await ModelDTO.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'Orden no encontrado' });
      }

      await ModelDTO.update(
        {
          id_estado: 9
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Orden actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar orden', error);
      res.status(500).json({ message: 'Error al actualizar orden' });
    }
  }
};

module.exports = {
    orderController
};
