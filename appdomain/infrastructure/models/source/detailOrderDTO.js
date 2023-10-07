const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const DetailOrderDto = sequelize.define('detalleorden', {
  id_orden: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'detalleorden',
  timestamps: false,
});

module.exports = DetailOrderDto; 