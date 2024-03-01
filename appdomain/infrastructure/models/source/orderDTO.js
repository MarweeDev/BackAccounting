const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const MesaDTO = require('./mesaDTO');

const OrderDto = sequelize.define('orden', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_mesa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  id_estadoorden: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_tipopago: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'orden',
  timestamps: false,
});

// Definición de la asociación
OrderDto.belongsTo(MesaDTO, { foreignKey: 'id_mesa' });
MesaDTO.hasMany(OrderDto, { foreignKey: 'id_mesa' });

module.exports = OrderDto; 