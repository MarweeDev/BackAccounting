const jwt = require('jsonwebtoken');
const Role = require('../../../infrastructure/models/roleDTO');
const config = require('../../../infrastructure/config/config.json');
const roleRepository = require('../repository/roleRepository');

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

const roleRepository_ = new roleRepository();

const roleController = {
  
  getRole: async (req, res) => {
    try {
      const role = await Role.findAll({where: {id_estado : 1}});
      res.json({ role });
    } catch (error) {
      console.error('Error al obtener rol:', error);
      res.status(500).json({ message: 'Error al obtener rol' });
    }
  },

  postRole: async (req, res) => {
    const { rol, descripcion } = req.body;

    try {
      const existing = await Role.findOne({ where: { rol } });
      if (existing) {
        return res.status(400).json({ message: 'El rol ya existe' });
      }

      const newRole = await Role.create({
        rol,
        descripcion,
        id_estado : 1
      });

      res.json({ message: 'Rol registrado exitosamente', status: newRole });
    } catch (error) {
      console.error('Error al registrar rol:', error);
      res.status(500).json({ message: 'Error al registrar rol' });
    }
  },

  updateRole: async (req, res) => {
    const Id = req.params.id;
    const { rol, descripcion } = req.body;

    try {
      const role = await Role.findOne({ where: { id: Id } });

      if (!role) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }

      await Role.update(
        {
          rol,
          descripcion
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Rol actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      res.status(500).json({ message: 'Error al actualizar rol' });
    }
  },

  deleteRole: async (req, res) => {
    const Id = req.params.id;
    const newRole = req.body.id_estado;

    try {
      const role = await Role.findOne({ where: { id: Id } });

      if (!role) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }

      await Role.update(
        {
          newRole: newRole
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Rol actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      res.status(500).json({ message: 'Error al actualizar rol' });
    }
  }
};

module.exports = {
    roleController
};