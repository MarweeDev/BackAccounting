const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const StatusOrderDto = sequelize.define('estadoorden', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'estadoorden',
  timestamps: false,
});

module.exports = StatusOrderDto; 