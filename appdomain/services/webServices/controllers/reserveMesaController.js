const ModelDTO = require('../../../infrastructure/models/source/reserveMesaDTO');

const reserveController = {
  
  get: async (req, res) => {
    try {
      const result = await ModelDTO.findAll({where: {id_estado : 5}});
      res.json({ result });
    } catch (error) {
      console.error('Error al obtener reserva:', error);
      res.status(500).json({ message: 'Error al obtener reserva' });
    }
  },

  getById: async (req, res) => {
    const Id = req.params.id;

    try {
      const result = await ModelDTO.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'Reserva no encontrado' });
      }

      res.json({ result });
    } catch (error) {
      console.error('Error al obtener reserva por ID:', error);
      res.status(500).json({ message: 'Error al obtener reserva por ID' });
    }
  },

  post: async (req, res) => {
    const { id_mesa, fecha, hora, nombrecliente, contactocliente } = req.body;

    try {
    const existing = await ModelDTO.findOne({ where: { id_mesa, fecha, hora } });
      if (existing) {
        return res.status(400).json({ message: 'El reserva ya existe' });
      }

      const result = await ModelDTO.create({
        id_mesa,
        fecha,
        hora,
        nombrecliente,
        contactocliente,
        id_estado : 5
      });

      res.json({ message: 'reserva registrado exitosamente', status: result });
    } catch (error) {
      console.error('Error al registrar reserva:', error);
      res.status(500).json({ message: 'Error al registrar reserva' });
    }
  },

  update: async (req, res) => {
    const Id = req.params.id;
    const { id_mesa, fecha, hora, nombrecliente, contactocliente } = req.body;

    try {
      const result = await ModelDTO.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'Reserva no encontrado' });
      }

      await ModelDTO.update(
        {
          id_mesa,
          fecha,
          hora,
          nombrecliente,
          contactocliente
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Reserva actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar reserva:', error);
      res.status(500).json({ message: 'Error al actualizar reserva' });
    }
  },

  delete: async (req, res) => {
    const Id = req.params.id;

    try {
      const result = await ModelDTO.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'Reserva no encontrado' });
      }

      await ModelDTO.update(
        {
          id_estado: 9
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Reserva actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar Reserva:', error);
      res.status(500).json({ message: 'Error al actualizar Reserva' });
    }
  }
};

module.exports = {
    reserveController
};