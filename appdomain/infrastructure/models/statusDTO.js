const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StatusDto = sequelize.define('estado', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigogrupo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'estado',
  timestamps: false,
});

module.exports = StatusDto; 