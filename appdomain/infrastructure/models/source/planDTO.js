const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const PlanDto = sequelize.define('planes', {
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  unidad: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'planes',
  timestamps: false,
});

module.exports = PlanDto;
