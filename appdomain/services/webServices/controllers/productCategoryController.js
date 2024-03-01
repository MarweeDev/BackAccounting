const Category = require('../../../infrastructure/models/shared/productCategoryDTO');

const productCategoryController = {
  
  get: async (req, res) => {
    try {
      const category = await Category.findAll({where: {id_estado : 1}});
      res.json({ category });
    } catch (error) {
      console.error('Error al obtener categoria:', error);
      res.status(500).json({ message: 'Error al obtener categoria' });
    }
  },

  getById: async (req, res) => {
    const Id = req.params.id;

    try {
      const category = await Category.findOne({ where: { id: Id } });

      if (!category) {
        return res.status(404).json({ message: 'category no encontrado' });
      }

      res.json({ product });
    } catch (error) {
      console.error('Error al obtener category por ID:', error);
      res.status(500).json({ message: 'Error al obtener category por ID' });
    }
  },

  post: async (req, res) => {
    const { nombre, descripcion } = req.body;

    try {
    const existing = await Category.findOne({ where: { nombre } });
      if (existing) {
        return res.status(400).json({ message: 'El categoria ya existe' });
      }

      const newCategory = await Category.create({
        nombre,
        descripcion,
        id_estado : 1
      });

      res.json({ message: 'Categoria registrado exitosamente', status: newCategory });
    } catch (error) {
      console.error('Error al registrar categoria:', error);
      res.status(500).json({ message: 'Error al registrar categoria' });
    }
  },

  update: async (req, res) => {
    const Id = req.params.id;
    const { nombre, descripcion } = req.body;

    try {
      const category = await Category.findOne({ where: { id: Id } });

      if (!category) {
        return res.status(404).json({ message: 'Categoria no encontrado' });
      }

      await Category.update(
        {
            nombre,
            descripcion
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Categoria actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar Categoria:', error);
      res.status(500).json({ message: 'Error al actualizar Categoria' });
    }
  },

  delete: async (req, res) => {
    const Id = req.params.id;

    try {
      const category = await Category.findOne({ where: { id: Id } });

      if (!category) {
        return res.status(404).json({ message: 'Categoria no encontrado' });
      }

      await Category.update(
        {
          id_estado: 2
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Categoria actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar Categoria:', error);
      res.status(500).json({ message: 'Error al actualizar Categoria' });
    }
  }
};

module.exports = {
  productCategoryController
};