const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const AuditEventDto = sequelize.define('auditoria_evento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_suscrito: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_modulo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  entidad: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  id_entidad: {
    type: DataTypes.STRING(80),
    allowNull: true,
  },
  accion: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  valor_anterior: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  valor_nuevo: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  ip: {
    type: DataTypes.STRING(80),
    allowNull: true,
  },
  user_agent: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'auditoria_evento',
  timestamps: false,
});

module.exports = AuditEventDto;
