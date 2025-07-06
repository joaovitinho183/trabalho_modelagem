const { DataTypes } = require('sequelize')
const db = require('../bd/conn')
const Produto = db.define('produto', {
    id_produto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.REAL(10,2),
        allowNull: false
    },
    discountPercentage: {
        type: DataTypes.REAL(10,2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'produtos',
    timestamps: false
})

module.exports = Produto