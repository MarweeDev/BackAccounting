const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const DevelopmentResourceDto = sequelize.define('recurso_desarrollo', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tipo_recurso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ruta: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  version: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_modulo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  visible: {
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
  tableName: 'recurso_desarrollo',
  timestamps: false,
});

module.exports = DevelopmentResourceDto;
