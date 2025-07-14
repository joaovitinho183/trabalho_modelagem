const Produto = require('../model/Produto')
const { Op } = require('sequelize')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        const dados = await Produto.create(valores)
        console.log(dados)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao cadastrar produto', err)
        res.status(500).json({ message: 'Erro ao cadastrar produto' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Usuario.findAll()
        console.log(dados)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar os produto', err)
        res.status(500).json('Erro ao listar os produtos')
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body
    try {
        let dados = await Produto.findByPk(id)
        if (dados === null) {
            res.status(404).json({ message: "Usuario nao encontrado" })
        } else {
            await Produto.update(valores, { where: { id_produto: id } })
            dados = await Produto.findByPk(id)
            res.status(200).json({ message: 'Dados atualizados', dados })
        }
    } catch (err) {
        console.error('Erro ao atualizar os produtos', err)
        res.status(500).json({ message: 'Erro ao atualizar os produtos' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Produto.findByPk(id)
        if (dados === null) {
            res.status(404).json({ message: 'Produto nao encontrado' })
        } else {
            await Produto.destroy({ where: { id_produto: id } })
            res.status(200).json({ message: 'Produto excluido' })
            console.log('Produto Excluido')
        }
    } catch (err) {
        console.error('Erro ao apagar o produto', err)
        res.status(500).json({ message: 'Erro ao apagar o produto' })
    }
}

const consultaID = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Produto.findByPk(id)
        if (dados === null) {
            res.status(404).json({ message: 'Produto nao encontrado' })
        } else {
            console.log(dados)
            res.status(200).json(dados)
        }
    } catch (err) {
        console.error('Erro ao consultar o id do Produto', err)
        res.status(500).json({ message: 'Erro ao consultar o id do Produto' })
    }
}

const consultaNome = async (req, res) => {
    const { nome } = req.body
    try {
        const dados = await Produto.findAll({
            where: { titulo: { [Op.like]: `%${nome}%` } }
        })
        if (dados.length === 0) {
            res.status(404).json({ message: 'Usuário não encontrado' })
        } else {
            console.log(dados)
            res.status(200).json(dados)
        }
    } catch (err) {
        console.error('Erro ao consultar o nome', err)
        res.status(500).json({ message: 'Erro ao consultar o nome' })
    }
}

module.exports = { cadastrar, listar, atualizar, apagar, consultaID, consultaNome }