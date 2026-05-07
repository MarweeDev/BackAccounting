const AuditEvent = require('../../../infrastructure/models/source/auditEventDTO');
const User = require('../../../infrastructure/models/source/usersDTO');
const Module = require('../../../infrastructure/models/source/moduleDTO');

function toPlain(value) {
  if (!value) return null;
  if (typeof value.toJSON === 'function') return value.toJSON();
  return value;
}

function getIp(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.socket?.remoteAddress
    || req.ip
    || null;
}

async function getUserContext(req) {
  const userId = req.user?.id_usuario || null;
  if (!userId) return { id_usuario: null, id_suscrito: null };

  const user = await User.findOne({ where: { id: userId } });
  return {
    id_usuario: userId,
    id_suscrito: user?.id_suscrito || null
  };
}

async function getModuleId(moduleName) {
  if (!moduleName) return null;

  const module = await Module.findOne({ where: { modulo: moduleName } });
  return module?.id || null;
}

async function auditEvent(req, options) {
  try {
    const userContext = await getUserContext(req);
    const moduleId = options.id_modulo || await getModuleId(options.modulo);

    await AuditEvent.create({
      id_usuario: userContext.id_usuario,
      id_suscrito: options.id_suscrito || userContext.id_suscrito,
      id_modulo: moduleId,
      entidad: options.entidad,
      id_entidad: options.id_entidad ? String(options.id_entidad) : null,
      accion: options.accion,
      descripcion: options.descripcion || null,
      valor_anterior: toPlain(options.valor_anterior),
      valor_nuevo: toPlain(options.valor_nuevo),
      ip: getIp(req),
      user_agent: req.headers['user-agent'] || null,
      id_estado: 1
    });
  } catch (error) {
    console.error('Error al registrar auditoria:', error);
  }
}

module.exports = {
  auditEvent
};
