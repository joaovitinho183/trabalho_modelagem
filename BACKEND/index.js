require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')

const hostname = process.env.DB_HOST
const PORT = process.env.PORT

const conn = require('./bd/conn')
const controllerUsuario = require('./controller/usuario.controller')
const controllerProduto = require('./controller/produto.controller')
const controllerCompra = require('./controller/compra.controller')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.post('/usuario', controllerUsuario.cadastrar)
app.get('/usuario', controllerUsuario.listar)
app.put('/usuario/:id', controllerUsuario.atualizar)
app.delete('/usuario/:id', controllerUsuario.apagar)
app.delete('/usuario/:id', controllerUsuario.consultaID)
app.delete('/usuario/:id', controllerUsuario.consultaNome)

app.post('/produto', controllerProduto.cadastrar)
app.get('/produto', controllerProduto.listar)
app.put('/produto/:id', controllerProduto.atualizar)
app.delete('/produto/:id', controllerProduto.apagar)
app.delete('/produto/:id', controllerProduto.consultaID)
app.delete('/produto/:id', controllerProduto.consultaNome)

app.post('/compra', controllerCompra.cadastrar)
app.get('/compra', controllerCompra.listar)
app.put('/compra/:id', controllerCompra.atualizar)
app.delete('/compra/:id', controllerCompra.apagar)
app.delete('/compra/:id', controllerCompra.consultaID)

app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Aplicação Rodando!!' })
})

conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em ${hostname}:${PORT}`)
        })
    })
    .catch((err)=>{
        console.error('Erro ao sincronizar com o Banco de Dados',err)
    })