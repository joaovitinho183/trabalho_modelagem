// Referências aos elementos HTML onde as respostas serão exibidas
const resCadastrar = document.getElementById('resCadastrar')
const resListar = document.getElementById('resListar')
const resAtualizar = document.getElementById('resAtualizar')
const resApagar = document.getElementById('resApagar')
const resBuscarID = document.getElementById('resBuscarID')
const resBuscarN = document.getElementById('resBuscarN')

// Referências aos botões para ações CRUD e buscas
const btnCadastrar = document.getElementById('btnCadastrar')
const btnPovoar = document.getElementById('btnPovoar')
const btnListar = document.getElementById('btnListar')
const btnAtualizar = document.getElementById('btnAtualizar')
const btnApagar = document.getElementById('btnApagar')
const btnBuscarID = document.getElementById('btnBuscarID')
const btnBuscarN = document.getElementById('btnBuscarN')

// Evento para cadastrar um novo produto
btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault()
    // Coleta valores dos inputs do formulário
    let titulo = document.getElementById('titulo').value
    let descricao = document.getElementById('descricao').value
    let categoria = document.getElementById('categoria').value
    let preco = Number(document.getElementById('preco').value)
    let percentualDesconto = Number(document.getElementById('percentualDesconto').value)
    let estoque = Number(document.getElementById('estoque').value)
    let marca = document.getElementById('marca').value
    let imagem = document.getElementById('imagem').value

    // Monta objeto com dados para envio
    const valores = {
        titulo,
        descricao,
        categoria,
        preco,
        percentualDesconto,
        estoque,
        marca,
        imagem
    }

    resCadastrar.innerHTML = '' // Limpa mensagem anterior

    // Envia POST para API criar novo produto
    fetch(`http://localhost:3000/produto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(() => {
            resCadastrar.innerHTML = `Produto Cadastrado com Sucesso!!!`
        })
        .catch(err => {
            console.error('erro ao cadastrar o produto', err)
        })
})

// Evento para povoar a base com produtos externos (dummyjson)
btnPovoar.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        // Busca produtos da API dummyjson
        const api = await fetch('https://dummyjson.com/products');
        const { products } = await api.json();

        // Itera e cadastra cada produto na API local via POST
        for (let product of products) {
            const valores = {
                titulo: product.title,
                descricao: product.description,
                categoria: product.category,
                preco: product.price,
                percentualDesconto: product.discountPercentage,
                estoque: product.stock,
                marca: product.brand || 'Sem Marca',
                imagem: product.images[0]
            };

            await fetch(`http://localhost:3000/produto`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(valores)
            });
        }

        resCadastrar.innerHTML = `Lote de produtos cadastrado com sucesso!`;
    } catch (err) {
        console.error('Erro ao cadastrar o lote de produtos:', err);
        resCadastrar.innerHTML = `<p style="color:red;">Erro ao cadastrar o lote de produtos.</p>`;
    }
});

// Evento para listar todos os produtos
btnListar.addEventListener('click', () => {
    resListar.innerHTML = ''; // limpa conteúdo antigo

    // Busca todos os produtos via GET
    fetch(`http://localhost:3000/produto`)
        .then(resp => resp.json())
        .then(dados => {
            // Monta tabela HTML para exibir os produtos
            let tabela = `
                <table>
                    <thead>
                        <tr>
                            <th>Código</th><th>Titulo</th><th>Descrição</th><th>Categoria</th>
                            <th>Preço Unitario</th><th>Percentual Desconto</th><th>Estoque</th>
                            <th>Marca</th><th>Imagem</th>
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
                        <td data-label="Imagem"><img src="${dad.imagem}" width="65px"></td>
                    </tr>
                `;
            });

            tabela += `</tbody></table>`;
            resListar.innerHTML = tabela; // Exibe tabela
        })
        .catch(err => {
            console.error('erro ao listar o produto', err)
        });
});

// Evento para atualizar um produto pelo ID
btnAtualizar.addEventListener('click', (e) => {
    e.preventDefault()

    // Coleta dados atualizados do formulário
    let id_produto = Number(document.getElementById('id_produtoUpd').value)
    let titulo = document.getElementById('tituloUpd').value
    let descricao = document.getElementById('descricaoUpd').value
    let categoria = document.getElementById('categoriaUpd').value
    let preco = Number(document.getElementById('precoUpd').value)
    let percentualDesconto = Number(document.getElementById('percentualDescontoUpd').value)
    let estoque = Number(document.getElementById('estoqueUpd').value)
    let marca = document.getElementById('marcaUpd').value
    let imagem = document.getElementById('imagemUpd').value

    // Monta objeto com dados para envio
    const valores = {
        id_produto,
        titulo,
        descricao,
        categoria,
        preco,
        percentualDesconto,
        estoque,
        marca,
        imagem
    }

    resAtualizar.innerHTML = ''

    // Envia PUT para atualizar produto pelo ID
    fetch(`http://localhost:3000/produto/${id_produto}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(() => {
            resAtualizar.innerHTML = `Produto Atualizado com Sucesso!!!`
        })
        .catch(err => {
            console.error('erro ao atualizar o produto', err)
        })
})

// Evento para apagar um produto pelo ID
btnApagar.addEventListener('click', (e) => {
    e.preventDefault()
    let id_produto = Number(document.getElementById('id_produtoDelet').value)
    resApagar.innerHTML = ''

    // Envia DELETE para remover produto
    fetch(`http://localhost:3000/produto/${id_produto}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resp => {
            if (resp.status === 204) {
                resApagar.innerHTML = `O Produto foi Excluido!!!`
            } else {
                resApagar.innerHTML = `Produto não encontrado`
            }
        })
        .catch(err => {
            console.error('erro ao apagar o produto', err)
        })
})

// Evento para buscar um produto pelo ID
btnBuscarID.addEventListener('click', (e) => {
    e.preventDefault()
    let id_produto = Number(document.getElementById('id_produtoBID').value)
    resBuscarID.innerHTML = ''

    // Busca produto via GET pelo ID
    fetch(`http://localhost:3000/produto/${id_produto}`)
        .then(resp => resp.json())
        .then(dados => {
            // Monta tabela com o produto encontrado
            let tabela = `
            <table>
                <thead>
                    <tr>
                        <th>Código</th><th>Titulo</th><th>Descrição</th><th>Categoria</th>
                        <th>Preço Unitario</th><th>Percentual Desconto</th><th>Estoque</th><th>Marca</th><th>Imagem</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="Código">${dados.id_produto}</td>
                        <td data-label="Titulo">${dados.titulo}</td>
                        <td data-label="Descrição">${dados.descricao}</td>
                        <td data-label="Categoria">${dados.categoria}</td>
                        <td data-label="Preço Unitario">${dados.preco}</td>
                        <td data-label="Percentual Desconto">${dados.percentualDesconto}</td>
                        <td data-label="Estoque">${dados.estoque}</td>
                        <td data-label="Marca">${dados.marca}</td>
                        <td data-label="Imagem"><img src="${dados.imagem}" width="65px"></td>
                    </tr>
                </tbody>
            </table>
        `
            resBuscarID.innerHTML = tabela
        })
        .catch(err => {
            console.error('Erro ao buscar produto por ID:', err)
            resBuscarID.innerHTML = `<p style="color: red;">Erro ao buscar produto por ID.</p>`
        })
})

// Evento para buscar produtos pelo título (nome)
btnBuscarN.addEventListener('click', (e) => {
    e.preventDefault()
    let titulo = document.getElementById('tituloBN').value
    resBuscarN.innerHTML = ''

    // Busca produtos cujo título contenha o termo informado
    fetch(`http://localhost:3000/produto/nome/${titulo}`)
        .then(resp => resp.json())
        .then(dados => {
            // Monta tabela com os produtos encontrados
            let tabela = `
            <table>
                <thead>
                    <tr>
                        <th>Código</th><th>Titulo</th><th>Descrição</th><th>Categoria</th>
                        <th>Preço Unitario</th><th>Percentual Desconto</th><th>Estoque</th><th>Marca</th><th>Imagem</th>
                    </tr>
                </thead>
                <tbody>
        `

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
                    <td data-label="Imagem"><img src="${dad.imagem}" width="65px"></td>
                </tr>
            `
            })

            tabela += `</tbody></table>`
            resBuscarN.innerHTML = tabela
        })
        .catch(err => {
            console.error('Erro ao buscar produto pelo titulo:', err)
            resBuscarN.innerHTML = `<p style="color: red;">Erro ao buscar produto pelo titulo.</p>`
        })
})
