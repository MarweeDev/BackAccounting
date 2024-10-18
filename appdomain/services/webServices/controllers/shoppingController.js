const ModelDTO = require('../../../infrastructure/models/source/shoppingDTO');
const ModelDTO = require('../../../infrastructure/models/source/shoppingDTO');
const runQuery = require('../../../infrastructure/config/poolbase');
const Constants = require('../../../infrastructure/resources/ConstantsQuery');
const utilitys = require('../../../utility/utilitys');
const utilitys_ = new utilitys();

const shoppingController = {
  
  get: async (req, res) => {
    try {
      const result = await ModelDTO.findAll({where: {id_estadoorden : 7}});
      res.json({ result });
    } catch (error) {
      console.error('Error al obtener orden de  compra:', error);
      res.status(500).json({ message: 'Error al obtener orden de  compra' });
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

  post: async (req, res) => {
    const { numero, nombre, capacidad } = req.body;

    try {
    const existing = await ModelDTO.findOne({ where: { numero, nombre } });
      if (existing) {
        return res.status(400).json({ message: 'El mesa ya existe' });
      }

      const result = await ModelDTO.create({
        numero,
        nombre,
        capacidad,
        estado_mesa : 4,
        id_estado : 7
      });

      res.json({ message: 'mesa registrado exitosamente', status: 200, response: result });
    } catch (error) {
      console.error('Error al registrar mesa:', error);
      res.status(500).json({ message: 'Error al registrar mesa' });
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
    shoppingController
};