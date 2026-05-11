const PeripheralConfig = require('../../../infrastructure/models/source/peripheralConfigDTO');
const PeripheralEvent = require('../../../infrastructure/models/source/peripheralEventDTO');
const Order = require('../../../infrastructure/models/source/orderDTO');
const utilitys = require('../../../utility/utilitys');
const { getTenantId } = require('./tenantHelper');

const utilitys_ = new utilitys();

function toBoolean(value, fallback = false) {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
}

const peripheralController = {
  getConfig: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);
      if (!id_suscrito) {
        return res.status(403).json({ message: 'No se pudo resolver el suscrito del usuario' });
      }

      const result = await PeripheralConfig.findOne({
        where: { id_suscrito, id_estado: 1 },
        order: [['id', 'DESC']]
      });

      res.json({ result });
    } catch (error) {
      console.error('Error al obtener configuracion de perifericos:', error);
      res.status(500).json({ message: 'Error al obtener configuracion de perifericos' });
    }
  },

  saveConfig: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);
      if (!id_suscrito) {
        return res.status(403).json({ message: 'No se pudo resolver el suscrito del usuario' });
      }

      const fecha = utilitys_.getCurrentTimestamp();
      const existing = await PeripheralConfig.findOne({
        where: { id_suscrito, id_estado: 1 },
        order: [['id', 'DESC']]
      });
      const payload = {
        id_suscrito,
        id_caja: req.body.id_caja || null,
        modo: req.body.modo || 'local-agent',
        agent_url: req.body.agent_url || 'http://localhost:8765',
        printer_name: req.body.printer_name || null,
        printer_type: req.body.printer_type || 'thermal',
        payment_terminal_enabled: toBoolean(req.body.payment_terminal_enabled),
        payment_provider: req.body.payment_provider || null,
        auto_print_after_payment: toBoolean(req.body.auto_print_after_payment),
        print_copies: Number(req.body.print_copies || 1),
        id_estado: 1,
      };

      if (existing) {
        await PeripheralConfig.update(
          { ...payload, fecha_actualizacion: fecha },
          { where: { id: existing.id, id_suscrito } }
        );
        const result = await PeripheralConfig.findOne({ where: { id: existing.id, id_suscrito } });
        return res.json({ message: 'Configuracion de perifericos actualizada', result });
      }

      const result = await PeripheralConfig.create({ ...payload, fecha_creacion: fecha });
      res.json({ message: 'Configuracion de perifericos registrada', result });
    } catch (error) {
      console.error('Error al guardar configuracion de perifericos:', error);
      res.status(500).json({ message: 'Error al guardar configuracion de perifericos' });
    }
  },

  getEventsByOrder: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);
      if (!id_suscrito) {
        return res.status(403).json({ message: 'No se pudo resolver el suscrito del usuario' });
      }

      const result = await PeripheralEvent.findAll({
        where: { id_suscrito, codigo_orden: req.params.codigo, id_estado: 1 },
        order: [['fecha_creacion', 'DESC']]
      });

      res.json({ result });
    } catch (error) {
      console.error('Error al obtener eventos de perifericos:', error);
      res.status(500).json({ message: 'Error al obtener eventos de perifericos' });
    }
  },

  postEvent: async (req, res) => {
    try {
      const id_suscrito = await getTenantId(req);
      if (!id_suscrito) {
        return res.status(403).json({ message: 'No se pudo resolver el suscrito del usuario' });
      }

      if (!req.body.event_type || !req.body.event_status) {
        return res.status(400).json({ message: 'Tipo y estado del evento son obligatorios' });
      }

      const order = req.body.codigo_orden
        ? await Order.findOne({ where: { codigo: req.body.codigo_orden } })
        : null;

      const result = await PeripheralEvent.create({
        id_peripheral_config: req.body.id_peripheral_config || null,
        id_order: req.body.id_order || order?.id || null,
        codigo_orden: req.body.codigo_orden || order?.codigo || null,
        event_type: req.body.event_type,
        event_status: req.body.event_status,
        device_type: req.body.device_type || null,
        device_name: req.body.device_name || null,
        device_mode: req.body.device_mode || null,
        external_reference: req.body.external_reference || null,
        message: req.body.message || null,
        payload: req.body.payload || null,
        id_usuario: req.user?.id_usuario || req.body.id_usuario || null,
        id_suscrito,
        id_estado: 1,
        fecha_creacion: utilitys_.getCurrentTimestamp()
      });

      res.json({ message: 'Evento de periferico registrado', result });
    } catch (error) {
      console.error('Error al registrar evento de periferico:', error);
      res.status(500).json({ message: 'Error al registrar evento de periferico' });
    }
  }
};

module.exports = {
  peripheralController
};
