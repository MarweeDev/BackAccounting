const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const ModuleDto = sequelize.define('modulo', {
  modulo: {
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
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_actualizacion: {
    type: DataTypes.DATE
  },
}, {
  tableName: 'modulo',
  timestamps: false,
});

module.exports = ModuleDto; 