const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const PeripheralConfigDto = sequelize.define('peripheral_config', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_suscrito: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_caja: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  modo: {
    type: DataTypes.STRING(40),
    allowNull: false,
    defaultValue: 'local-agent',
  },
  agent_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  printer_name: {
    type: DataTypes.STRING(120),
    allowNull: true,
  },
  printer_type: {
    type: DataTypes.STRING(60),
    allowNull: true,
  },
  payment_terminal_enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  payment_provider: {
    type: DataTypes.STRING(80),
    allowNull: true,
  },
  auto_print_after_payment: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  print_copies: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
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
  fecha_actualizacion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'peripheral_config',
  timestamps: false,
});

module.exports = PeripheralConfigDto;
