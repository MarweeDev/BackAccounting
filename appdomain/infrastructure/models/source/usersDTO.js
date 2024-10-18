const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const UserDto = sequelize.define('usuarios', {
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_colaborador: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_rol: {
    type: DataTypes.INTEGER,
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
  tableName: 'usuarios',
  timestamps: false,
});

module.exports = UserDto;

