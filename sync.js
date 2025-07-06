const conn = require('./BACKEND/bd/conn')
const { Usuario, Produto, Compra } = require('./BACKEND/model/rel')

async function syncDataBase() {
    try {
        await conn.sync({ force: true })
        console.log('Tabelas criadas e Banco de dados sincronizado!')
    } catch (err) {
        console.error('Não foi possível criar as tabelas e sincronizar o BD!', err)
    } finally {
        await conn.close()
        console.log('Banco de dados fechado!')
    }
}

syncDataBase()
