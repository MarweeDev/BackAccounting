const ComponentPermission = require('../../../infrastructure/models/relation/componentPermissionDTO');
const utilitys = require('../../../utility/utilitys');
const { auditEvent } = require('./auditService');

const utilitys_ = new utilitys();

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : value;
}

const componentPermissionController = {
  get: async (req, res) => {
    try {
      const result = await ComponentPermission.findAll({
        where: { id_estado: 1 },
        order: [['id_modulo', 'ASC'], ['id_rol', 'ASC'], ['accion', 'ASC']]
      });

      res.json({ result });
    } catch (error) {
      console.error('Error al obtener permisos:', error);
      res.status(500).json({ message: 'Error al obtener permisos' });
    }
  },

  post: async (req, res) => {
    const { id_rol, id_modulo } = req.body;
    const id_componente = req.body.id_componente || null;
    const accion = normalizeText(req.body.accion);
    const permitido = req.body.permitido === undefined ? true : Boolean(req.body.permitido);

    try {
      if (!id_rol || !id_modulo || !accion) {
        return res.status(400).json({ message: 'Rol, modulo y accion son obligatorios' });
      }

      const fecha = utilitys_.getCurrentTimestamp();
      const existing = await ComponentPermission.findOne({ where: { id_rol, id_modulo, id_componente, accion } });

      if (existing) {
        if (existing.id_estado === 1) {
          return res.status(400).json({ message: 'El permiso ya existe' });
        }

        await ComponentPermission.update(
          { permitido, id_estado: 1, fecha_actualizacion: fecha },
          { where: { id: existing.id } }
        );

        const result = await ComponentPermission.findOne({ where: { id: existing.id } });
        await auditEvent(req, {
          modulo: 'Control de Acceso',
          entidad: 'permiso_componente',
          id_entidad: existing.id,
          accion: 'reactivar',
          descripcion: 'Permiso de componente reactivado',
          valor_anterior: existing,
          valor_nuevo: result
        });

        return res.json({ message: 'Permiso reactivado exitosamente', result });
      }

      const result = await ComponentPermission.create({
        id_rol,
        id_modulo,
        id_componente,
        accion,
        permitido,
        id_estado: 1,
        fecha_creacion: fecha
      });

      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'permiso_componente',
        id_entidad: result.id,
        accion: 'crear',
        descripcion: 'Permiso de componente registrado',
        valor_nuevo: result
      });

      res.json({ message: 'Permiso registrado exitosamente', result });
    } catch (error) {
      console.error('Error al registrar permiso:', error);
      res.status(500).json({ message: 'Error al registrar permiso' });
    }
  },

  update: async (req, res) => {
    const Id = req.params.id;
    const { id_rol, id_modulo } = req.body;
    const id_componente = req.body.id_componente || null;
    const accion = normalizeText(req.body.accion);
    const permitido = req.body.permitido === undefined ? true : Boolean(req.body.permitido);

    try {
      const permission = await ComponentPermission.findOne({ where: { id: Id } });

      if (!permission) {
        return res.status(404).json({ message: 'Permiso no encontrado' });
      }

      await ComponentPermission.update(
        { id_rol, id_modulo, id_componente, accion, permitido, fecha_actualizacion: utilitys_.getCurrentTimestamp() },
        { where: { id: Id } }
      );

      const result = await ComponentPermission.findOne({ where: { id: Id } });
      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'permiso_componente',
        id_entidad: Id,
        accion: 'actualizar',
        descripcion: 'Permiso de componente actualizado',
        valor_anterior: permission,
        valor_nuevo: result
      });

      res.json({ message: 'Permiso actualizado exitosamente', result });
    } catch (error) {
      console.error('Error al actualizar permiso:', error);
      res.status(500).json({ message: 'Error al actualizar permiso' });
    }
  },

  delete: async (req, res) => {
    const Id = req.params.id;

    try {
      const permission = await ComponentPermission.findOne({ where: { id: Id } });

      if (!permission) {
        return res.status(404).json({ message: 'Permiso no encontrado' });
      }

      await ComponentPermission.update(
        { id_estado: 2, fecha_actualizacion: utilitys_.getCurrentTimestamp() },
        { where: { id: Id } }
      );

      const result = await ComponentPermission.findOne({ where: { id: Id } });
      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'permiso_componente',
        id_entidad: Id,
        accion: 'deshabilitar',
        descripcion: 'Permiso de componente deshabilitado',
        valor_anterior: permission,
        valor_nuevo: result
      });

      res.json({ message: 'Permiso deshabilitado exitosamente' });
    } catch (error) {
      console.error('Error al deshabilitar permiso:', error);
      res.status(500).json({ message: 'Error al deshabilitar permiso' });
    }
  }
};

module.exports = {
  componentPermissionController
};
