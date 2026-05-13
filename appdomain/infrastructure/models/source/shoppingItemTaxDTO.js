const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const ShoppingItemTaxDto = sequelize.define('detallecompra_impuesto', {
  id_detallecompra: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_impuesto: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  porcentaje: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  base: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'detallecompra_impuesto',
  timestamps: false,
});

module.exports = ShoppingItemTaxDto;
