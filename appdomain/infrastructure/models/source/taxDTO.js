const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const TaxDto = sequelize.define('impuesto_config', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  porcentaje: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  modulo_aplica: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'both',
  },
  modulos_visibles: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  id_suscrito: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_actualizacion: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'impuesto_config',
  timestamps: false,
});

module.exports = TaxDto;
