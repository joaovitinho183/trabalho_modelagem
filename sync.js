// Importa a conexão com o banco de dados
const conn = require('./BACKEND/bd/conn')

// Importa os modelos das tabelas (Usuario, Produto, Compra) já com os relacionamentos definidos
const { Usuario, Produto, Compra } = require('./BACKEND/model/rel')

// Função que vai sincronizar o banco de dados
async function syncDataBase() {
    try {
        // Sincroniza o banco de dados com os modelos definidos
        // "force: true" faz com que ele apague as tabelas existentes e crie novamente do zero
        await conn.sync({ force: true })
        console.log('Tabelas criadas e Banco de dados sincronizado!')
    } catch (err) {
        // Se der erro, mostra no console
        console.error('Não foi possível criar as tabelas e sincronizar o BD!', err)
    } finally {
        // Fecha a conexão com o banco, independente se deu erro ou não
        await conn.close()
        console.log('Banco de dados fechado!')
    }
}

// Executa a função de sincronização
syncDataBase()
