const { DataTypes } = require('sequelize')
const db = require('../bd/conn')
const Compra = db.define('compra', {
    id_compra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataCompra: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    precoU: {
        type: DataTypes.REAL(10, 2),
        allowNull: false
    },
    descontoAplica: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    precoFinal: {
        type: DataTypes.REAL(10, 2),
        allowNull: false
    },
    formaPagamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    statusCompra: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cod_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    cod_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'id_produto'
        }
    },
}, {
    timestamps: false
})

module.exports = Compra