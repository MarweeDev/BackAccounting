const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const OrderDto = sequelize.define('orden', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_client: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_tipopago: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_subtipopago: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  id_estadoorden: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  observacion: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'orden',
  timestamps: false,
});

module.exports = OrderDto; 