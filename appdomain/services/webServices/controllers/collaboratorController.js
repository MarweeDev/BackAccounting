const jwt = require('jsonwebtoken');
const Collaborator = require('../../../infrastructure/models/source/collaboratorDTO');
const config = require('../../../infrastructure/config/config.json');
const utilitys = require('../../../utility/utilitys');

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];

const utilitys_ = new utilitys();

const collaboratorController = {
  
  getCollaborator: async (req, res) => {
    try {
      const collaborators = await Collaborator.findAll();
      res.json({ collaborators });
    } catch (error) {
      console.error('Error al obtener colaborador:', error);
      res.status(500).json({ message: 'Error al obtener colaborador' });
    }
  },

  getCollaboratorById: async (req, res) => {
    const collaboratorId = req.params.id;

    try {
      const collaborator = await Collaborator.findOne({ where: { id: collaboratorId } });

      if (!collaborator) {
        return res.status(404).json({ message: 'Colaborador no encontrado' });
      }

      res.json({ collaborator });
    } catch (error) {
      console.error('Error al obtener colaborador por ID:', error);
      res.status(500).json({ message: 'Error al obtener colaborador por ID' });
    }
  },

  postCollaborator: async (req, res) => {
    const { nombre, cargo, id_estado, cedula } = req.body;

    try {
      const existing = await Collaborator.findOne({ where: { cedula } });
      if (existing) {
        return res.status(400).json({ message: 'El colaborador ya existe' });
      }

      const fecha = utilitys_.getCurrentTimestamp();
      const newCollaborator = await Collaborator.create({
        nombre,
        cargo,
        id_estado,
        cedula,
        fecha_creacion : fecha
      });

      res.json({ message: 'Colaborador registrado exitosamente', collaborator: newCollaborator });
    } catch (error) {
      console.error('Error al registrar colaborador:', error);
      res.status(500).json({ message: 'Error al registrar colaborador' });
    }
  },

  updateCollaborator: async (req, res) => {
    const collaboratorId = req.params.id;
    const { nombre, cargo, id_estado, cedula } = req.body;

    try {
      const colaborador = await Collaborator.findOne({ where: { id: collaboratorId } });

      if (!colaborador) {
        return res.status(404).json({ message: 'Colaborador no encontrado' });
      }

      const fecha = utilitys_.getCurrentTimestamp();
      await Collaborator.update(
        {
          nombre,
          cargo,
          id_estado,
          cedula,
          fecha_actualizacion : fecha
        },
        { where: { id: collaboratorId } }
      );

      res.json({ message: 'Colaborador actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar colaborador:', error);
      res.status(500).json({ message: 'Error al actualizar colaborador' });
    }
  },

  deleteCollaborator: async (req, res) => {
    const collaboratorId = req.params.id;

    try {
      const collaborator = await Collaborator.findOne({ where: { id: collaboratorId } });

      if (!collaborator) {
        return res.status(404).json({ message: 'Colaborador no encontrado' });
      }

      await Collaborator.update(
        {
          id_estado: 2
        },
        { where: { id: collaboratorId } }
      );

      res.json({ message: 'Estado del colaborador actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar estado del colaborador:', error);
      res.status(500).json({ message: 'Error al actualizar estado del colaborador' });
    }
  }
};

module.exports = {
    collaboratorController
};