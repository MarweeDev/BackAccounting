const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const ReserveMesaDto = sequelize.define('reservamesa', {
    id_mesa: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    nombrecliente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactocliente: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
  tableName: 'reservamesa',
  timestamps: false,
});

module.exports = ReserveMesaDto; 