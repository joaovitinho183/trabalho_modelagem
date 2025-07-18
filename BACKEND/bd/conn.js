const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
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
