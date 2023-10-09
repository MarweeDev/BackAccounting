const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const OrderDto = sequelize.define('orden', {
  codigo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_mesa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  id_estadoorden: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_tipopago: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'orden',
  timestamps: false,
});

module.exports = OrderDto; 