const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const SettingParameterDto = sequelize.define('parametro_suscrito', {
  id_suscrito: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  grupo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tipo_dato: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
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
  tableName: 'parametro_suscrito',
  timestamps: false,
});

module.exports = SettingParameterDto;
