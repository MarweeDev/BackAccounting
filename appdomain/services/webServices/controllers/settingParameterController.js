const SettingParameter = require('../../../infrastructure/models/source/settingParameterDTO');
const utilitys = require('../../../utility/utilitys');
const { getTenantId } = require('./tenantHelper');

const utilitys_ = new utilitys();

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : value;
}

const settingParameterController = {
  get: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);

      if (!id_suscrito) {
        return res.status(403).json({ message: 'No se pudo resolver el suscrito del usuario' });
      }

      const result = await SettingParameter.findAll({
        where: { id_suscrito, id_estado: 1 },
        order: [['grupo', 'ASC'], ['clave', 'ASC']]
      });

      res.json({ result });
    } catch (error) {
      console.error('Error al obtener parametros:', error);
      res.status(500).json({ message: 'Error al obtener parametros' });
    }
  },

  post: async (req, res) => {
    const grupo = normalizeText(req.body.grupo);
    const clave = normalizeText(req.body.clave);
    const valor = req.body.valor;
    const tipo_dato = normalizeText(req.body.tipo_dato) || 'texto';
    const descripcion = req.body.descripcion;

    try {
      const id_suscrito = await getTenantId(req);

      if (!id_suscrito) {
        return res.status(403).json({ message: 'No se pudo resolver el suscrito del usuario' });
      }

      if (!grupo || !clave) {
        return res.status(400).json({ message: 'Grupo y clave son obligatorios' });
      }

      const fecha = utilitys_.getCurrentTimestamp();
      const existing = await SettingParameter.findOne({ where: { id_suscrito, grupo, clave } });

      if (existing) {
        if (existing.id_estado === 1) {
          return res.status(400).json({ message: 'El parametro ya existe' });
        }

        await SettingParameter.update(
          { valor, tipo_dato, descripcion, id_estado: 1, fecha_actualizacion: fecha },
          { where: { id: existing.id } }
        );

        const result = await SettingParameter.findOne({ where: { id: existing.id } });
        return res.json({ message: 'Parametro reactivado exitosamente', result });
      }

      const result = await SettingParameter.create({
        id_suscrito,
        grupo,
        clave,
        valor,
        tipo_dato,
        descripcion,
        id_estado: 1,
        fecha_creacion: fecha
      });

      res.json({ message: 'Parametro registrado exitosamente', result });
    } catch (error) {
      console.error('Error al registrar parametro:', error);
      res.status(500).json({ message: 'Error al registrar parametro' });
    }
  },

  update: async (req, res) => {
    const Id = req.params.id;
    const grupo = normalizeText(req.body.grupo);
    const clave = normalizeText(req.body.clave);
    const { valor, descripcion } = req.body;
    const tipo_dato = normalizeText(req.body.tipo_dato) || 'texto';

    try {
      const id_suscrito = await getTenantId(req);

      if (!id_suscrito) {
        return res.status(403).json({ message: 'No se pudo resolver el suscrito del usuario' });
      }

      const parameter = await SettingParameter.findOne({ where: { id: Id, id_suscrito } });

      if (!parameter) {
        return res.status(404).json({ message: 'Parametro no encontrado' });
      }

      await SettingParameter.update(
        {
          grupo,
          clave,
          valor,
          tipo_dato,
          descripcion,
          fecha_actualizacion: utilitys_.getCurrentTimestamp()
        },
        { where: { id: Id, id_suscrito } }
      );

      const result = await SettingParameter.findOne({ where: { id: Id, id_suscrito } });
      res.json({ message: 'Parametro actualizado exitosamente', result });
    } catch (error) {
      console.error('Error al actualizar parametro:', error);
      res.status(500).json({ message: 'Error al actualizar parametro' });
    }
  },

  delete: async (req, res) => {
    const Id = req.params.id;

    try {
      const id_suscrito = await getTenantId(req);

      if (!id_suscrito) {
        return res.status(403).json({ message: 'No se pudo resolver el suscrito del usuario' });
      }

      const parameter = await SettingParameter.findOne({ where: { id: Id, id_suscrito } });

      if (!parameter) {
        return res.status(404).json({ message: 'Parametro no encontrado' });
      }

      await SettingParameter.update(
        { id_estado: 2, fecha_actualizacion: utilitys_.getCurrentTimestamp() },
        { where: { id: Id, id_suscrito } }
      );

      res.json({ message: 'Parametro deshabilitado exitosamente' });
    } catch (error) {
      console.error('Error al deshabilitar parametro:', error);
      res.status(500).json({ message: 'Error al deshabilitar parametro' });
    }
  }
};

module.exports = {
  settingParameterController
};
