const resCadastrar = document.getElementById('resCadastrar')
const resListar = document.getElementById('resListar')
const resAtualizar = document.getElementById('resAtualizar')
const resApagar = document.getElementById('resApagar')

const btnCadastrar = document.getElementById('btnCadastrar')
const btnPovoar = document.getElementById('btnPovoar')
const btnListar = document.getElementById('btnListar')
const btnAtualizar = document.getElementById('btnAtualizar')
const btnApagar = document.getElementById('btnApagar')

// Evento para cadastrar uma nova compra
btnCadastrar.addEventListener('click', async (e) => {
    e.preventDefault() // Evita recarregar a página

    // Pega os valores dos inputs e converte para números quando necessário
    let cod_usuario = Number(document.getElementById('cod_usuario').value)
    let cod_produto = Number(document.getElementById('cod_produto').value)
    let quantidade = Number(document.getElementById('quantidade').value)
    let dataCompra = document.getElementById('dataCompra').value
    let formaPagamento = document.getElementById('formaPagamento').value
    let statusCompra = document.getElementById('statusCompra').value

    // Busca o produto para calcular preço unitário, desconto e preço final
    const { precoU, descontoAplica, precoFinal } = await BuscarProduto(cod_produto, quantidade)

    // Monta objeto com os dados a serem enviados para o backend
    const valores = {
        quantidade,
        dataCompra,
        precoU,
        descontoAplica: descontoAplica.toFixed(2), // limita o desconto a 2 casas decimais
        precoFinal,
        formaPagamento,
        statusCompra,
        cod_usuario,
        cod_produto
    }

    resCadastrar.innerHTML = '' // limpa mensagens anteriores

    // Envia os dados para o backend via POST
    fetch(`http://localhost:3000/compra`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(dados => {
            console.log(dados)
            resCadastrar.innerHTML += `Compra Cadastrada com Sucesso!!!`
        })
        .catch(err => {
            console.error('erro ao cadastrar a compra', err)
        })
})

// Evento para listar todas as compras
btnListar.addEventListener('click', () => {
    resListar.innerHTML = '' // limpa a área antes de listar

    fetch(`http://localhost:3000/compra`)
        .then(resp => resp.json())
        .then(dados => {
            // Monta a tabela com os dados recebidos
            let tabela = `
                <table>
                    <thead>
                        <tr>
                            <th>Código Compra</th>
                            <th>Código Usuario</th>
                            <th>Código Produto</th>
                            <th>Quantidade</th>
                            <th>Data Compra</th>
                            <th>Preço Unitario</th>
                            <th>Percentual Desconto</th>
                            <th>Preço Final</th>
                            <th>Forma de pagamento</th>
                            <th>Status Da Compra</th>
                        </tr>
                    </thead>
                    <tbody>
            `

            dados.forEach(dad => {
                tabela += `
                    <tr>
                        <td data-label="Código Compra">${dad.id_compra}</td>
                        <td data-label="Código Usuario">${dad.cod_usuario}</td>
                        <td data-label="Código Produto">${dad.cod_produto}</td>
                        <td data-label="Quantidade">${dad.quantidade}</td>
                        <td data-label="Data Compra">${dad.dataCompra}</td>
                        <td data-label="Preço Unitario">${dad.precoU}</td>
                        <td data-label="Percentual Desconto">${dad.descontoAplica}</td>
                        <td data-label="Preço Final">${dad.precoFinal}</td>
                        <td data-label="Forma de pagamento">${dad.formaPagamento}</td>
                        <td data-label="Status Da Compra">${dad.statusCompra}</td>
                    </tr>
                `
            })

            tabela += `</tbody></table>`
            resListar.innerHTML = tabela // exibe a tabela na página
        })
        .catch(err => {
            console.error('erro ao listar a compra', err)
        })
})

// Evento para atualizar uma compra existente
btnAtualizar.addEventListener('click', async (e) => {
    e.preventDefault()

    // Pega os dados do formulário para atualizar a compra
    let id_compra = Number(document.getElementById('id_compraUpd').value)
    let cod_usuario = Number(document.getElementById('cod_usuarioUpd').value)
    let cod_produto = Number(document.getElementById('cod_produtoUpd').value)
    let quantidade = Number(document.getElementById('quantidadeUpd').value)
    let dataCompra = document.getElementById('dataCompraUpd').value
    let formaPagamento = document.getElementById('formaPagamentoUpd').value
    let statusCompra = document.getElementById('statusCompraUpd').value

    // Busca dados do produto para recalcular valores
    const { precoU, descontoAplica, precoFinal } = await BuscarProduto(cod_produto, quantidade)

    const valores = {
        quantidade,
        dataCompra,
        precoU,
        descontoAplica: descontoAplica.toFixed(2),
        precoFinal,
        formaPagamento,
        statusCompra,
        cod_usuario,
        cod_produto
    }

    resAtualizar.innerHTML = '' // limpa mensagens anteriores

    // Envia a atualização via PUT para o backend
    fetch(`http://localhost:3000/compra/${id_compra}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(dados => {
            console.log(dados)
            resAtualizar.innerHTML += `Compra Atualizada com Sucesso!!!`
        })
        .catch(err => {
            console.error('erro ao atualizar a compra', err)
        })
})

// Evento para apagar uma compra pelo ID
btnApagar.addEventListener('click', (e) => {
    e.preventDefault()

    let id_compra = Number(document.getElementById('id_compraDelet').value)
    console.log(id_compra)

    resApagar.innerHTML = '' // limpa mensagens anteriores

    // Requisição DELETE para apagar a compra
    fetch(`http://localhost:3000/compra/${id_compra}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resp => {
            // Se status 204, exclusão foi bem-sucedida
            if (resp.status === 204) {
                resApagar.innerHTML += `A Compra foi Excluida!!!`
            } else {
                resApagar.innerHTML += `Compra não encontrada`
            }
        })
        .catch(err => {
            console.error('erro ao apagar a compra', err)
        })
})

// Função para buscar dados do produto e calcular preço, desconto e preço final
async function BuscarProduto(id_produto, quantidade) {
    try {
        // Busca o produto pelo id
        const produtoBruto = await fetch(`http://localhost:3000/produto/${id_produto}`)
        const resposta = await produtoBruto.json()

        // Se produto encontrado (não tem mensagem de erro)
        if (!resposta.message) {
            const precoU = Number(resposta.preco) // preço unitário
            const precoFinal = precoU * quantidade // preço total sem desconto
            // Calcula desconto percentual sobre o preço final
            const descontoAplica = precoFinal * resposta.percentualDesconto / 100

            // Retorna os valores calculados
            return { precoU, descontoAplica, precoFinal }
        } else {
            return null // Produto não encontrado
        }
    } catch (err) {
        console.error('Erro ao buscar produto', err)
        return null // Em caso de erro na requisição
    }
}
