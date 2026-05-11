const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const PeripheralEventDto = sequelize.define('peripheral_event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_peripheral_config: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_order: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  codigo_orden: {
    type: DataTypes.STRING(80),
    allowNull: true,
  },
  event_type: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  event_status: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  device_type: {
    type: DataTypes.STRING(60),
    allowNull: true,
  },
  device_name: {
    type: DataTypes.STRING(120),
    allowNull: true,
  },
  device_mode: {
    type: DataTypes.STRING(40),
    allowNull: true,
  },
  external_reference: {
    type: DataTypes.STRING(160),
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  payload: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_suscrito: {
    type: DataTypes.INTEGER,
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
  },
}, {
  tableName: 'peripheral_event',
  timestamps: false,
});

module.exports = PeripheralEventDto;
