const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const PaymentMethodConfigDto = sequelize.define('payment_method_config', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_suscrito: { type: DataTypes.INTEGER, allowNull: false },
  id_caja: { type: DataTypes.INTEGER, allowNull: true },
  name: { type: DataTypes.STRING(120), allowNull: false },
  method_type: { type: DataTypes.STRING(60), allowNull: false },
  icon: { type: DataTypes.STRING(120), allowNull: true },
  color: { type: DataTypes.STRING(40), allowNull: true },
  priority: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 99 },
  requires_reference: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  requires_confirmation: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  allows_qr: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  account_label: { type: DataTypes.STRING(120), allowNull: true },
  account_value: { type: DataTypes.STRING(255), allowNull: true },
  qr_value: { type: DataTypes.TEXT, allowNull: true },
  instructions: { type: DataTypes.TEXT, allowNull: true },
  id_tipopago_legacy: { type: DataTypes.INTEGER, allowNull: true },
  id_subtipopago_legacy: { type: DataTypes.INTEGER, allowNull: true },
  auto_print_after_payment: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  id_estado: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  fecha_creacion: { type: DataTypes.DATE, allowNull: false },
  fecha_actualizacion: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: 'payment_method_config',
  timestamps: false,
});

module.exports = PaymentMethodConfigDto;
