const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const StockDto = sequelize.define('stock', {
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'stock',
  timestamps: false,
});

module.exports = StockDto; 