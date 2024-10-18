const ModelDTO = require('../../../infrastructure/models/source/componentDTO');

const componentController = {
  
    get: async (req, res) => {
        try {
          const result = await ModelDTO.findAll();
          res.json({ result });
        } catch (error) {
          console.error('Error al obtener componente:', error);
          res.status(500).json({ message: 'Error al obtener componente' });
        }
    },

    getById: async (req, res) => {
        const Id = req.params.id;

        try {
            const result = await ModelDTO.findOne({ where: { id: Id } });

            if (!result) {
            return res.status(404).json({ message: 'componente no encontrado' });
            }

            res.json({ result });
        } catch (error) {
            console.error('Error al obtener componente por ID:', error);
            res.status(500).json({ message: 'Error al obtener componente por ID' });
        }
    },

    post: async (req, res) => {
        const { nombre, descripcion, ruta, id_modulo } = req.body;

        try {
            const existing = await ModelDTO.findOne({ where: { nombre, id_modulo } });
            if (existing) {
            return res.status(400).json({ message: 'componente ya existe' });
            }

            const result = await ModelDTO.create({
            nombre,
            descripcion,
            ruta,
            id_modulo,
            id_estado : 1
            });

            res.json({ message: 'componente registrado exitosamente', status: result });
        } catch (error) {
            console.error('Error al registrar componente:', error);
            res.status(500).json({ message: 'Error al registrar componente' });
        }
    },

    update: async (req, res) => {
        const Id = req.params.id;
        const { nombre, descripcion, ruta, id_modulo } = req.body;

        try {
            const result = await ModelDTO.findOne({ where: { id: Id } });

            if (!result) {
            return res.status(404).json({ message: 'componente no encontrado' });
            }

            await ModelDTO.update(
            {
                nombre,
                descripcion,
                ruta,
                id_modulo
            },
            { where: { id: Id } }
            );

            res.json({ message: 'componente actualizado exitosamente' });
        } catch (error) {
            console.error('Error al actualizar componente', error);
            res.status(500).json({ message: 'Error al actualizar componente' });
        }
    },

    delete: async (req, res) => {
        const Id = req.params.id;

        try {
            const result = await ModelDTO.findOne({ where: { id: Id } });

            if (!result) {
            return res.status(404).json({ message: 'componente no encontrado' });
            }

            await ModelDTO.update(
            {
                id_estado: 2
            },
            { where: { id: Id } }
            );

            res.json({ message: 'componente actualizado exitosamente' });
        } catch (error) {
            console.error('Error al actualizar componente', error);
            res.status(500).json({ message: 'Error al actualizar componente' });
        }
    }
};

module.exports = {
    componentController
};