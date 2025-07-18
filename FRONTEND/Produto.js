const resCadastrar = document.getElementById('resCadastrar')
const resListar = document.getElementById('resListar')
const resAtualizar = document.getElementById('resAtualizar')
const resApagar = document.getElementById('resApagar')
const resBuscarID = document.getElementById('resBuscarID')
const resBuscarN = document.getElementById('resBuscarN')

const btnCadastrar = document.getElementById('btnCadastrar')
const btnPovoar = document.getElementById('btnPovoar')
const btnListar = document.getElementById('btnListar')
const btnAtualizar = document.getElementById('btnAtualizar')
const btnApagar = document.getElementById('btnApagar')
const btnBuscarID = document.getElementById('btnBuscarID')
const btnBuscarN = document.getElementById('btnBuscarN')

btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault()
    let titulo = document.getElementById('titulo').value
    let descricao = document.getElementById('descricao').value
    let categoria = Number(document.getElementById('categoria').value)
    let preco = Number(document.getElementById('preco').value)
    let percentualDesconto = Number(document.getElementById('percentualDesconto').value)
    let estoque = Number(document.getElementById('estoque').value)
    let marca = document.getElementById('marca').value
    let imagem = document.getElementById('imagem').value

    const valores = {
        titulo: titulo,
        descricao: descricao,
        categoria: categoria,
        preco: preco,
        percentualDesconto: percentualDesconto,
        estoque: estoque,
        marca: marca,
        imagem: imagem
    }
    resCadastrar.innerHTML = ''

    fetch(`http://localhost:3000/produto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(dados => {
            resCadastrar.innerHTML += `Produto Cadastrado com Sucesso!!!`
        })
        .catch((err) => {
            console.error('erro ao cadastrar o produto', err)
        })
})

btnPovoar.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const api = await fetch('https://dummyjson.com/products');
        const { products } = await api.json();
        console.log(products)

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
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
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(valores)
            });
        }

        resCadastrar.innerHTML = `Lote de produtos cadastrado com sucesso!`;

    } catch (err) {
        console.error('Erro ao cadastrar o lote de produtos:', err);
        resCadastrar.innerHTML = `<p style="color:red;">Erro ao cadastrar o lote de produtos.</p>`;
    }
});



btnListar.addEventListener('click', () => {
    resListar.innerHTML = '';

    fetch(`http://localhost:3000/produto`)
        .then(resp => resp.json())
        .then(dados => {
            let tabela = `
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Titulo</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
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

btnBuscarID.addEventListener('click', (e) => {
    e.preventDefault();
    let id_produto = Number(document.getElementById('id_produtoBID').value);
    resBuscarID.innerHTML = '';

    fetch(`http://localhost:3000/produto/${id_produto}`)
        .then(resp => resp.json())
        .then(dados => {
            let tabela = `
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Titulo</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>Preço Unitario</th>
                            <th>Percentual Desconto</th>
                            <th>Estoque</th>
                            <th>Marca</th>
                            <th>Imagem</th>
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
                        <td data-label="Imagem"><img src="${dados.imagem}" alt="" width="65px"></td>
                    </tr>
                    </tbody>
                </table>
            `;
            resBuscarID.innerHTML = tabela;
        })
        .catch((err) => {
            console.error('Erro ao buscar produto por ID:', err);
            resBuscarID.innerHTML = `<p style="color: red;">Erro ao buscar produto por ID.</p>`;
        });
});

btnBuscarN.addEventListener('click', (e) => {
    e.preventDefault();
    let titulo = document.getElementById('tituloBN').value;
    resBuscarN.innerHTML = '';

    fetch(`http://localhost:3000/produto/nome/${titulo}`)
        .then(resp => resp.json())
        .then(dados => {
            let tabela = `
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Titulo</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
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

            tabela += `
                    </tbody>
                </table>
            `;

            resBuscarN.innerHTML = tabela;
        })
        .catch((err) => {
            console.error('Erro ao buscar produto pelo titulo:', err);
            resBuscarN.innerHTML = `<p style="color: red;">Erro ao buscar produto pelo titulo.</p>`;
        });
});