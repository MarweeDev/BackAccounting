const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const ComponentDto = sequelize.define('componente', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ruta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_modulo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'componente',
  timestamps: false,
});

module.exports = ComponentDto; 