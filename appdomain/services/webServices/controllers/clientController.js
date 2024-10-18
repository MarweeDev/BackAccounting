const ModelDTO = require('../../../infrastructure/models/source/clientDTO');

const clientController = {
  
  get: async (req, res) => {
    try {
      const result = await ModelDTO.findAll({where: {id_estado : 1}});
      res.json({ result });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ message: 'Error al obtener usuarios' });
    }
  },

  post: async (req, res) => {
    const { nombre, nit, correo } = req.body;

    try {
      const existing = await ModelDTO.findOne({ where: { nit : nit, id_estado : 1 } });
      console.log(existing);
      if (existing) {
        return res.status(400).json({ message: 'El cliente ya existe:' });
      }

      const client = await ModelDTO.create({
        nombre,
        nit,
        correo,
        id_estado : 1
      });

      res.json({ message: 'Cliente registrado exitosamente', obj: client });
    } catch (error) {
      console.error('Error al registrar cliente:', error);
      res.status(500).json({ message: 'Error al registrar cliente' });
    }
  },

  update: async (req, res) => {
    const Id = req.params.id;
    const { nombre, nit, correo } = req.body;

    try {
      const result = await ModelDTO.findOne({ where: { id: Id } });

      if (!result) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }

      await ModelDTO.update(
        {
          nombre,
          nit,
          correo
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Cliente actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar cliente' });
    }
  }
};

module.exports = {
  clientController
};