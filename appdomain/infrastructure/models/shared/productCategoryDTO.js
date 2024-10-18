const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const ProductCategoryDTO = sequelize.define('categoriaproducto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'categoriaproducto',
  timestamps: false,
});

module.exports = ProductCategoryDTO; 