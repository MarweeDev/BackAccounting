const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const ProductDto = sequelize.define('producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  precio: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  referencia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'producto',
  timestamps: false,
});

module.exports = ProductDto; 