const CashShift = require('../../../infrastructure/models/source/cashShiftDTO');
const utilitys = require('../../../utility/utilitys');
const { getTenantId } = require('./tenantHelper');

const utilitys_ = new utilitys();

function toResponse(row) {
  if (!row) return null;
  return {
    id: row.id,
    status: row.estado,
    responsable: row.responsable,
    opening_amount: Number(row.monto_apertura || 0),
    expected_cash: Number(row.efectivo_esperado || 0),
    counted_cash: row.efectivo_contado === null ? null : Number(row.efectivo_contado || 0),
    sales_total: Number(row.total_ventas || 0),
    expenses_total: Number(row.total_gastos || 0),
    minor_cash_total: Number(row.total_caja_menor || 0),
    difference: row.diferencia === null ? null : Number(row.diferencia || 0),
    opened_at: row.fecha_apertura,
    closed_at: row.fecha_cierre,
    notes: row.notas
  };
}

const cashShiftController = {
  current: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);
      const where = { estado: 'open' };
      if (id_suscrito) where.id_suscrito = id_suscrito;
      const result = await CashShift.findOne({ where, order: [['fecha_apertura', 'DESC']] });
      res.json({ result: toResponse(result) });
    } catch (error) {
      console.error('Error al obtener turno actual:', error);
      res.status(500).json({ message: 'Error al obtener turno actual' });
    }
  },

  open: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);
      const existing = await CashShift.findOne({ where: { estado: 'open', id_suscrito } });
      if (existing) return res.status(400).json({ message: 'Ya existe un turno abierto' });

      const opening = Number(req.body.opening_amount ?? req.body.monto_apertura ?? 0);
      const result = await CashShift.create({
        estado: 'open',
        responsable: req.user?.usuario || req.body.responsable || null,
        monto_apertura: opening,
        efectivo_esperado: opening,
        notas: req.body.notes || req.body.notas,
        id_usuario: req.user?.id_usuario || null,
        id_suscrito,
        fecha_apertura: utilitys_.getCurrentTimestamp()
      });
      res.json({ message: 'Turno abierto exitosamente', result: toResponse(result) });
    } catch (error) {
      console.error('Error al abrir turno:', error);
      res.status(500).json({ message: 'Error al abrir turno' });
    }
  },

  close: async (req, res) => {
    try {
      const counted = Number(req.body.counted_cash ?? req.body.efectivo_contado ?? 0);
      const shift = await CashShift.findOne({ where: { id: req.params.id, estado: 'open' } });
      if (!shift) return res.status(404).json({ message: 'Turno abierto no encontrado' });

      const expected = Number(shift.efectivo_esperado || 0);
      await CashShift.update({
        estado: 'closed',
        efectivo_contado: counted,
        diferencia: counted - expected,
        notas: req.body.notes || req.body.notas || shift.notas,
        fecha_cierre: utilitys_.getCurrentTimestamp()
      }, { where: { id: shift.id } });

      const result = await CashShift.findOne({ where: { id: shift.id } });
      res.json({ message: 'Turno cerrado exitosamente', result: toResponse(result) });
    } catch (error) {
      console.error('Error al cerrar turno:', error);
      res.status(500).json({ message: 'Error al cerrar turno' });
    }
  }
};

module.exports = { cashShiftController };
