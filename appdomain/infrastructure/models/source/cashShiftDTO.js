const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const CashShiftDto = sequelize.define('turno_caja', {
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'open',
  },
  responsable: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  monto_apertura: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
    defaultValue: 0,
  },
  efectivo_esperado: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
    defaultValue: 0,
  },
  efectivo_contado: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: true,
  },
  total_ventas: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
    defaultValue: 0,
  },
  total_gastos: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
    defaultValue: 0,
  },
  total_caja_menor: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: false,
    defaultValue: 0,
  },
  diferencia: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: true,
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_suscrito: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fecha_apertura: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_cierre: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'turno_caja',
  timestamps: false,
});

module.exports = CashShiftDto;
