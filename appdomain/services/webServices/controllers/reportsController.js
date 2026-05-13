const sequelize = require('../../../infrastructure/config/db');
const Stock = require('../../../infrastructure/models/source/stockDTO');
const Product = require('../../../infrastructure/models/source/productDTO');
const Category = require('../../../infrastructure/models/shared/productCategoryDTO');
const { inventoryMovementController } = require('./inventoryMovementController');

function dateFilter(query, alias = 'o') {
  const filters = [];
  const replacements = {};
  if (query.dateFrom) {
    filters.push(`${alias}.fecha_creacion >= :dateFrom`);
    replacements.dateFrom = query.dateFrom;
  }
  if (query.dateTo) {
    filters.push(`${alias}.fecha_creacion <= :dateTo`);
    replacements.dateTo = query.dateTo;
  }
  return { sql: filters.length ? `where ${filters.join(' and ')}` : '', replacements };
}

const reportsController = {
  sales: async (req, res) => {
    try {
      const filter = dateFilter(req.query, 'o');
      const [rows] = await sequelize.query(`
        select
          o.codigo,
          o.fecha_creacion,
          u.usuario as vendedor,
          coalesce(sum(d.cantidad * p.precio), 0) as total
        from orden o
        left join detalleorden d on d.codigo_orden = o.codigo
        left join producto p on p.id = d.id_producto
        left join usuarios u on u.id = o.id_usuario
        ${filter.sql}
        group by o.codigo, o.fecha_creacion, u.usuario
        order by o.fecha_creacion desc
      `, { replacements: filter.replacements });
      res.json({ result: rows });
    } catch (error) {
      console.error('Error al generar reporte de ventas:', error);
      res.status(500).json({ message: 'Error al generar reporte de ventas' });
    }
  },

  salesByProduct: async (req, res) => {
    try {
      const filter = dateFilter(req.query, 'o');
      const extra = [];
      if (req.query.productId) {
        extra.push('d.id_producto = :productId');
        filter.replacements.productId = req.query.productId;
      }
      const where = [filter.sql.replace(/^where /, ''), ...extra].filter(Boolean);
      const [rows] = await sequelize.query(`
        select
          p.id as id_producto,
          p.nombre as producto,
          sum(d.cantidad) as cantidad,
          sum(d.cantidad * p.precio) as total
        from detalleorden d
        inner join orden o on o.codigo = d.codigo_orden
        inner join producto p on p.id = d.id_producto
        ${where.length ? `where ${where.join(' and ')}` : ''}
        group by p.id, p.nombre
        order by total desc
      `, { replacements: filter.replacements });
      res.json({ result: rows });
    } catch (error) {
      console.error('Error al generar ventas por producto:', error);
      res.status(500).json({ message: 'Error al generar ventas por producto' });
    }
  },

  salesBySeller: async (req, res) => {
    try {
      const filter = dateFilter(req.query, 'o');
      const extra = [];
      if (req.query.sellerId) {
        extra.push('o.id_usuario = :sellerId');
        filter.replacements.sellerId = req.query.sellerId;
      }
      const where = [filter.sql.replace(/^where /, ''), ...extra].filter(Boolean);
      const [rows] = await sequelize.query(`
        select
          u.id as id_usuario,
          u.usuario as vendedor,
          count(distinct o.codigo) as ordenes,
          coalesce(sum(d.cantidad * p.precio), 0) as total
        from orden o
        left join detalleorden d on d.codigo_orden = o.codigo
        left join producto p on p.id = d.id_producto
        left join usuarios u on u.id = o.id_usuario
        ${where.length ? `where ${where.join(' and ')}` : ''}
        group by u.id, u.usuario
        order by total desc
      `, { replacements: filter.replacements });
      res.json({ result: rows });
    } catch (error) {
      console.error('Error al generar ventas por vendedor:', error);
      res.status(500).json({ message: 'Error al generar ventas por vendedor' });
    }
  },

  inventory: async (req, res) => {
    try {
      const rows = await Stock.findAll({ order: [['id', 'DESC']] });
      const result = await Promise.all(rows.map(async row => {
        const product = await Product.findOne({ where: { id: row.id_producto } });
        const category = product ? await Category.findOne({ where: { id: product.id_categoria } }) : null;
        return {
          id: row.id,
          id_producto: row.id_producto,
          producto: product?.nombre,
          referencia: product?.referencia,
          id_categoria: product?.id_categoria,
          categoria: category?.nombre,
          cantidad: row.cantidad,
          precio: product?.precio,
          valor_total: Number(row.cantidad || 0) * Number(product?.precio || 0)
        };
      }));
      res.json({ result });
    } catch (error) {
      console.error('Error al generar reporte de inventario:', error);
      res.status(500).json({ message: 'Error al generar reporte de inventario' });
    }
  },

  inventoryMovement: inventoryMovementController.get
};

module.exports = { reportsController };
