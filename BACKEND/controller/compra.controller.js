const Compra = require('../model/Compra') // Puxa o modelo Compra (estrutura da tabela do banco)

// Função para cadastrar uma nova compra
const cadastrar = async (req, res) => {
    const valores = req.body; // Pega os dados enviados pelo frontend
    console.log("Dados recebidos no backend:", valores);

    try {
        // Tenta criar a compra no banco usando os dados recebidos
        const dados = await Compra.create(valores);
        console.log("Compra criada:", dados);
        res.status(200).json(dados); // Retorna os dados da compra criada com sucesso
    } catch (err) {
        // Se der erro, mostra no console e retorna erro 500
        console.error('Erro ao cadastrar Compra:', err.message || err);
        res.status(500).json({ message: 'Erro ao cadastrar Compra', erro: err.message });
    }
};

// Função para listar todas as compras
const listar = async (req, res) => {
    try {
        const dados = await Compra.findAll(); // Busca tudo no banco
        console.log(dados);
        res.status(200).json(dados); // Retorna a lista de compras
    } catch (err) {
        console.error('Erro ao listar os Compra', err); // Mostra erro no console
        res.status(500).json('Erro ao listar os Compras'); // Retorna erro genérico
    }
}

// Função para atualizar uma compra existente
const atualizar = async (req, res) => {
    const id = req.params.id; // Pega o ID passado na URL
    const valores = req.body; // Novos dados enviados

    try {
        let dados = await Compra.findByPk(id); // Verifica se a compra existe
        if (dados === null) {
            // Se não achar, retorna erro 404
            res.status(404).json({ message: "Usuario nao encontrado" });
        } else {
            // Se achou, atualiza os dados no banco
            await Compra.update(valores, { where: { id_Compra: id } });
            dados = await Compra.findByPk(id); // Busca de novo os dados atualizados
            res.status(200).json({ message: 'Dados atualizados', dados }); // Retorna os novos dados
        }
    } catch (err) {
        console.error('Erro ao atualizar os Compras', err);
        res.status(500).json({ message: 'Erro ao atualizar os Compras' });
    }
}

// Função para apagar uma compra pelo ID
const apagar = async (req, res) => {
    const id = req.params.id; // ID passado na URL

    try {
        const dados = await Compra.findByPk(id); // Verifica se existe
        if (dados === null) {
            res.status(404).json({ message: 'Compra nao encontrado' }); // Se não existe, erro 404
        } else {
            await Compra.destroy({ where: { id_Compra: id } }); // Apaga a compra
            res.status(204).json({ message: 'Compra excluida' }); // Retorna sucesso sem conteúdo
            console.log('Compra Excluida');
        }
    } catch (err) {
        console.error('Erro ao apagar a Compra', err);
        res.status(500).json({ message: 'Erro ao apagar a Compra' });
    }
}

// Função para consultar uma compra específica pelo ID
const consultaID = async (req, res) => {
    const id = req.params.id;

    try {
        const dados = await Compra.findByPk(id); // Busca a compra pelo ID
        if (dados === null) {
            res.status(404).json({ message: 'Compra nao encontrado' }); // Não achou = erro 404
        } else {
            console.log(dados);
            res.status(200).json(dados); // Retorna a compra achada
        }
    } catch (err) {
        console.error('Erro ao consultar o id do Compra', err);
        res.status(500).json({ message: 'Erro ao consultar o id do Compra' });
    }
}

// Exporta todas as funções pra serem usadas em outros arquivos
module.exports = { cadastrar, listar, atualizar, apagar, consultaID }
