const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const RolesDto = sequelize.define('rol', {
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'rol',
  timestamps: false,
});

module.exports = RolesDto; 