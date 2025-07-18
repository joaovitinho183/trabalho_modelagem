// Importa o modelo de dados da tabela 'Usuario'
const Usuario = require('../model/Usuario')

// Importa o operador 'like' do Sequelize para fazer buscas por nome
const { Op } = require('sequelize')

const cadastrar = async (req, res) => {
    const valores = req.body // Recebe os dados enviados pelo front-end

    try {
        const dados = await Usuario.create(valores) // Cria o usuário no banco
        console.log(dados) // Exibe no terminal o que foi inserido
        res.status(200).json(dados) // Retorna os dados como resposta
    } catch (err) {
        // Se der erro na criação, mostra no terminal e envia mensagem de erro
        console.error('Erro ao cadastrar usuario', err)
        res.status(500).json({ message: 'Erro ao cadastrar usuario' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Usuario.findAll() // Busca todos os registros no banco
        console.log(dados) // Mostra os dados no terminal
        res.status(200).json(dados) // Retorna os dados como JSON
    } catch (err) {
        // Se algo der errado, exibe erro no console e retorna erro ao front
        console.error('Erro ao listar os dados', err)
        res.status(500).json('Erro ao listar os dados')
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id // Pega o ID da URL (parâmetro)
    const valores = req.body // Novos dados enviados no corpo da requisição

    try {
        let dados = await Usuario.findByPk(id) // Busca o usuário pelo ID

        if (dados === null) {
            // Se não encontrar, responde com erro 404
            res.status(404).json({ message: "Usuario nao encontrado" })
        } else {
            // Atualiza os dados na tabela
            await Usuario.update(valores, { where: { id_usuario: id } })
            // Busca novamente para mostrar o que foi alterado
            dados = await Usuario.findByPk(id)
            res.status(200).json({ message: 'Dados atualizados', dados })
        }
    } catch (err) {
        console.error('Erro ao atualizar os dados', err)
        res.status(500).json({ message: 'Erro ao atualizar os dados' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id // Pega o ID da URL

    try {
        const dados = await Usuario.findByPk(id) // Procura o usuário

        if (dados === null) {
            // Se não achar, retorna erro 404
            res.status(404).json({ message: 'Usuario nao encontrado' })
        } else {
            // Se achou, deleta o registro
            await Usuario.destroy({ where: { id_usuario: id } })
            console.log('Usuario Excluido')
            res.status(204).json({ message: 'Usuario excluido' }) // 204 = sucesso sem conteúdo
        }
    } catch (err) {
        console.error('Erro ao apagar o usuario', err)
        res.status(500).json({ message: 'Erro ao apagar o usuario' })
    }
}

const consultaID = async (req, res) => {
    const id = req.params.id // Pega o ID da URL

    try {
        const dados = await Usuario.findByPk(id) // Busca o usuário pelo ID

        if (dados === null) {
            res.status(404).json({ message: 'Usuario nao encontrado' }) // Retorna erro se não encontrar
        } else {
            console.log(dados) // Mostra os dados no terminal
            res.status(200).json(dados) // Retorna os dados como JSON
        }
    } catch (err) {
        console.error('Erro ao consultar o id', err)
        res.status(500).json({ message: 'Erro ao consultar o id' })
    }
}

const consultaNome = async (req, res) => {
    const { nome } = req.params // Pega o nome da URL como parâmetro

    try {
        const dados = await Usuario.findAll({
            where: {
                primeiroNome: {
                    [Op.like]: `%${nome}%` // Busca nomes que contenham a palavra
                }
            }
        })

        if (dados.length === 0) {
            res.status(404).json({ message: 'Usuário não encontrado' }) // Se nenhum encontrado
        } else {
            console.log(dados) // Exibe os dados encontrados
            res.status(200).json(dados) // Retorna os dados
        }
    } catch (err) {
        console.error('Erro ao consultar o nome', err)
        res.status(500).json({ message: 'Erro ao consultar o nome' })
    }
}

module.exports = { cadastrar, listar, atualizar, apagar, consultaID, consultaNome }
