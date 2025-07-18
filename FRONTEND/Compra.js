const resCadastrar = document.getElementById('resCadastrar')
const resListar = document.getElementById('resListar')
const resAtualizar = document.getElementById('resAtualizar')
const resApagar = document.getElementById('resApagar')

const btnCadastrar = document.getElementById('btnCadastrar')
const btnPovoar = document.getElementById('btnPovoar')
const btnListar = document.getElementById('btnListar')
const btnAtualizar = document.getElementById('btnAtualizar')
const btnApagar = document.getElementById('btnApagar')

btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault()
    let cod_usuario = Number(document.getElementById('cod_usuario').value)
    let cod_produto = Number(document.getElementById('cod_produto').value)
    let quantidade = Number(document.getElementById('quantidade').value)
    let dataCompra = Date(document.getElementById('dataCompra').value)
    let formaPagamento = document.getElementById('formaPagamento').value

    const valores = {
        quantidade: quantidade,
        dataCompra: dataCompra,
        formaPagamento: formaPagamento,
        cod_usuario: cod_usuario,
        cod_produto: cod_produto
    }
    resCadastrar.innerHTML = ''

    fetch(`http://localhost:3000/compra`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(dados => {
            resCadastrar.innerHTML += `Compra Cadastrada com Sucesso!!!`
        })
        .catch((err) => {
            console.error('erro ao cadastrar a compra', err)
        })
})

btnListar.addEventListener('click', () => {
    resListar.innerHTML = '';

    fetch(`http://localhost:3000/produto`)
        .then(resp => resp.json())
        .then(dados => {
            let tabela = `
                <table>
                    <thead>
                        <tr>
                            <th>Código Compra</th>
                            <th>Código Usuario</th>
                            <th>Código Produto</th>
                            <th>Quantidade</th>
                            <th>Preço Unitario</th>
                            <th>Percentual Desconto</th>
                            <th>Estoque</th>
                            <th>Marca</th>
                            <th>Imagem</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            dados.forEach(dad => {
                tabela += `
                    <tr>
                        <td data-label="Código">${dad.id_produto}</td>
                        <td data-label="Titulo">${dad.titulo}</td>
                        <td data-label="Descrição">${dad.descricao}</td>
                        <td data-label="Categoria">${dad.categoria}</td>
                        <td data-label="Preço Unitario">${dad.preco}</td>
                        <td data-label="Percentual Desconto">${dad.percentualDesconto}</td>
                        <td data-label="Estoque">${dad.estoque}</td>
                        <td data-label="Marca">${dad.marca}</td>
                        <td data-label="Imagem"><img src="${dad.imagem}" alt="" width="65px"></td>
                    </tr>
                `;
            });

            tabela += `</tbody></table>`;
            resListar.innerHTML = tabela;
        })
        .catch((err) => {
            console.error('erro ao listar o produto', err)
        });
});

btnAtualizar.addEventListener('click', (e) => {
    e.preventDefault()
    let id_produto = Number(document.getElementById('id_produtoUpd').value)
    let titulo = document.getElementById('tituloUpd').value
    let descricao = document.getElementById('descricaoUpd').value
    let categoria = Number(document.getElementById('categoriaUpd').value)
    let preco = Number(document.getElementById('precoUpd').value)
    let percentualDesconto = Number(document.getElementById('percentualDescontoUpd').value)
    let estoque = Number(document.getElementById('estoqueUpd').value)
    let marca = document.getElementById('marcaUpd').value
    let imagem = document.getElementById('imagemUpd').value

    const valores = {
        id_produto: id_produto,
        titulo: titulo,
        descricao: descricao,
        categoria: categoria,
        preco: preco,
        percentualDesconto: percentualDesconto,
        estoque: estoque,
        marca: marca,
        imagem: imagem
    }
    resAtualizar.innerHTML = ''

    fetch(`http://localhost:3000/produto/${id_produto}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(dados => {
            resAtualizar.innerHTML += `Produto Atualizado com Sucesso!!!`
        })
        .catch((err) => {
            console.error('erro ao atualizar o produto', err)
        })
})

btnApagar.addEventListener('click', (e) => {
    e.preventDefault()
    let id_produto = Number(document.getElementById('id_produtoDelet').value)
    console.log(id_produto)
    resApagar.innerHTML = ''

    fetch(`http://localhost:3000/produto/${id_produto}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => {
            if (resp.status === 204) {
                resApagar.innerHTML += `O Produto foi Excluido!!!`
            } else {
                resApagar.innerHTML += `Produto não encontrado`
            }
        })
        .catch((err) => {
            console.error('erro ao apagar o produto', err)
        })
})