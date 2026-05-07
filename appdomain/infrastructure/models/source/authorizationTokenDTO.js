const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const AuthorizationTokenDto = sequelize.define('authorizationtoken', {
  token_privado: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  token_publico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_usuario: {
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
    type: DataTypes.DATE,
  },
}, {
  tableName: 'authorizationtoken',
  timestamps: false,
});

module.exports = AuthorizationTokenDto;
