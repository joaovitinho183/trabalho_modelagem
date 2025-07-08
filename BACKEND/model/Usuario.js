const { DataTypes } = require('sequelize')
const db = require('../bd/conn')
const Usuario = db.define('usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    primeiroNome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sobrenome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aniversario: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
}, {
    tableName: 'usuarios',
    timestamps: false
})

module.exports = Usuario