const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
//const MesaDTO = require('./mesaDTO');

const ShoppingDto = sequelize.define('compras', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_compra: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_proveedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'compras',
  timestamps: false,
});

module.exports = ShoppingDto; 