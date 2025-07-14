const Compra = require('../model/Compra')

const cadastrar = async (req, res) => {
    const valores = req.body
    try {
        const dados = await Compra.create(valores)
        console.log(dados)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao cadastrar Compra', err)
        res.status(500).json({ message: 'Erro ao cadastrar Compra' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Usuario.findAll()
        console.log(dados)
        res.status(200).json(dados)
    } catch (err) {
        console.error('Erro ao listar os Compra', err)
        res.status(500).json('Erro ao listar os Compras')
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body
    try {
        let dados = await Compra.findByPk(id)
        if (dados === null) {
            res.status(404).json({ message: "Usuario nao encontrado" })
        } else {
            await Compra.update(valores, { where: { id_Compra: id } })
            dados = await Compra.findByPk(id)
            res.status(200).json({ message: 'Dados atualizados', dados })
        }
    } catch (err) {
        console.error('Erro ao atualizar os Compras', err)
        res.status(500).json({ message: 'Erro ao atualizar os Compras' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Compra.findByPk(id)
        if (dados === null) {
            res.status(404).json({ message: 'Compra nao encontrado' })
        } else {
            await Compra.destroy({ where: { id_Compra: id } })
            res.status(200).json({ message: 'Compra excluido' })
            console.log('Compra Excluido')
        }
    } catch (err) {
        console.error('Erro ao apagar o Compra', err)
        res.status(500).json({ message: 'Erro ao apagar o Compra' })
    }
}

const consultaID = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Compra.findByPk(id)
        if (dados === null) {
            res.status(404).json({ message: 'Compra nao encontrado' })
        } else {
            console.log(dados)
            res.status(200).json(dados)
        }
    } catch (err) {
        console.error('Erro ao consultar o id do Compra', err)
        res.status(500).json({ message: 'Erro ao consultar o id do Compra' })
    }
}

module.exports = { cadastrar, listar, atualizar, apagar, consultaID }