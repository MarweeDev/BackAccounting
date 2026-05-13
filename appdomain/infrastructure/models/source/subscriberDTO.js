const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const SubscriberDto = sequelize.define('suscritos', {
  responsable: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contacto_n: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_plan: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_actualizacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_finalizacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imagen: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'suscritos',
  timestamps: false,
});

module.exports = SubscriberDto;
