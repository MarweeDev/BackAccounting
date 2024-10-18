const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const DetailShoppingDTO = sequelize.define('detallecompra', {
    id_compra: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor_unitario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
  tableName: 'detallecompra',
  timestamps: false,
});

module.exports = DetailShoppingDTO; 