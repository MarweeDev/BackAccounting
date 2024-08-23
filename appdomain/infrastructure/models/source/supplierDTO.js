const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const SupplierDTO = sequelize.define('proveedores', {
    proveedor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contacto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
  tableName: 'proveedores',
  timestamps: false,
});

module.exports = SupplierDTO; 