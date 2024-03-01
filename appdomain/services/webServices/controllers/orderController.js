const ModelDTO = require('../../../infrastructure/models/source/orderDTO');
const utilitys = require('../../../utility/utilitys');
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

  getById: async (req, res) => {
    const Id = req.params.id;

    try {
      const result = await ModelDTO.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'Orden no encontrado' });
      }

      res.json({ result });
    } catch (error) {
      console.error('Error al obtener orden por ID:', error);
      res.status(500).json({ message: 'Error al obtener orden por ID' });
    }
  },

  getCodeOrder: async (req, res) =>{
    try {
      const existingOrders = await ModelDTO.findAll({
        attributes: ['codigo'],
        group: ['codigo']
      });
      let generateCodigo = utilitys_.getGenerateCodeOrder(existingOrders.length);

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

  /*post: async (req, res) => {
    const { codigo, id_mesa, id_usuario, id_tipopago, id_producto, cantidad } = req.body;

    try {
      const existing = await ModelDTO.findOne({ where: { id_mesa, id_estadoorden : 7 } });
      if (existing) {
        return res.status(400).json({ message: 'Orden ya existe' });
      }

      const fecha = utilitys_.getCurrentTimestamp();
      const result = await ModelDTO.create({
        codigo,
        id_mesa,
        id_usuario,
        fecha : fecha,
        id_estadoorden : 7,
        id_tipopago,
        id_producto,
        cantidad
      });

      res.json({ message: 'Orden registrado exitosamente', status: result });
    } catch (error) {
      console.error('Error al registrar orden:', error);
      res.status(500).json({ message: 'Error al registrar orden' });
    }
  },*/

  post: async (req, res) => {
    const ordersList = req.body; // Cambio para obtener la lista de órdenes

    try {
      // Verificar si alguna orden ya existe en la base de datos
      const existingOrders = await Promise.all(ordersList.map(async (order) => {
        const existing = await ModelDTO.findOne({ where: { id_mesa: order.id_mesa, id_estadoorden: 7 } });
        return existing;
      }));

      if (existingOrders.some(order => order)) {
        return res.status(400).json({ message: 'Al menos una orden ya existe' });
      }

      const fecha = utilitys_.getCurrentTimestamp();

      // Crear todas las órdenes en la lista
      const createdOrders = await Promise.all(ordersList.map(async (order) => {
        const result = await ModelDTO.create({
          codigo: order.codigo,
          id_mesa: order.id_mesa,
          id_usuario: order.id_usuario,
          fecha: fecha,
          id_estadoorden: order.id_estadoorden,
          id_tipopago: order.id_tipopago,
          id_producto: parseInt(order.id_producto),
          cantidad: order.cantidad
        });
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
    const Id = req.params.id;
    const { id_tipopago } = req.body;

    try {
      const result = await ModelDTO.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'Orden no encontrado' });
      }

      await ModelDTO.update(
        {
            id_tipopago
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Orden actualizado exitosamente' });
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