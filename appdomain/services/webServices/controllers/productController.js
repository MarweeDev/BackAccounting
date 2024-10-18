const Product = require('../../../infrastructure/models/source/productDTO');

const productController = {
  
  get: async (req, res) => {
    try {
      const product = await Product.findAll({where: {id_estado : 1}});
      res.json({ product });
    } catch (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).json({ message: 'Error al obtener producto' });
    }
  },

  getCateg: async (req, res) => {
    const IdCategory = req.params.id;
    try {
      const product = await Product.findAll({where: {id_categoria : IdCategory, id_estado : 1}});
      res.json({ product });
    } catch (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).json({ message: 'Error al obtener producto' });
    }
  },

  getById: async (req, res) => {
    const Id = req.params.id;

    try {
      const product = await Product.findOne({ where: { id: Id } });

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json({ product });
    } catch (error) {
      console.error('Error al obtener Producto por ID:', error);
      res.status(500).json({ message: 'Error al obtener Producto por ID' });
    }
  },

  post: async (req, res) => {
    const { nombre, descripcion, precio, id_categoria } = req.body;

    try {
    const existing = await Product.findOne({ where: { nombre, id_categoria } });
      if (existing) {
        return res.status(400).json({ message: 'El producto ya existe' });
      }

      const newProduct = await Product.create({
        nombre,
        descripcion,
        precio,
        id_categoria,
        id_estado : 1
      });

      res.json({ message: 'producto registrado exitosamente', status: newProduct });
    } catch (error) {
      console.error('Error al registrar producto:', error);
      res.status(500).json({ message: 'Error al registrar producto' });
    }
  },

  update: async (req, res) => {
    const Id = req.params.id;
    const { nombre, descripcion, precio, id_categoria } = req.body;

    try {
      const product = await Product.findOne({ where: { id: Id } });

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      await Product.update(
        {
            nombre,
            descripcion,
            precio,
            id_categoria
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ message: 'Error al actualizar producto' });
    }
  },

  updateStatus: async (req, res) => { //Descartar
    const Id = req.params.id;
    const { id_estado } = req.body;

    try {
      const product = await Product.findOne({ where: { id: Id } });

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      await Product.update(
        {
          id_estado
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ message: 'Error al actualizar producto' });
    }
  },

  delete: async (req, res) => {
    const Id = req.params.id;

    try {
      const product = await Product.findOne({ where: { id: Id } });

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      await Product.update(
        {
          id_estado: 2
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ message: 'Error al actualizar producto' });
    }
  }
};

module.exports = {
    productController
};