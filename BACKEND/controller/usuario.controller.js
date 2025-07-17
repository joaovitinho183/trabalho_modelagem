const Usuario = require('../model/Usuario')
const { Op } = require('sequelize')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        const dados = await Usuario.create(valores)
        console.log(dados)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao cadastrar usuario', err)
        res.status(500).json({ message: 'Erro ao cadastrar usuario' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Usuario.findAll()
        console.log(dados)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar os dados', err)
        res.status(500).json('Erro ao listar os dados')
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body
    try {
        let dados = await Usuario.findByPk(id)
        if (dados === null) {
            res.status(404).json({ message: "Usuario nao encontrado" })
        } else {
            await Usuario.update(valores, { where: { id_usuario: id } })
            dados = await Usuario.findByPk(id)
            res.status(200).json({ message: 'Dados atualizados', dados })
        }
    } catch (err) {
        console.error('Erro ao atualizar os dados', err)
        res.status(500).json({ message: 'Erro ao atualizar os dados' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Usuario.findByPk(id)
        if (dados === null) {
            res.status(404).json({ message: 'Usuario nao encontrado' })
        } else {
            await Usuario.destroy({ where: { id_usuario: id } })
            res.status(204).json({ message: 'Usuario excluido' })
            console.log('Usuario Excluido')
        }
    } catch (err) {
        console.error('Erro ao apagar o usuario', err)
        res.status(500).json({ message: 'Erro ao apagar o usuario' })
    }
}

const consultaID = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Usuario.findByPk(id)
        if (dados === null) {
            res.status(404).json({ message: 'Usuario nao encontrado' })
        } else {
            console.log(dados)
            res.status(200).json(dados)
        }
    } catch (err) {
        console.error('Erro ao consultar o id', err)
        res.status(500).json({ message: 'Erro ao consultar o id' })
    }
}

const consultaNome = async (req, res) => {
    const { nome } = req.params
    try {
        const dados = await Usuario.findAll({
            where: { primeiroNome: { [Op.like]: `%${nome}%` } }
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