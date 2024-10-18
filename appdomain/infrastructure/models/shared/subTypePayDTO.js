const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const SubTypePayDto = sequelize.define('subtipopago', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_tipopago: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'subtipopago',
  timestamps: false,
});

module.exports = SubTypePayDto; 