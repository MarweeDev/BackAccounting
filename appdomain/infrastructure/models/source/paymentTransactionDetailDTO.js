const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const PaymentTransactionDetailDto = sequelize.define('payment_transaction_detail', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_suscrito: { type: DataTypes.INTEGER, allowNull: false },
  id_order: { type: DataTypes.INTEGER, allowNull: true },
  codigo_orden: { type: DataTypes.STRING(80), allowNull: false },
  id_payment_method_config: { type: DataTypes.INTEGER, allowNull: true },
  method_name: { type: DataTypes.STRING(120), allowNull: false },
  method_type: { type: DataTypes.STRING(60), allowNull: false },
  reference: { type: DataTypes.STRING(180), allowNull: true },
  account_value: { type: DataTypes.STRING(255), allowNull: true },
  confirmation_status: { type: DataTypes.STRING(40), allowNull: false, defaultValue: 'confirmed' },
  amount: { type: DataTypes.DECIMAL(14, 2), allowNull: true },
  payload: { type: DataTypes.JSONB, allowNull: true },
  id_usuario: { type: DataTypes.INTEGER, allowNull: true },
  id_estado: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  fecha_creacion: { type: DataTypes.DATE, allowNull: false },
}, {
  tableName: 'payment_transaction_detail',
  timestamps: false,
});

module.exports = PaymentTransactionDetailDto;
