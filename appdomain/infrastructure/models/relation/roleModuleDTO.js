const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const RoleModuleDto = sequelize.define('rol_modulo', {
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_modulo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
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
  tableName: 'rol_modulo',
  timestamps: false,
});

module.exports = RoleModuleDto; 
