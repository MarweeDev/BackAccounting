const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const InventoryMovementDto = sequelize.define('movimiento_inventario', {
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo_movimiento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad_inicial: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
    defaultValue: 0,
  },
  entrada: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
    defaultValue: 0,
  },
  salida: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
    defaultValue: 0,
  },
  cantidad_final: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
    defaultValue: 0,
  },
  origen_tipo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  origen_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  responsable: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_suscrito: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'movimiento_inventario',
  timestamps: false,
});

module.exports = InventoryMovementDto;
