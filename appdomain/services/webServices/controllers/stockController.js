const Stock = require('../../../infrastructure/models/source/stockDTO');

const stockController = {
  
  getStock: async (req, res) => {
    try {
      const stock = await Stock.findAll({where: {id_estado : 1}});
      res.json({ stock });
    } catch (error) {
      console.error('Error al obtener stock:', error);
      res.status(500).json({ message: 'Error al obtener stock' });
    }
  },

  getStockById: async (req, res) => {
    const Id = req.params.id;

    try {
      const stock = await Stock.findOne({ where: { id: Id } });

      if (!stock) {
        return res.status(404).json({ message: 'Stock no encontrado' });
      }

      res.json({ stock });
    } catch (error) {
      console.error('Error al obtener stock por ID:', error);
      res.status(500).json({ message: 'Error al obtener stock por ID' });
    }
  },

  postStock: async (req, res) => {
    const { id_producto, cantidad } = req.body;

    try {
    const existing = await Stock.findOne({ where: { id_producto } });
      if (existing) {
        return res.status(400).json({ message: 'El stock ya existe' });
      }

      const stock = await Stock.create({
        id_producto,
        cantidad
      });

      res.json({ message: 'stock registrado exitosamente', status: stock });
    } catch (error) {
      console.error('Error al registrar stock:', error);
      res.status(500).json({ message: 'Error al registrar stock' });
    }
  },

  updateStock: async (req, res) => {
    const Id = req.params.id;
    const { cantidad } = req.body;

    try {
      const stock = await Stock.findOne({ where: { id: Id } });

      if (!stock) {
        return res.status(404).json({ message: 'Stock no encontrado' });
      }

      await Stock.update(
        {
            cantidad
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Stock actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar stock:', error);
      res.status(500).json({ message: 'Error al actualizar stock' });
    }
  },

  deleteStock: async (req, res) => {
    const Id = req.params.id;

    try {
      const stock = await Stock.findOne({ where: { id: Id } });

      if (!stock) {
        return res.status(404).json({ message: 'Stock no encontrado' });
      }

      await Stock.update(
        {
          cantidad: 0
        },
        { where: { id: Id } }
      );

      res.json({ message: 'Stock actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar stock:', error);
      res.status(500).json({ message: 'Error al actualizar stock' });
    }
  }
};

module.exports = {
    stockController
};