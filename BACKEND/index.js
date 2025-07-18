// Importa o framework Express
const express = require('express')
const app = express()

// Importa o middleware CORS (permite acesso externo à API)
const cors = require('cors')

// Carrega variáveis do arquivo .env
require('dotenv').config()
const hostname = process.env.DB_HOST
const PORT = process.env.PORT

// Importa conexão com o banco de dados
const conn = require('./bd/conn')

// Importa os controllers (lógica de cada entidade)
const controllerUsuario = require('./controller/usuario.controller')
const controllerProduto = require('./controller/produto.controller')
const controllerCompra = require('./controller/compra.controller')

// Configura para aceitar dados em JSON e formulários (POST/PUT)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Ativa o CORS para permitir requisições de outros domínios
app.use(cors())

/* =========================
   ROTAS DE USUÁRIO
   ========================= */
app.post('/usuario', controllerUsuario.cadastrar)            // Cadastrar usuário
app.get('/usuario', controllerUsuario.listar)                // Listar todos
app.put('/usuario/:id', controllerUsuario.atualizar)         // Atualizar por ID
app.delete('/usuario/:id', controllerUsuario.apagar)         // Deletar por ID
app.get('/usuario/:id', controllerUsuario.consultaID)        // Buscar por ID
app.get('/usuario/nome/:nome', controllerUsuario.consultaNome) // Buscar por nome

/* =========================
   ROTAS DE PRODUTO
   ========================= */
app.post('/produto', controllerProduto.cadastrar)
app.get('/produto', controllerProduto.listar)
app.put('/produto/:id', controllerProduto.atualizar)
app.delete('/produto/:id', controllerProduto.apagar)
app.get('/produto/:id', controllerProduto.consultaID)
app.get('/produto/nome/:nome', controllerProduto.consultaNome)

/* =========================
   ROTAS DE COMPRA
   ========================= */
app.post('/compra', controllerCompra.cadastrar)
app.get('/compra', controllerCompra.listar)
app.put('/compra/:id', controllerCompra.atualizar)
app.delete('/compra/:id', controllerCompra.apagar)
app.get('/compra/:id', controllerCompra.consultaID)

/* =========================
   ROTA INICIAL (teste de conexão)
   ========================= */
app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Aplicação Rodando!!' })
})

/* =========================
   SINCRONIZA MODELOS E INICIA O SERVIDOR
   ========================= */
conn.sync() // Cria as tabelas se não existirem
    .then(() => {
        // Inicia o servidor na porta e IP definidos no .env
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em ${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        // Mostra erro se falhar ao conectar ao banco
        console.error('Erro ao sincronizar com o Banco de Dados', err)
    })
