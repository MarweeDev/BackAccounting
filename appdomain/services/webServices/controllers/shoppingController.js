const Shopping = require('../../../infrastructure/models/source/shoppingDTO');
const DetailShopping = require('../../../infrastructure/models/source/detailShoppingDTO');
const ShoppingItemTax = require('../../../infrastructure/models/source/shoppingItemTaxDTO');
const Supplier = require('../../../infrastructure/models/source/supplierDTO');
const Product = require('../../../infrastructure/models/source/productDTO');
const { changeProductStock } = require('./stockController');
const { getTenantId } = require('./tenantHelper');
const utilitys = require('../../../utility/utilitys');
const utilitys_ = new utilitys();

async function applyShoppingStock(items, direction = 1, options = {}) {
  await Promise.all(items.map(item => {
    if (Number(item.type || item.tipo || 1) !== 1) return Promise.resolve(null);
    const quantity = Number(item.cantidad || 0) * direction;
    return changeProductStock(item.id_producto, quantity, {
      ...options,
      movementType: direction > 0 ? 'purchase' : 'adjustment'
    });
  }));
}

function normalizeAppliedTaxes(item, base) {
  const taxes = Array.isArray(item.taxes || item.impuestos) ? (item.taxes || item.impuestos) : [];
  return taxes.map(tax => {
    const percentage = Number(tax.percentage ?? tax.porcentaje ?? 0);
    return {
      id_impuesto: tax.id_tax || tax.id_impuesto || tax.id || null,
      nombre: tax.name || tax.nombre || 'Impuesto',
      porcentaje: percentage,
      base,
      valor: Number(tax.value ?? tax.valor ?? ((base * percentage) / 100))
    };
  });
}

function getItemBase(item) {
  const quantity = Number(item.cantidad || 0);
  const unitValue = Number(item.valor_unitario || 0);
  const discount = Number(item.discount || item.descuento || 0);
  return Math.max((quantity * unitValue) - discount, 0);
}

function getItemTotal(item) {
  const base = getItemBase(item);
  return base + normalizeAppliedTaxes(item, base).reduce((sum, tax) => sum + Number(tax.valor || 0), 0);
}

async function buildShoppingResponse(shopping) {
  const provider = await Supplier.findOne({ where: { id: shopping.id_proveedor } });
  const details = await DetailShopping.findAll({ where: { id_compra: shopping.id } });

  const productIds = details.map(item => item.id_producto);
  const products = productIds.length > 0
    ? await Product.findAll({ where: { id: productIds } })
    : [];

  const taxes = details.length > 0
    ? await ShoppingItemTax.findAll({ where: { id_detallecompra: details.map(item => item.id) } })
    : [];

  const items = details.map(detail => {
    const product = products.find(row => row.id === detail.id_producto);
    const appliedTaxes = taxes
      .filter(tax => tax.id_detallecompra === detail.id)
      .map(tax => ({
        id_tax: tax.id_impuesto,
        name: tax.nombre,
        percentage: Number(tax.porcentaje || 0),
        base: Number(tax.base || 0),
        value: Number(tax.valor || 0)
      }));
    const base = Number(detail.cantidad) * Number(detail.valor_unitario);
    const taxTotal = appliedTaxes.reduce((sum, tax) => sum + tax.value, 0);
    return {
      id: detail.id,
      id_producto: detail.id_producto,
      producto: product?.nombre,
      cantidad: detail.cantidad,
      valor_unitario: detail.valor_unitario,
      subtotal: base,
      taxes: appliedTaxes,
      total_impuesto: taxTotal,
      total: base + taxTotal
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
      const id_suscrito = await getTenantId(req);
      const total = detailItems.reduce((sum, item) => sum + getItemTotal(item), 0);

      const shopping = await Shopping.create({
        codigo: codigo || `FC-${Date.now()}`,
        total_compra: total,
        id_proveedor,
        id_estado: 1,
        fecha_creacion: fecha
      });

      await Promise.all(detailItems.map(async item => {
        const detail = await DetailShopping.create({
          id_compra: shopping.id,
          id_producto: item.id_producto,
          cantidad: item.cantidad,
          valor_unitario: item.valor_unitario,
          fecha_creacion: fecha
        });
        const base = getItemBase(item);
        const taxes = normalizeAppliedTaxes(item, base);
        await Promise.all(taxes.map(tax => ShoppingItemTax.create({
          id_detallecompra: detail.id,
          ...tax,
          fecha_creacion: fecha
        })));
      }));

      await applyShoppingStock(detailItems, 1, {
        originType: 'shopping',
        originId: shopping.id,
        id_suscrito
      });

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

      const previousItems = await DetailShopping.findAll({ where: { id_compra: req.params.id } });
      const id_suscrito = await getTenantId(req);
      const total = detailItems.reduce((sum, item) => sum + getItemTotal(item), 0);

      await Shopping.update(
        { codigo, id_proveedor, total_compra: total },
        { where: { id: req.params.id } }
      );

      await applyShoppingStock(previousItems, -1, {
        originType: 'shopping-update',
        originId: req.params.id,
        id_suscrito
      });
      const previousDetailIds = previousItems.map(item => item.id);
      if (previousDetailIds.length > 0) {
        await ShoppingItemTax.destroy({ where: { id_detallecompra: previousDetailIds } });
      }
      await DetailShopping.destroy({ where: { id_compra: req.params.id } });
      await Promise.all(detailItems.map(async item => {
        const fecha = utilitys_.getCurrentTimestamp();
        const detail = await DetailShopping.create({
          id_compra: req.params.id,
          id_producto: item.id_producto,
          cantidad: item.cantidad,
          valor_unitario: item.valor_unitario,
          fecha_creacion: fecha
        });
        const base = getItemBase(item);
        const taxes = normalizeAppliedTaxes(item, base);
        await Promise.all(taxes.map(tax => ShoppingItemTax.create({
          id_detallecompra: detail.id,
          ...tax,
          fecha_creacion: fecha
        })));
      }));
      await applyShoppingStock(detailItems, 1, {
        originType: 'shopping-update',
        originId: req.params.id,
        id_suscrito
      });

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

      if (Number(shopping.id_estado) === 1) {
        const detailItems = await DetailShopping.findAll({ where: { id_compra: req.params.id } });
        const id_suscrito = await getTenantId(req);
        await applyShoppingStock(detailItems, -1, {
          originType: 'shopping-delete',
          originId: req.params.id,
          id_suscrito
        });
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
