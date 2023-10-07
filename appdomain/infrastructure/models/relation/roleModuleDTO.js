const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const RoleModuleDto = sequelize.define('rol_modulo', {
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_modulo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'rol_modulo',
  timestamps: false,
});

module.exports = RoleModuleDto; 