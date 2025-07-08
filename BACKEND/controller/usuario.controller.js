const Usuario = require('../model/Usuario')

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
try{

}catch(err){
    
}
}

const atualizar = async (req, res) => {

}

const apagar = async (req, res) => {

}

module.exports = { cadastrar, listar, atualizar, apagar }
