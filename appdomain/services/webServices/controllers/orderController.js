const ModelDTO = require('../../../infrastructure/models/source/orderDTO');
const ModelDetailDTO = require('../../../infrastructure/models/source/detailOrderDTO');
const Product = require('../../../infrastructure/models/source/productDTO');
const { changeProductStock } = require('./stockController');
const runQuery = require('../../../infrastructure/config/poolbase');
const Constants = require('../../../infrastructure/resources/ConstantsQuery');
const utilitys = require('../../../utility/utilitys');
const utilitys_ = new utilitys();

async function discountPaidOrderStock(codigo) {
  const details = await ModelDetailDTO.findAll({ where: { codigo_orden: codigo } });
  const negativeItems = [];

  await Promise.all(details.map(async detail => {
    const updatedStock = await changeProductStock(detail.id_producto, Number(detail.cantidad || 0) * -1);

    if (updatedStock && Number(updatedStock.cantidad) < 0) {
      const product = await Product.findOne({ where: { id: detail.id_producto } });
      negativeItems.push(product?.nombre || `Producto ${detail.id_producto}`);
    }
  }));

  return negativeItems;
}

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
      const rows = await runQuery(Constants.ServicesMethod.GetOrderFindExport, [fecha_init, fecha_fin]);
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
        group: ['codigo']
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

  updateNull: async (req, res) => {
    const { codigo, observacion } = req.body;

    try {
      const result = await ModelDTO.findOne({ where: { codigo: codigo } });

      if (!result) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }

      await ModelDTO.update(
        {
          observacion : observacion,
          id_estadoorden : 9
        },
        { where: { codigo: codigo } }
      );

      res.json({ message: 'Orden anulada exitosamente' });
    } catch (error) {
      console.error('Error al anular orden', error);
      res.status(500).json({ message: 'Error al anular orden' });
    }
  },

  update: async (req, res) => {
    const ordersList = req.body;

    try {
      const result = await ModelDTO.findOne({ where: { codigo: ordersList[0].codigo } });

      if (!result) {
        return res.status(404).json({ message: 'Orden no encontrado' });
      }

      // Actualizar la orden - solo el campo observacion por ahora
      await ModelDTO.update(
        {
          observacion : ordersList[0].observacion
        },
        { where: { codigo: ordersList[0].codigo } }
      );

      // Actualizar el detalle de la orden - solo el campo cantidad por ahora
      await Promise.all(ordersList.map(async (orderD) => {
        // Verificar si el producto ya existe en el detalle de la orden
        const existProduct = await ModelDetailDTO.findOne({
          where: 
            { 
              id_producto: orderD.detalle.id_producto, 
              codigo_orden: orderD.detalle.codigo_orden 
            }
        });

        // Si existe, actualizar la cantidad, si no, crear un nuevo registro
        if (existProduct) {
          // Actualizar la cantidad del producto existente
          await ModelDetailDTO.update(
          {
            cantidad: orderD.detalle.cantidad
          },
          { where: 
            { 
              id_producto: orderD.detalle.id_producto
            } 
          });
        }
        else {
          // Crear un nuevo registro en el detalle de la orden
          await ModelDetailDTO.create(orderD.detalle);
        }
        
      }));

      res.json({ message: 'Orden actualizada exitosamente'});
    } catch (error) {
      console.error('Error al actualizar orden', error);
      res.status(500).json({ message: 'Error al actualizar orden'});
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

      const shouldDiscountStock = Number(result.id_estadoorden) !== 8 && status === 8;
      const negativeItems = shouldDiscountStock
        ? await discountPaidOrderStock(codigo)
        : [];
      const stockObservation = negativeItems.length > 0
        ? `Stock insuficiente registrado para: ${[...new Set(negativeItems)].join(', ')}.`
        : '';
      const nextObservation = stockObservation
        ? [result.observacion, stockObservation].filter(Boolean).join(' ')
        : result.observacion;

      await ModelDTO.update(
        {
            id_tipopago : id_tipopago,
            id_subtipopago : id_subtipopago,
            id_estadoorden : status,
            observacion: nextObservation
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
