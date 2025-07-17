const { Sequelize } = require('sequelize')
// require('dotenv').config();
const sequelize = new Sequelize('compras_db', 'root', 'key@dbSQL123', {
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
