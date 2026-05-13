const PaymentMethodConfig = require('../../../infrastructure/models/source/paymentMethodConfigDTO');
const PaymentTransactionDetail = require('../../../infrastructure/models/source/paymentTransactionDetailDTO');
const Order = require('../../../infrastructure/models/source/orderDTO');
const TypePay = require('../../../infrastructure/models/shared/typePayDTO');
const utilitys = require('../../../utility/utilitys');
const { getTenantId } = require('./tenantHelper');

const utilitys_ = new utilitys();

function inferType(name) {
  const value = `${name || ''}`.toLowerCase();
  if (value.includes('credito') || value.includes('crédito')) return 'credit';
  if (value.includes('tarjeta') || value.includes('datafono') || value.includes('datáfono')) return 'terminal';
  if (value.includes('transfer')) return 'transfer';
  if (value.includes('qr')) return 'qr';
  if (value.includes('nequi') || value.includes('daviplata')) return 'wallet';
  if (value.includes('efectivo')) return 'cash';
  return 'cash';
}

function iconFor(type) {
  const icons = {
    cash: 'fa-solid fa-money-bill-wave',
    terminal: 'fa-solid fa-credit-card',
    transfer: 'fa-solid fa-building-columns',
    qr: 'fa-solid fa-qrcode',
    breb: 'fa-solid fa-bolt',
    wallet: 'fa-solid fa-mobile-screen-button',
    link: 'fa-solid fa-link',
    credit: 'fa-solid fa-handshake',
    mixed: 'fa-solid fa-layer-group'
  };
  return icons[type] || 'fa-solid fa-wallet';
}

async function seedDefaults(id_suscrito) {
  const existing = await PaymentMethodConfig.count({ where: { id_suscrito, id_estado: 1 } });
  if (existing > 0) return;

  const legacyTypes = await TypePay.findAll({ where: { id_estado: 1 }, order: [['id', 'ASC']] });
  const defaultPaidLegacy = legacyTypes.find(item => ![1, 5].includes(Number(item.id))) || legacyTypes[0];
  const creditLegacy = legacyTypes.find(item => Number(item.id) === 5) || legacyTypes.find(item => inferType(item.nombre) === 'credit');
  const fecha = utilitys_.getCurrentTimestamp();
  const legacyRows = legacyTypes.map((item, index) => {
    const method_type = inferType(item.nombre);
    return {
      id_suscrito,
      name: item.nombre,
      method_type,
      icon: iconFor(method_type),
      color: '#2c8e84',
      priority: index + 1,
      requires_reference: ['transfer', 'qr', 'wallet'].includes(method_type),
      requires_confirmation: ['transfer', 'qr', 'wallet'].includes(method_type),
      allows_qr: method_type === 'qr',
      id_tipopago_legacy: item.id,
      id_subtipopago_legacy: 1,
      enabled: true,
      id_estado: 1,
      fecha_creacion: fecha
    };
  });

  const modernRows = [
    { name: 'Bre-B / Llave', method_type: 'breb', icon: iconFor('breb'), account_label: 'Llave Bre-B', instructions: 'Pide al cliente transferir desde el boton Bre-B de su entidad y confirma cuando recibas la notificacion.', requires_reference: true, requires_confirmation: true, allows_qr: true, priority: 30 },
    { name: 'QR de pago', method_type: 'qr', icon: iconFor('qr'), account_label: 'QR comercio', instructions: 'Muestra el QR y confirma manualmente cuando el pago sea recibido.', requires_reference: true, requires_confirmation: true, allows_qr: true, priority: 31 },
    { name: 'Nequi', method_type: 'wallet', icon: iconFor('wallet'), account_label: 'Numero Nequi', instructions: 'Confirma en la app o notificacion antes de cerrar la orden.', requires_reference: true, requires_confirmation: true, priority: 32 },
    { name: 'Daviplata', method_type: 'wallet', icon: iconFor('wallet'), account_label: 'Numero Daviplata', instructions: 'Confirma en la app o notificacion antes de cerrar la orden.', requires_reference: true, requires_confirmation: true, priority: 33 },
    { name: 'PSE / Link de pago', method_type: 'link', icon: iconFor('link'), account_label: 'Link de pago', instructions: 'Comparte el link y confirma manualmente cuando el proveedor reporte aprobado.', requires_reference: true, requires_confirmation: true, priority: 34 },
    { name: 'Pago mixto', method_type: 'mixed', icon: iconFor('mixed'), instructions: 'Preparado para dividir pagos en una fase posterior.', requires_reference: false, requires_confirmation: true, priority: 90, enabled: false }
  ].map(item => ({
    ...item,
    id_suscrito,
    color: '#2c8e84',
    id_tipopago_legacy: item.method_type === 'credit' ? creditLegacy?.id : defaultPaidLegacy?.id,
    id_subtipopago_legacy: 1,
    id_estado: 1,
    fecha_creacion: fecha,
    enabled: item.enabled === false ? false : true
  }));

  await PaymentMethodConfig.bulkCreate([...legacyRows, ...modernRows]);
}

const paymentMethodController = {
  getMethods: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);
      if (!id_suscrito) return res.status(403).json({ message: 'No se pudo resolver el suscrito del usuario' });

      await seedDefaults(id_suscrito);
      const result = await PaymentMethodConfig.findAll({
        where: { id_suscrito, id_estado: 1 },
        order: [['priority', 'ASC'], ['name', 'ASC']]
      });
      res.json({ result });
    } catch (error) {
      console.error('Error al obtener medios de pago:', error);
      res.status(500).json({ message: 'Error al obtener medios de pago' });
    }
  },

  saveMethod: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);
      if (!id_suscrito) return res.status(403).json({ message: 'No se pudo resolver el suscrito del usuario' });
      if (!req.body.name || !req.body.method_type) return res.status(400).json({ message: 'Nombre y tipo son obligatorios' });

      const fecha = utilitys_.getCurrentTimestamp();
      const payload = {
        id_suscrito,
        id_caja: req.body.id_caja || null,
        name: req.body.name,
        method_type: req.body.method_type,
        icon: req.body.icon || iconFor(req.body.method_type),
        color: req.body.color || '#2c8e84',
        priority: Number(req.body.priority || 99),
        requires_reference: !!req.body.requires_reference,
        requires_confirmation: !!req.body.requires_confirmation,
        allows_qr: !!req.body.allows_qr,
        account_label: req.body.account_label || null,
        account_value: req.body.account_value || null,
        qr_value: req.body.qr_value || null,
        instructions: req.body.instructions || null,
        id_tipopago_legacy: req.body.id_tipopago_legacy || null,
        id_subtipopago_legacy: req.body.id_subtipopago_legacy || 1,
        auto_print_after_payment: !!req.body.auto_print_after_payment,
        enabled: req.body.enabled !== false,
        id_estado: 1
      };

      if (req.body.id) {
        await PaymentMethodConfig.update({ ...payload, fecha_actualizacion: fecha }, { where: { id: req.body.id, id_suscrito } });
        const result = await PaymentMethodConfig.findOne({ where: { id: req.body.id, id_suscrito } });
        return res.json({ message: 'Medio de pago actualizado', result });
      }

      const result = await PaymentMethodConfig.create({ ...payload, fecha_creacion: fecha });
      res.json({ message: 'Medio de pago creado', result });
    } catch (error) {
      console.error('Error al guardar medio de pago:', error);
      res.status(500).json({ message: 'Error al guardar medio de pago' });
    }
  },

  saveTransaction: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);
      if (!id_suscrito) return res.status(403).json({ message: 'No se pudo resolver el suscrito del usuario' });
      if (!req.body.codigo_orden || !req.body.method_name || !req.body.method_type) {
        return res.status(400).json({ message: 'Orden y medio de pago son obligatorios' });
      }

      const order = await Order.findOne({ where: { codigo: req.body.codigo_orden } });
      const result = await PaymentTransactionDetail.create({
        id_suscrito,
        id_order: req.body.id_order || order?.id || null,
        codigo_orden: req.body.codigo_orden,
        id_payment_method_config: req.body.id_payment_method_config || null,
        method_name: req.body.method_name,
        method_type: req.body.method_type,
        reference: req.body.reference || null,
        account_value: req.body.account_value || null,
        confirmation_status: req.body.confirmation_status || 'confirmed',
        amount: req.body.amount || null,
        payload: req.body.payload || null,
        id_usuario: req.user?.id_usuario || null,
        id_estado: 1,
        fecha_creacion: utilitys_.getCurrentTimestamp()
      });
      res.json({ message: 'Detalle de pago registrado', result });
    } catch (error) {
      console.error('Error al registrar detalle de pago:', error);
      res.status(500).json({ message: 'Error al registrar detalle de pago' });
    }
  }
};

module.exports = { paymentMethodController };
