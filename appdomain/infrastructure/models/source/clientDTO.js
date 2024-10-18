const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const ClientDto = sequelize.define('cliente', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'cliente',
  timestamps: false,
});

module.exports = ClientDto;