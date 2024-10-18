const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const TypePayDto = sequelize.define('tipopago', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'tipopago',
  timestamps: false,
});

module.exports = TypePayDto; 