const Module = require('../../../infrastructure/models/source/moduleDTO');
const utilitys = require('../../../utility/utilitys');
const { auditEvent } = require('./auditService');

const utilitys_ = new utilitys();

const moduleController = {
  
  getModule: async (req, res) => {
    try {
      const module = await Module.findAll({where: {id_estado : 1}, order: [['position_module', 'ASC']]});
      res.json({ module });
    } catch (error) {
      console.error('Error al obtener modulo:', error);
      res.status(500).json({ message: 'Error al obtener modulo' });
    }
  },

  postModule: async (req, res) => {
    const { modulo, descripcion, ruta, icono, position_module } = req.body;

    try {
    const existing = await Module.findOne({ where: { modulo, ruta } });
      if (existing) {
        return res.status(400).json({ message: 'El modulo ya existe' });
      }

      const fecha = utilitys_.getCurrentTimestamp();
      const newModule = await Module.create({
        modulo,
        descripcion,
        ruta,
        icono: icono || 'fa-solid fa-cube',
        position_module: position_module || 99,
        id_estado : 1,
        fecha_creacion : fecha
      });

      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'modulo',
        id_entidad: newModule.id,
        accion: 'crear',
        descripcion: 'Modulo registrado desde Control de Acceso',
        valor_nuevo: newModule
      });

      res.json({ message: 'Modulo registrado exitosamente', status: newModule });
    } catch (error) {
      console.error('Error al registrar modulo:', error);
      res.status(500).json({ message: 'Error al registrar modulo' });
    }
  },

  updateModule: async (req, res) => {
    const Id = req.params.id;
    const { modulo, descripcion, ruta, icono, position_module } = req.body;

    try {
      const module = await Module.findOne({ where: { id: Id } });

      if (!module) {
        return res.status(404).json({ message: 'Modulo no encontrado' });
      }

      const fecha = utilitys_.getCurrentTimestamp();
      await Module.update(
        {
            modulo,
            descripcion,
            ruta,
            icono,
            position_module,
            fecha_actualizacion : fecha
        },
        { where: { id: Id } }
      );

      const result = await Module.findOne({ where: { id: Id } });
      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'modulo',
        id_entidad: Id,
        accion: 'actualizar',
        descripcion: 'Modulo actualizado desde Control de Acceso',
        valor_anterior: module,
        valor_nuevo: result
      });

      res.json({ message: 'Modulo actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar modulo:', error);
      res.status(500).json({ message: 'Error al actualizar modulo' });
    }
  },

  deleteModule: async (req, res) => {
    const Id = req.params.id;

    try {
      const module = await Module.findOne({ where: { id: Id } });

      if (!module) {
        return res.status(404).json({ message: 'Modulo no encontrado' });
      }

      await Module.update(
        {
          id_estado: 2,
          fecha_actualizacion: utilitys_.getCurrentTimestamp()
        },
        { where: { id: Id } }
      );

      const result = await Module.findOne({ where: { id: Id } });
      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'modulo',
        id_entidad: Id,
        accion: 'deshabilitar',
        descripcion: 'Modulo deshabilitado desde Control de Acceso',
        valor_anterior: module,
        valor_nuevo: result
      });

      res.json({ message: 'Modulo actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar modulo:', error);
      res.status(500).json({ message: 'Error al actualizar modulo' });
    }
  }
};

module.exports = {
    moduleController
};
