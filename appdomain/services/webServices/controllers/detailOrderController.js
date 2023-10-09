const ModelDTO = require('../../../infrastructure/models/source/detailOrderDTO');

const orderController = {
  
    //esta consulta se debe realziar desde un query ya que debemos hacer un inner con la tabla orden
  getById: async (req, res) => {
    const Id = req.params.id;

    try {
      const result = await ModelDTO.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'Detalle Orden no encontrado' });
      }

      res.json({ result });
    } catch (error) {
      console.error('Error al obtener detalle orden por ID:', error);
      res.status(500).json({ message: 'Error al obtener detalle orden por ID' });
    }
  },

  post: async (req, res) => {
    const { id, id_usuario } = req.body;

    try {
    const existing = await ModelDTO.findOne({ where: { id_mesa, id_estadoorden : 7 } });
      if (existing) {
        return res.status(400).json({ message: 'Orden ya existe' });
      }

      const fecha = utilitys_.getCurrentTimestamp();
      const codigo = utilitys_.getGenerateCodeOrder(await ModelDTO.findAndCountAll().count);
      const result = await ModelDTO.create({
        codigo : codigo,
        id_mesa,
        id_usuario,
        fecha : fecha,
        id_estadoorden : 7
      });

      res.json({ message: 'Orden registrado exitosamente', status: result });
    } catch (error) {
      console.error('Error al registrar orden:', error);
      res.status(500).json({ message: 'Error al registrar orden' });
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