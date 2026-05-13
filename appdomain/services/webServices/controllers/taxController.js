const Tax = require('../../../infrastructure/models/source/taxDTO');
const utilitys = require('../../../utility/utilitys');
const { getTenantId } = require('./tenantHelper');

const utilitys_ = new utilitys();

function toResponse(row) {
  return {
    id: row.id,
    name: row.nombre,
    percentage: Number(row.porcentaje || 0),
    module_scope: row.modulo_aplica,
    visible_modules: row.modulos_visibles || [],
    id_estado: row.id_estado
  };
}

const taxController = {
  get: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);
      const where = { id_estado: 1 };
      if (id_suscrito) where.id_suscrito = id_suscrito;

      let rows = await Tax.findAll({ where, order: [['nombre', 'ASC']] });
      if (rows.length === 0 && id_suscrito) {
        const fecha = utilitys_.getCurrentTimestamp();
        await Tax.bulkCreate([
          { nombre: 'IVA', porcentaje: 19, modulo_aplica: 'both', modulos_visibles: ['sales', 'shopping'], id_suscrito, id_estado: 1, fecha_creacion: fecha },
          { nombre: 'Recargo servicio', porcentaje: 10, modulo_aplica: 'sales', modulos_visibles: ['sales'], id_suscrito, id_estado: 1, fecha_creacion: fecha }
        ]);
        rows = await Tax.findAll({ where, order: [['nombre', 'ASC']] });
      }

      res.json({ result: rows.map(toResponse) });
    } catch (error) {
      console.error('Error al obtener impuestos:', error);
      res.status(500).json({ message: 'Error al obtener impuestos' });
    }
  },

  post: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);
      const name = `${req.body.name || req.body.nombre || ''}`.trim();
      const percentage = Number(req.body.percentage ?? req.body.porcentaje ?? 0);

      if (!name || Number.isNaN(percentage)) {
        return res.status(400).json({ message: 'Nombre y porcentaje son obligatorios' });
      }

      const result = await Tax.create({
        nombre: name,
        porcentaje: percentage,
        modulo_aplica: req.body.module_scope || req.body.modulo_aplica || 'both',
        modulos_visibles: req.body.visible_modules || req.body.modulos_visibles || [],
        id_suscrito,
        id_estado: 1,
        fecha_creacion: utilitys_.getCurrentTimestamp()
      });

      res.json({ message: 'Impuesto registrado exitosamente', result: toResponse(result) });
    } catch (error) {
      console.error('Error al registrar impuesto:', error);
      res.status(500).json({ message: 'Error al registrar impuesto' });
    }
  },

  update: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);
      const where = { id: req.params.id };
      if (id_suscrito) where.id_suscrito = id_suscrito;
      const tax = await Tax.findOne({ where });
      if (!tax) return res.status(404).json({ message: 'Impuesto no encontrado' });

      await Tax.update({
        nombre: req.body.name || req.body.nombre || tax.nombre,
        porcentaje: Number(req.body.percentage ?? req.body.porcentaje ?? tax.porcentaje),
        modulo_aplica: req.body.module_scope || req.body.modulo_aplica || tax.modulo_aplica,
        modulos_visibles: req.body.visible_modules || req.body.modulos_visibles || tax.modulos_visibles,
        id_estado: req.body.id_estado || tax.id_estado,
        fecha_actualizacion: utilitys_.getCurrentTimestamp()
      }, { where });

      const result = await Tax.findOne({ where });
      res.json({ message: 'Impuesto actualizado exitosamente', result: toResponse(result) });
    } catch (error) {
      console.error('Error al actualizar impuesto:', error);
      res.status(500).json({ message: 'Error al actualizar impuesto' });
    }
  },

  delete: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);
      const where = { id: req.params.id };
      if (id_suscrito) where.id_suscrito = id_suscrito;
      await Tax.update({ id_estado: 2, fecha_actualizacion: utilitys_.getCurrentTimestamp() }, { where });
      res.json({ message: 'Impuesto deshabilitado exitosamente' });
    } catch (error) {
      console.error('Error al deshabilitar impuesto:', error);
      res.status(500).json({ message: 'Error al deshabilitar impuesto' });
    }
  }
};

module.exports = { taxController };
