const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const CollaboratorDto = sequelize.define('colaborador', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cedula: {
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
  tableName: 'colaborador',
  timestamps: false,
});

module.exports = CollaboratorDto; 