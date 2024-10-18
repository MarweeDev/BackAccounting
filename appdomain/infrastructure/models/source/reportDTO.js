const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const ReportDTO = sequelize.define('reportes', {
    codigo_reporte: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    consulta: {
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
  tableName: 'reportes',
  timestamps: false,
});

module.exports = ReportDTO; 