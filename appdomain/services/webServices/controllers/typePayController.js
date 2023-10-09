const ModelDTO = require('../../../infrastructure/models/shared/typePayDTO');

const typePayController = {
  
  get: async (req, res) => {
    try {
      const result = await ModelDTO.findAll({where: {id_estado : 1}});
      res.json({ result });
    } catch (error) {
      console.error('Error al obtener tipo de pago:', error);
      res.status(500).json({ message: 'Error al obtener tipo de pago' });
    }
  },

  post: async (req, res) => {
    const { nombre } = req.body;

    try {
    const existing = await ModelDTO.findOne({ where: { nombre } });
      if (existing) {
        return res.status(400).json({ message: 'El tipo pago ya existe' });
      }

      const result = await ModelDTO.create({
        nombre,
        id_estado : 1
      });

      res.json({ message: 'Tipo de pago registrado exitosamente', status: result });
    } catch (error) {
      console.error('Error al registrar Tipo de pago:', error);
      res.status(500).json({ message: 'Error al registrar Tipo de pago' });
    }
  },

  update: async (req, res) => {
    const Id = req.params.id;
    const { nombre } = req.body;

    try {
      const result = await ModelDTO.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'Tipo de pago no encontrado' });
      }

      await ModelDTO.update(
        {
          nombre
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Tipo de pago actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar Tipo de pago:', error);
      res.status(500).json({ message: 'Error al actualizar Tipo de pago' });
    }
  },

  delete: async (req, res) => {
    const Id = req.params.id;

    try {
      const result = await ModelDTO.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'Tipo de pago no encontrado' });
      }

      await ModelDTO.update(
        {
          id_estado: 2
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Tipo de pago actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar Tipo de pago:', error);
      res.status(500).json({ message: 'Error al actualizar Tipo de pago' });
    }
  }
};

module.exports = {
    typePayController
};