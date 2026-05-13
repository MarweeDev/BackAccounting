const { Op } = require('sequelize');
const crypto = require('crypto');
const User = require('../../../infrastructure/models/source/usersDTO');
const Collaborator = require('../../../infrastructure/models/source/collaboratorDTO');
const Subscriber = require('../../../infrastructure/models/source/subscriberDTO');
const Plan = require('../../../infrastructure/models/source/planDTO');
const AuthorizationToken = require('../../../infrastructure/models/source/authorizationTokenDTO');
const AuditEvent = require('../../../infrastructure/models/source/auditEventDTO');
const Role = require('../../../infrastructure/models/shared/roleDTO');
const Module = require('../../../infrastructure/models/source/moduleDTO');
const RoleModule = require('../../../infrastructure/models/relation/roleModuleDTO');
const utilitys = require('../../../utility/utilitys');
const { getPasswordFromBody, hashPassword } = require('../../../utility/passwords');
const { auditEvent } = require('./auditService');

const utilitys_ = new utilitys();

function now() {
  return utilitys_.getCurrentTimestamp();
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : value;
}

function buildCode(value) {
  const base = normalizeText(value) || 'SUS';
  return base
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 12) + '-' + Date.now().toString().slice(-5);
}

function buildLegacyToken() {
  return crypto.randomBytes(22).toString('base64url').slice(0, 30);
}

async function ensureAuthorizationToken(userId) {
  const existing = await AuthorizationToken.findOne({ where: { id_usuario: userId } });
  const fecha = now();

  if (existing) {
    if (existing.id_estado !== 1) {
      await AuthorizationToken.update(
        { id_estado: 1, fecha_actualizacion: fecha },
        { where: { id_usuario: userId } }
      );
    }
    return;
  }

  await AuthorizationToken.create({
    token_privado: buildLegacyToken(),
    token_publico: buildLegacyToken(),
    id_usuario: userId,
    id_estado: 1,
    fecha_creacion: fecha
  });
}

async function buildUserRow(user) {
  const [collaborator, role, subscriber] = await Promise.all([
    Collaborator.findOne({ where: { id: user.id_colaborador } }),
    Role.findOne({ where: { id: user.id_rol } }),
    user.id_suscrito ? Subscriber.findOne({ where: { id: user.id_suscrito } }) : null
  ]);

  return {
    id: user.id,
    usuario: user.usuario,
    id_colaborador: user.id_colaborador,
    colaborador: collaborator?.nombre,
    cargo: collaborator?.cargo,
    cedula: collaborator?.cedula,
    id_rol: user.id_rol,
    rol: role?.rol,
    id_suscrito: user.id_suscrito,
    suscrito: subscriber?.responsable,
    id_pais: user.id_pais,
    id_estado: user.id_estado,
    fecha_creacion: user.fecha_creacion
  };
}

async function getRoleModules() {
  const rows = await RoleModule.findAll();
  return rows.map(row => ({
    id_rol: row.id_rol,
    id_modulo: row.id_modulo,
    id_estado: row.id_estado
  }));
}

const accessControlController = {
  summary: async (req, res) => {
    try {
      const [subscribers, users, roles, modules] = await Promise.all([
        Subscriber.count({ where: { id_estado: 1 } }),
        User.count({ where: { id_estado: 1 } }),
        Role.count({ where: { id_estado: 1 } }),
        Module.count({ where: { id_estado: 1 } })
      ]);

      res.json({ result: { subscribers, users, roles, modules } });
    } catch (error) {
      console.error('Error al obtener resumen de acceso:', error);
      res.status(500).json({ message: 'Error al obtener resumen de acceso' });
    }
  },

  catalogs: async (req, res) => {
    try {
      const [plans, roles, modules, subscribers, roleModules] = await Promise.all([
        Plan.findAll({ order: [['id', 'ASC']] }),
        Role.findAll({ where: { id_estado: 1 }, order: [['rol', 'ASC']] }),
        Module.findAll({ where: { id_estado: 1 }, order: [['position_module', 'ASC']] }),
        Subscriber.findAll({ where: { id_estado: 1 }, order: [['responsable', 'ASC']] }),
        getRoleModules()
      ]);

      res.json({ result: { plans, roles, modules, subscribers, roleModules } });
    } catch (error) {
      console.error('Error al obtener catalogos de acceso:', error);
      res.status(500).json({ message: 'Error al obtener catalogos de acceso' });
    }
  },

  getSubscribers: async (req, res) => {
    try {
      const result = await Subscriber.findAll({ where: { id_estado: 1 }, order: [['fecha_creacion', 'DESC']] });
      res.json({ result });
    } catch (error) {
      console.error('Error al obtener empresas:', error);
      res.status(500).json({ message: 'Error al obtener empresas' });
    }
  },

  postSubscriber: async (req, res) => {
    const responsable = normalizeText(req.body.responsable);
    const contacto_n = normalizeText(req.body.contacto_n);
    const correo = normalizeText(req.body.correo);
    const id_plan = req.body.id_plan;
    const nit = normalizeText(req.body.nit);
    const imagen = req.body.imagen || null;
    const fecha_finalizacion = req.body.fecha_finalizacion || now();

    try {
      if (!responsable || !contacto_n || !correo || !id_plan) {
        return res.status(400).json({ message: 'Responsable, contacto, correo y plan son obligatorios' });
      }

      const existing = await Subscriber.findOne({ where: { [Op.or]: [{ correo }, { codigo: buildCode(responsable) }] } });
      if (existing?.correo === correo && existing.id_estado === 1) {
        return res.status(400).json({ message: 'La empresa ya existe con ese correo' });
      }

      const fecha = now();
      const result = await Subscriber.create({
        responsable,
        contacto_n,
        correo,
        codigo: buildCode(responsable),
        id_plan,
        fecha_creacion: fecha,
        fecha_actualizacion: fecha,
        fecha_finalizacion,
        id_estado: 1,
        nit,
        imagen
      });

      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'suscritos',
        id_entidad: result.id,
        accion: 'crear',
        descripcion: 'Empresa registrada desde Control de Acceso',
        valor_nuevo: result
      });

      res.json({ message: 'Empresa registrada exitosamente', result });
    } catch (error) {
      console.error('Error al registrar empresa:', error);
      res.status(500).json({ message: 'Error al registrar empresa' });
    }
  },

  updateSubscriber: async (req, res) => {
    const Id = req.params.id;
    const { responsable, contacto_n, correo, id_plan, fecha_finalizacion, nit, imagen } = req.body;

    try {
      const subscriber = await Subscriber.findOne({ where: { id: Id } });
      if (!subscriber) return res.status(404).json({ message: 'Empresa no encontrada' });

      await Subscriber.update(
        { responsable, contacto_n, correo, id_plan, fecha_finalizacion, nit, imagen, fecha_actualizacion: now() },
        { where: { id: Id } }
      );

      const result = await Subscriber.findOne({ where: { id: Id } });
      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'suscritos',
        id_entidad: Id,
        accion: 'actualizar',
        descripcion: 'Empresa actualizada desde Control de Acceso',
        valor_anterior: subscriber,
        valor_nuevo: result
      });

      res.json({ message: 'Empresa actualizada exitosamente', result });
    } catch (error) {
      console.error('Error al actualizar empresa:', error);
      res.status(500).json({ message: 'Error al actualizar empresa' });
    }
  },

  deleteSubscriber: async (req, res) => {
    const Id = req.params.id;

    try {
      const subscriber = await Subscriber.findOne({ where: { id: Id } });
      if (!subscriber) return res.status(404).json({ message: 'Empresa no encontrada' });

      await Subscriber.update({ id_estado: 2, fecha_actualizacion: now() }, { where: { id: Id } });
      const result = await Subscriber.findOne({ where: { id: Id } });
      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'suscritos',
        id_entidad: Id,
        accion: 'deshabilitar',
        descripcion: 'Empresa deshabilitada desde Control de Acceso',
        valor_anterior: subscriber,
        valor_nuevo: result
      });

      res.json({ message: 'Empresa deshabilitada exitosamente' });
    } catch (error) {
      console.error('Error al deshabilitar empresa:', error);
      res.status(500).json({ message: 'Error al deshabilitar empresa' });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({ where: { id_estado: 1 }, order: [['fecha_creacion', 'DESC']] });
      const result = await Promise.all(users.map(buildUserRow));
      res.json({ result });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ message: 'Error al obtener usuarios' });
    }
  },

  getAuditEvents: async (req, res) => {
    try {
      const page = Math.max(Number(req.query.page || 1), 1);
      const pageSize = Math.min(Math.max(Number(req.query.pageSize || 20), 1), 80);
      const where = { id_estado: 1 };

      if (req.query.accion) where.accion = normalizeText(req.query.accion);
      if (req.query.entidad) where.entidad = normalizeText(req.query.entidad);
      if (req.query.id_usuario) where.id_usuario = Number(req.query.id_usuario);
      if (req.query.id_suscrito) where.id_suscrito = Number(req.query.id_suscrito);
      if (req.query.id_modulo) where.id_modulo = Number(req.query.id_modulo);

      if (req.query.dateFrom || req.query.dateTo) {
        where.fecha_creacion = {};
        if (req.query.dateFrom) where.fecha_creacion[Op.gte] = new Date(`${req.query.dateFrom}T00:00:00`);
        if (req.query.dateTo) where.fecha_creacion[Op.lte] = new Date(`${req.query.dateTo}T23:59:59`);
      }

      const { rows, count } = await AuditEvent.findAndCountAll({
        where,
        order: [['fecha_creacion', 'DESC']],
        limit: pageSize,
        offset: (page - 1) * pageSize
      });

      res.json({
        result: rows,
        pagination: {
          page,
          pageSize,
          total: count,
          totalPages: Math.ceil(count / pageSize)
        }
      });
    } catch (error) {
      console.error('Error al obtener auditoria:', error);
      res.status(500).json({ message: 'Error al obtener auditoria' });
    }
  },

  postUser: async (req, res) => {
    const usuario = normalizeText(req.body.usuario);
    const password = getPasswordFromBody(req.body);
    const nombre = normalizeText(req.body.nombre);
    const cargo = normalizeText(req.body.cargo) || 'Usuario';
    const cedula = Number(req.body.cedula || Date.now().toString().slice(-9));
    const { id_rol, id_suscrito, id_pais } = req.body;

    try {
      if (!usuario || !password || !nombre || !id_rol || !id_suscrito) {
        return res.status(400).json({ message: 'Usuario, password, nombre, rol y empresa son obligatorios' });
      }

      const existingUser = await User.findOne({ where: { usuario } });
      if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });

      const fecha = now();
      const collaborator = await Collaborator.create({
        nombre,
        cargo,
        cedula,
        id_estado: 1,
        fecha_creacion: fecha
      });

      const user = await User.create({
        usuario,
        contrasena: await hashPassword(password),
        id_colaborador: collaborator.id,
        id_rol,
        id_estado: 1,
        id_suscrito,
        id_pais: id_pais || null,
        fecha_creacion: fecha
      });

      await ensureAuthorizationToken(user.id);
      const result = await buildUserRow(user);
      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'usuarios',
        id_entidad: user.id,
        accion: 'crear',
        descripcion: 'Usuario registrado desde Control de Acceso',
        valor_nuevo: { ...result, password: undefined }
      });

      res.json({ message: 'Usuario registrado exitosamente', result });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  },

  updateUser: async (req, res) => {
    const Id = req.params.id;
    const { usuario, nombre, cargo, cedula, id_rol, id_suscrito, id_pais, id_estado } = req.body;
    const password = getPasswordFromBody(req.body);

    try {
      const user = await User.findOne({ where: { id: Id } });
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

      const updateFields = {
        usuario,
        id_rol,
        id_suscrito,
        id_pais: id_pais || null,
        id_estado: id_estado || user.id_estado,
        fecha_actualizacion: now()
      };

      if (password) updateFields.contrasena = await hashPassword(password);

      await User.update(updateFields, { where: { id: Id } });
      await Collaborator.update(
        { nombre, cargo, cedula, fecha_actualizacion: now() },
        { where: { id: user.id_colaborador } }
      );

      const updated = await User.findOne({ where: { id: Id } });
      const result = await buildUserRow(updated);
      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'usuarios',
        id_entidad: Id,
        accion: 'actualizar',
        descripcion: 'Usuario actualizado desde Control de Acceso',
        valor_anterior: { id: user.id, usuario: user.usuario, id_rol: user.id_rol, id_suscrito: user.id_suscrito, id_estado: user.id_estado },
        valor_nuevo: { ...result, password: undefined }
      });

      res.json({ message: 'Usuario actualizado exitosamente', result });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ message: 'Error al actualizar usuario' });
    }
  },

  deleteUser: async (req, res) => {
    const Id = req.params.id;

    try {
      const user = await User.findOne({ where: { id: Id } });
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

      await User.update({ id_estado: 2, fecha_actualizacion: now() }, { where: { id: Id } });
      await Collaborator.update({ id_estado: 2, fecha_actualizacion: now() }, { where: { id: user.id_colaborador } });
      const result = await User.findOne({ where: { id: Id } });
      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'usuarios',
        id_entidad: Id,
        accion: 'deshabilitar',
        descripcion: 'Usuario deshabilitado desde Control de Acceso',
        valor_anterior: { id: user.id, usuario: user.usuario, id_rol: user.id_rol, id_suscrito: user.id_suscrito, id_estado: user.id_estado },
        valor_nuevo: { id: result.id, usuario: result.usuario, id_rol: result.id_rol, id_suscrito: result.id_suscrito, id_estado: result.id_estado }
      });

      res.json({ message: 'Usuario deshabilitado exitosamente' });
    } catch (error) {
      console.error('Error al deshabilitar usuario:', error);
      res.status(500).json({ message: 'Error al deshabilitar usuario' });
    }
  },

  updateRoleModules: async (req, res) => {
    const roleId = Number(req.params.id);
    const moduleIds = (req.body.moduleIds || []).map(Number);

    try {
      if (!roleId) return res.status(400).json({ message: 'Rol invalido' });

      const modules = await Module.findAll({ where: { id_estado: 1 } });
      const fecha = now();
      const previousRoleModules = await getRoleModules();

      for (const module of modules) {
        const shouldEnable = moduleIds.includes(module.id);
        const existing = await RoleModule.findOne({ where: { id_rol: roleId, id_modulo: module.id } });

        if (existing) {
          await RoleModule.update(
            { id_estado: shouldEnable ? 1 : 2, fecha_actualizacion: fecha },
            { where: { id_rol: roleId, id_modulo: module.id } }
          );
        } else if (shouldEnable) {
          await RoleModule.create({
            id_rol: roleId,
            id_modulo: module.id,
            id_estado: 1,
            fecha_creacion: fecha
          });
        }
      }

      const result = await getRoleModules();
      await auditEvent(req, {
        modulo: 'Control de Acceso',
        entidad: 'rol_modulo',
        id_entidad: roleId,
        accion: 'actualizar_permisos',
        descripcion: 'Permisos de modulos por rol actualizados desde Control de Acceso',
        valor_anterior: previousRoleModules.filter(item => item.id_rol === roleId),
        valor_nuevo: result.filter(item => item.id_rol === roleId)
      });

      res.json({ message: 'Permisos de rol actualizados exitosamente', result });
    } catch (error) {
      console.error('Error al actualizar permisos de rol:', error);
      res.status(500).json({ message: 'Error al actualizar permisos de rol' });
    }
  }
};

module.exports = {
  accessControlController
};
