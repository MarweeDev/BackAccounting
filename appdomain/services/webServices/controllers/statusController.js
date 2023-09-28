const jwt = require('jsonwebtoken');
const Status = require('../../../infrastructure/models/statusDTO');
const config = require('../../../infrastructure/config/config.json');
const statusRepository = require('../repository/statusRepository');

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

const statusRepository_ = new statusRepository();

const statusController = {
  
  getStatus: async (req, res) => {
    try {
      const status = await Status.findAll({where: {estado : "S"}});
      res.json({ status });
    } catch (error) {
      console.error('Error al obtener estado:', error);
      res.status(500).json({ message: 'Error al obtener estado' });
    }
  },

  postStatus: async (req, res) => {
    const { nombre, descripcion, codigogrupo, estado } = req.body;

    try {
      const existing = await Status.findOne({ where: { nombre, codigogrupo } });
      if (existing) {
        return res.status(400).json({ message: 'El estado ya existe' });
      }

      const newStatus = await Status.create({
        nombre,
        descripcion,
        codigogrupo,
        estado
      });

      res.json({ message: 'Estado registrado exitosamente', status: newStatus });
    } catch (error) {
      console.error('Error al registrar estado:', error);
      res.status(500).json({ message: 'Error al registrar estado' });
    }
  },

  updateStatus: async (req, res) => {
    const Id = req.params.id;
    const { nombre, descripcion, codigogrupo, estado } = req.body;

    try {
      const status = await Status.findOne({ where: { id: Id } });

      if (!status) {
        return res.status(404).json({ message: 'Estado no encontrado' });
      }

      await Status.update(
        {
          nombre,
          descripcion,
          codigogrupo,
          estado
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Estado actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      res.status(500).json({ message: 'Error al actualizar estado' });
    }
  },

  deleteStatus: async (req, res) => {
    const Id = req.params.id;
    const newEstado = req.body.estado;

    try {
      const status = await Status.findOne({ where: { id: Id } });

      if (!status) {
        return res.status(404).json({ message: 'Estado no encontrado' });
      }

      await Status.update(
        {
          estado: newEstado
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Estado actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      res.status(500).json({ message: 'Error al actualizar estado' });
    }
  }
};

module.exports = {
    statusController
};