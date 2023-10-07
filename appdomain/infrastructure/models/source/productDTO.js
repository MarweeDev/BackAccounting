const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const ProductDto = sequelize.define('producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'producto',
  timestamps: false,
});

module.exports = ProductDto; 