const Produto = require('../model/Produto') // Importa o modelo Produto (estrutura da tabela no banco)
const { Op } = require('sequelize') // Importa operadores pra usar no "like", comparações etc.


// Cadastra um novo produto no banco
const cadastrar = async (req, res) => {
    const valores = req.body // Pega os dados enviados pelo frontend (nome, preço, etc.)
    try {
        const dados = await Produto.create(valores) // Cria o produto no banco
        console.log(dados)
        res.status(200).json(dados) // Retorna o produto salvo
    } catch (err) {
        console.error('Erro ao cadastrar produto', err)
        res.status(500).json({ message: 'Erro ao cadastrar produto' }) // Retorna erro genérico
    }
}


// Lista todos os produtos do banco
const listar = async (req, res) => {
    try {
        const dados = await Produto.findAll() // Busca tudo da tabela de produtos
        console.log(dados)
        res.status(200).json(dados) // Retorna a lista
    } catch (err) {
        console.error('Erro ao listar os produto', err)
        res.status(500).json('Erro ao listar os produtos')
    }
}


// Atualiza os dados de um produto pelo ID
const atualizar = async (req, res) => {
    const id = req.params.id // ID do produto que veio na URL
    const valores = req.body // Novos dados enviados pelo frontend

    try {
        let dados = await Produto.findByPk(id) // Procura o produto no banco
        if (dados === null) {
            res.status(404).json({ message: "Usuario nao encontrado" }) // Se não achou, erro 404
        } else {
            await Produto.update(valores, { where: { id_produto: id } }) // Atualiza no banco
            dados = await Produto.findByPk(id) // Busca de novo pra retornar atualizado
            res.status(200).json({ message: 'Dados atualizados', dados }) // Retorna resultado
        }
    } catch (err) {
        console.error('Erro ao atualizar os produtos', err)
        res.status(500).json({ message: 'Erro ao atualizar os produtos' })
    }
}


// Exclui um produto pelo ID
const apagar = async (req, res) => {
    const id = req.params.id // ID que veio na URL

    try {
        const dados = await Produto.findByPk(id) // Procura no banco
        if (dados === null) {
            res.status(404).json({ message: 'Produto nao encontrado' }) // Não achou? Retorna erro
        } else {
            await Produto.destroy({ where: { id_produto: id } }) // Apaga do banco
            res.status(204).json({ message: 'Produto excluido' }) // Sucesso, sem conteúdo
            console.log('Produto Excluido')
        }
    } catch (err) {
        console.error('Erro ao apagar o produto', err)
        res.status(500).json({ message: 'Erro ao apagar o produto' })
    }
}


// Consulta um produto específico pelo ID
const consultaID = async (req, res) => {
    const id = req.params.id

    try {
        const dados = await Produto.findByPk(id) // Busca no banco usando o ID
        if (dados === null) {
            res.status(404).json({ message: 'Produto nao encontrado' })
        } else {
            console.log(dados)
            res.status(200).json(dados) // Retorna o produto encontrado
        }
    } catch (err) {
        console.error('Erro ao consultar o id do Produto', err)
        res.status(500).json({ message: 'Erro ao consultar o id do Produto' })
    }
}

// Busca produtos pelo nome (ou parte do nome)
const consultaNome = async (req, res) => {
    const { nome } = req.params // Nome que veio na URL

    try {
        const dados = await Produto.findAll({
            where: { titulo: { [Op.like]: `%${nome}%` } } // Busca que "contém" esse nome
        })

        if (dados.length === 0) {
            res.status(404).json({ message: 'Produto não encontrado' }) // Se não achou nada
        } else {
            console.log(dados)
            res.status(200).json(dados) // Retorna os produtos encontrados
        }
    } catch (err) {
        console.error('Erro ao consultar o nome', err)
        res.status(500).json({ message: 'Erro ao consultar o nome' })
    }
}

// Exporta todas as funções pra usar nas rotas
module.exports = { cadastrar, listar, atualizar, apagar, consultaID, consultaNome }
