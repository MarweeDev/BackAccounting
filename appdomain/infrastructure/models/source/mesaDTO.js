const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const MesaDto = sequelize.define('mesa', {
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
  tableName: 'mesa',
  timestamps: false,
});

module.exports = MesaDto; 