const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize('db_compras', 'root', 'senai', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

sequelize.authenticate()
    .then(() => {
        console.log('Banco de Dados conectado com sucesso!!!')
    })
    .catch((err) => {
        console.error('Erro ao conectar o banco de dados', err)
    })

module.exports = sequelize 
