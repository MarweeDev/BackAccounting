const Stock = require('../../../infrastructure/models/source/stockDTO');
const Product = require('../../../infrastructure/models/source/productDTO');
const Category = require('../../../infrastructure/models/shared/productCategoryDTO');

async function buildStockResponse(row) {
  const product = await Product.findOne({ where: { id: row.id_producto } });
  const category = product
    ? await Category.findOne({ where: { id: product.id_categoria } })
    : null;

  return {
    id: row.id,
    id_producto: row.id_producto,
    cantidad: row.cantidad,
    producto: product?.nombre,
    referencia: product?.referencia,
    id_categoria: product?.id_categoria,
    categoria: category?.nombre,
    precio: product?.precio,
    id_estado: product?.id_estado,
    image: product?.image
  };
}

async function changeProductStock(id_producto, quantityChange) {
  const productId = Number(id_producto);
  const change = Number(quantityChange || 0);

  if (!productId || Number.isNaN(change) || change === 0) {
    return null;
  }

  const stock = await Stock.findOne({ where: { id_producto: productId } });

  if (!stock) {
    return Stock.create({ id_producto: productId, cantidad: change });
  }

  const nextQuantity = Number(stock.cantidad || 0) + change;
  await Stock.update({ cantidad: nextQuantity }, { where: { id: stock.id } });
  return Stock.findOne({ where: { id: stock.id } });
}

async function setProductStock(id_producto, cantidad) {
  const productId = Number(id_producto);
  const quantity = Number(cantidad || 0);

  if (!productId || Number.isNaN(quantity)) {
    return null;
  }

  const stock = await Stock.findOne({ where: { id_producto: productId } });

  if (!stock) {
    return Stock.create({ id_producto: productId, cantidad: quantity });
  }

  await Stock.update({ cantidad: quantity }, { where: { id: stock.id } });
  return Stock.findOne({ where: { id: stock.id } });
}

const stockController = {
  
  getStock: async (req, res) => {
    try {
      const rows = await Stock.findAll({ order: [['id', 'DESC']] });
      const result = await Promise.all(rows.map(buildStockResponse));
      res.json({ result });
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

      const result = await buildStockResponse(stock);
      res.json({ result });
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

      const result = await buildStockResponse(stock);
      res.json({ message: 'Stock registrado exitosamente', result });
    } catch (error) {
      console.error('Error al registrar stock:', error);
      res.status(500).json({ message: 'Error al registrar stock' });
    }
  },

  updateStock: async (req, res) => {
    const Id = req.params.id;
    const { id_producto, cantidad } = req.body;

    try {
      const stock = await Stock.findOne({ where: { id: Id } });

      if (!stock) {
        return res.status(404).json({ message: 'Stock no encontrado' });
      }

      await Stock.update(
        {
          id_producto: id_producto || stock.id_producto,
          cantidad
        },
        { where: { id: Id } }
      );

      const updated = await Stock.findOne({ where: { id: Id } });
      const result = await buildStockResponse(updated);
      res.json({ message: 'Stock actualizado exitosamente', result });
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
  stockController,
  changeProductStock,
  setProductStock
};
