const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const ComponentPermissionDto = sequelize.define('permiso_componente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_modulo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_componente: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  accion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permitido: {
    type: DataTypes.BOOLEAN,
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
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'permiso_componente',
  timestamps: false,
});

module.exports = ComponentPermissionDto;
