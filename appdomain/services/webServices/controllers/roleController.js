const jwt = require('jsonwebtoken');
const Role = require('../../../infrastructure/models/shared/roleDTO');
const config = require('../../../infrastructure/config/config.json');
const { auditEvent } = require('./auditService');

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

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

      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'rol',
        id_entidad: newRole.id,
        accion: 'crear',
        descripcion: 'Rol registrado desde Control de Acceso',
        valor_nuevo: newRole
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

      const result = await Role.findOne({ where: { id: Id } });
      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'rol',
        id_entidad: Id,
        accion: 'actualizar',
        descripcion: 'Rol actualizado desde Control de Acceso',
        valor_anterior: role,
        valor_nuevo: result
      });

      res.json({ message: 'Rol actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      res.status(500).json({ message: 'Error al actualizar rol' });
    }
  },

  deleteRole: async (req, res) => {
    const Id = req.params.id;

    try {
      const role = await Role.findOne({ where: { id: Id } });

      if (!role) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }

      await Role.update(
        {
          id_estado: 2
        },
        { where: { id: Id } }
      );

      const result = await Role.findOne({ where: { id: Id } });
      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'rol',
        id_entidad: Id,
        accion: 'deshabilitar',
        descripcion: 'Rol deshabilitado desde Control de Acceso',
        valor_anterior: role,
        valor_nuevo: result
      });

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
