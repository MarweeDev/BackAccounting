const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserDTO = sequelize.define('Usuarios', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = UserDTO;

