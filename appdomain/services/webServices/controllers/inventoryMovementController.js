const { Op } = require('sequelize');
const InventoryMovement = require('../../../infrastructure/models/source/inventoryMovementDTO');
const Product = require('../../../infrastructure/models/source/productDTO');
const { getTenantId } = require('./tenantHelper');

function toResponse(row, product) {
  return {
    id: row.id,
    id_producto: row.id_producto,
    producto: product?.nombre,
    reference: product?.referencia,
    movement_type: row.tipo_movimiento,
    initial_quantity: Number(row.cantidad_inicial || 0),
    input_quantity: Number(row.entrada || 0),
    output_quantity: Number(row.salida || 0),
    final_quantity: Number(row.cantidad_final || 0),
    origin_type: row.origen_tipo,
    origin_id: row.origen_id,
    responsable: row.responsable,
    created_at: row.fecha_creacion
  };
}

async function createInventoryMovement(data) {
  return InventoryMovement.create(data);
}

const inventoryMovementController = {
  get: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);
      const where = {};
      if (id_suscrito) where.id_suscrito = id_suscrito;
      if (req.query.productId) where.id_producto = req.query.productId;
      if (req.query.movementType) where.tipo_movimiento = req.query.movementType;
      if (req.query.dateFrom || req.query.dateTo) {
        where.fecha_creacion = {};
        if (req.query.dateFrom) where.fecha_creacion[Op.gte] = req.query.dateFrom;
        if (req.query.dateTo) where.fecha_creacion[Op.lte] = req.query.dateTo;
      }

      const rows = await InventoryMovement.findAll({ where, order: [['fecha_creacion', 'DESC']] });
      const productIds = [...new Set(rows.map(item => item.id_producto))];
      const products = productIds.length ? await Product.findAll({ where: { id: productIds } }) : [];
      const result = rows.map(row => toResponse(row, products.find(product => product.id === row.id_producto)));
      res.json({ result });
    } catch (error) {
      console.error('Error al obtener movimientos de inventario:', error);
      res.status(500).json({ message: 'Error al obtener movimientos de inventario' });
    }
  }
};

module.exports = {
  inventoryMovementController,
  createInventoryMovement
};
