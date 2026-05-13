const DevelopmentResource = require('../../../infrastructure/models/source/developmentResourceDTO');
const utilitys = require('../../../utility/utilitys');

const utilitys_ = new utilitys();

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : value;
}

const developmentResourceController = {
  get: async (req, res) => {
    try {
      const result = await DevelopmentResource.findAll({
        where: { id_estado: 1 },
        order: [['fecha_creacion', 'DESC'], ['id', 'DESC']]
      });

      res.json({ result });
    } catch (error) {
      console.error('Error al obtener recursos:', error);
      res.status(500).json({ message: 'Error al obtener recursos' });
    }
  },

  post: async (req, res) => {
    const titulo = normalizeText(req.body.titulo);
    const descripcion = req.body.descripcion;
    const tipo_recurso = normalizeText(req.body.tipo_recurso);
    const ruta = normalizeText(req.body.ruta);
    const version = normalizeText(req.body.version);
    const id_modulo = req.body.id_modulo || null;
    const visible = req.body.visible === undefined ? true : Boolean(req.body.visible);

    try {
      if (!titulo || !tipo_recurso) {
        return res.status(400).json({ message: 'Titulo y tipo de recurso son obligatorios' });
      }

      const result = await DevelopmentResource.create({
        titulo,
        descripcion,
        tipo_recurso,
        ruta,
        version,
        id_modulo,
        visible,
        id_estado: 1,
        fecha_creacion: utilitys_.getCurrentTimestamp()
      });

      res.json({ message: 'Recurso registrado exitosamente', result });
    } catch (error) {
      console.error('Error al registrar recurso:', error);
      res.status(500).json({ message: 'Error al registrar recurso' });
    }
  },

  update: async (req, res) => {
    const Id = req.params.id;
    const titulo = normalizeText(req.body.titulo);
    const descripcion = req.body.descripcion;
    const tipo_recurso = normalizeText(req.body.tipo_recurso);
    const ruta = normalizeText(req.body.ruta);
    const version = normalizeText(req.body.version);
    const id_modulo = req.body.id_modulo || null;
    const visible = req.body.visible === undefined ? true : Boolean(req.body.visible);

    try {
      const resource = await DevelopmentResource.findOne({ where: { id: Id } });

      if (!resource) {
        return res.status(404).json({ message: 'Recurso no encontrado' });
      }

      await DevelopmentResource.update(
        { titulo, descripcion, tipo_recurso, ruta, version, id_modulo, visible, fecha_actualizacion: utilitys_.getCurrentTimestamp() },
        { where: { id: Id } }
      );

      const result = await DevelopmentResource.findOne({ where: { id: Id } });
      res.json({ message: 'Recurso actualizado exitosamente', result });
    } catch (error) {
      console.error('Error al actualizar recurso:', error);
      res.status(500).json({ message: 'Error al actualizar recurso' });
    }
  },

  delete: async (req, res) => {
    const Id = req.params.id;

    try {
      const resource = await DevelopmentResource.findOne({ where: { id: Id } });

      if (!resource) {
        return res.status(404).json({ message: 'Recurso no encontrado' });
      }

      await DevelopmentResource.update(
        { id_estado: 2, fecha_actualizacion: utilitys_.getCurrentTimestamp() },
        { where: { id: Id } }
      );

      res.json({ message: 'Recurso deshabilitado exitosamente' });
    } catch (error) {
      console.error('Error al deshabilitar recurso:', error);
      res.status(500).json({ message: 'Error al deshabilitar recurso' });
    }
  }
};

module.exports = {
  developmentResourceController
};
