const Shopping = require('../../../infrastructure/models/source/shoppingDTO');
const DetailShopping = require('../../../infrastructure/models/source/detailShoppingDTO');
const Supplier = require('../../../infrastructure/models/source/supplierDTO');
const Product = require('../../../infrastructure/models/source/productDTO');
const utilitys = require('../../../utility/utilitys');
const utilitys_ = new utilitys();

async function buildShoppingResponse(shopping) {
  const provider = await Supplier.findOne({ where: { id: shopping.id_proveedor } });
  const details = await DetailShopping.findAll({ where: { id_compra: shopping.id } });

  const productIds = details.map(item => item.id_producto);
  const products = productIds.length > 0
    ? await Product.findAll({ where: { id: productIds } })
    : [];

  const items = details.map(detail => {
    const product = products.find(row => row.id === detail.id_producto);
    return {
      id: detail.id,
      id_producto: detail.id_producto,
      producto: product?.nombre,
      cantidad: detail.cantidad,
      valor_unitario: detail.valor_unitario,
      total: Number(detail.cantidad) * Number(detail.valor_unitario)
    };
  });

  return {
    id: shopping.id,
    codigo: shopping.codigo,
    total_compra: shopping.total_compra,
    id_proveedor: shopping.id_proveedor,
    proveedor: provider?.proveedor,
    nit: provider?.nit,
    id_estado: shopping.id_estado,
    fecha_creacion: shopping.fecha_creacion,
    items
  };
}

const shoppingController = {
  get: async (req, res) => {
    try {
      const rows = await Shopping.findAll({ order: [['id', 'DESC']] });
      const result = await Promise.all(rows.map(buildShoppingResponse));
      res.json({ result });
    } catch (error) {
      console.error('Error al obtener compras:', error);
      res.status(500).json({ message: 'Error al obtener compras' });
    }
  },

  getById: async (req, res) => {
    try {
      const shopping = await Shopping.findOne({ where: { id: req.params.id } });

      if (!shopping) {
        return res.status(404).json({ message: 'Compra no encontrada' });
      }

      const result = await buildShoppingResponse(shopping);
      res.json({ result });
    } catch (error) {
      console.error('Error al obtener compra:', error);
      res.status(500).json({ message: 'Error al obtener compra' });
    }
  },

  post: async (req, res) => {
    const { codigo, id_proveedor, items } = req.body;
    const detailItems = Array.isArray(items) ? items : [];

    try {
      if (!id_proveedor || detailItems.length === 0) {
        return res.status(400).json({ message: 'La compra debe tener proveedor y al menos un item' });
      }

      const fecha = utilitys_.getCurrentTimestamp();
      const total = detailItems.reduce((sum, item) => {
        return sum + (Number(item.cantidad || 0) * Number(item.valor_unitario || 0));
      }, 0);

      const shopping = await Shopping.create({
        codigo: codigo || `FC-${Date.now()}`,
        total_compra: total,
        id_proveedor,
        id_estado: 1,
        fecha_creacion: fecha
      });

      await Promise.all(detailItems.map(item => DetailShopping.create({
        id_compra: shopping.id,
        id_producto: item.id_producto,
        cantidad: item.cantidad,
        valor_unitario: item.valor_unitario,
        fecha_creacion: fecha
      })));

      const result = await buildShoppingResponse(shopping);
      res.json({ message: 'Compra registrada exitosamente', result });
    } catch (error) {
      console.error('Error al registrar compra:', error);
      res.status(500).json({ message: 'Error al registrar compra' });
    }
  },

  update: async (req, res) => {
    const { codigo, id_proveedor, items } = req.body;
    const detailItems = Array.isArray(items) ? items : [];

    try {
      const shopping = await Shopping.findOne({ where: { id: req.params.id } });

      if (!shopping) {
        return res.status(404).json({ message: 'Compra no encontrada' });
      }

      const total = detailItems.reduce((sum, item) => {
        return sum + (Number(item.cantidad || 0) * Number(item.valor_unitario || 0));
      }, 0);

      await Shopping.update(
        { codigo, id_proveedor, total_compra: total },
        { where: { id: req.params.id } }
      );

      await DetailShopping.destroy({ where: { id_compra: req.params.id } });
      await Promise.all(detailItems.map(item => DetailShopping.create({
        id_compra: req.params.id,
        id_producto: item.id_producto,
        cantidad: item.cantidad,
        valor_unitario: item.valor_unitario,
        fecha_creacion: utilitys_.getCurrentTimestamp()
      })));

      const updated = await Shopping.findOne({ where: { id: req.params.id } });
      const result = await buildShoppingResponse(updated);
      res.json({ message: 'Compra actualizada exitosamente', result });
    } catch (error) {
      console.error('Error al actualizar compra:', error);
      res.status(500).json({ message: 'Error al actualizar compra' });
    }
  },

  delete: async (req, res) => {
    try {
      const shopping = await Shopping.findOne({ where: { id: req.params.id } });

      if (!shopping) {
        return res.status(404).json({ message: 'Compra no encontrada' });
      }

      await Shopping.update({ id_estado: 2 }, { where: { id: req.params.id } });
      res.json({ message: 'Compra anulada exitosamente' });
    } catch (error) {
      console.error('Error al anular compra:', error);
      res.status(500).json({ message: 'Error al anular compra' });
    }
  }
};

module.exports = {
  shoppingController
};
