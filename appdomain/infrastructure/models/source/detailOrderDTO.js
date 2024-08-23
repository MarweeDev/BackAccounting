const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const DetailOrderDto = sequelize.define('detalleorden', {
  codigo_orden: {
    type: DataTypes.STRING,
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