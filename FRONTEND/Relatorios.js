// Ao carregar o DOM, executa todas as funções para gerar os relatórios
window.addEventListener("DOMContentLoaded", async () => {
    await gerarRelatorioUsuarios()        // Gera tabela com dados dos usuários
    await gerarRelatorioProdutos()        // Gera tabela com dados dos produtos
    await gerarRelatorioCompras()         // Gera tabela com dados das compras
    await gerarRelatorioEstoqueCritico()  // Gera tabela com produtos com estoque baixo (<10)
    await gerarRelatorioConsolidado()     // Gera tabela consolidada com dados de compra + usuário + produto
})

// Função genérica para criar uma tabela HTML a partir de cabeçalhos e dados
function criarTabela(headers, dados) {
    let tabela = "<table><thead><tr>"
    // Monta a linha de cabeçalho usando os headers
    headers.forEach(h => tabela += `<th>${h}</th>`)
    tabela += "</tr></thead><tbody>"

    // Para cada linha de dados, cria uma linha <tr> com várias células <td>
    dados.forEach(linha => {
        tabela += "<tr>"
        linha.forEach(celula => tabela += `<td>${celula}</td>`)
        tabela += "</tr>"
    })

    tabela += "</tbody></table>"
    return tabela  // Retorna a tabela pronta como string HTML
}

// Gera relatório de usuários e insere na div #relUsuarios
async function gerarRelatorioUsuarios() {
    const res = await fetch("http://localhost:3000/usuario").then(r => r.json())
    const headers = ["Nome", "Idade", "E-mail", "Cidade", "Estado"]

    // Mapeia os dados para o formato esperado na tabela (array de arrays)
    const linhas = res.map(u => [
        `${u.primeiroNome} ${u.sobrenome}`, // nome completo
        u.idade,
        u.email,
        u.cidade,
        u.estado
    ])

    // Insere a tabela HTML gerada no elemento com id 'relUsuarios'
    document.getElementById("relUsuarios").innerHTML = criarTabela(headers, linhas)
}

// Gera relatório de produtos e insere na div #relProdutos
async function gerarRelatorioProdutos() {
    const res = await fetch("http://localhost:3000/produto").then(r => r.json())
    const headers = ["Título", "Categoria", "Preço Original (R$)", "Desconto (%)", "Valor Final (R$)"]

    // Calcula valor final já com desconto para cada produto e formata valores decimais
    const linhas = res.map(p => [
        p.titulo,
        p.categoria,
        p.preco.toFixed(2),
        p.percentualDesconto,
        (p.preco * (1 - p.percentualDesconto / 100)).toFixed(2)  // preço com desconto
    ])

    document.getElementById("relProdutos").innerHTML = criarTabela(headers, linhas)
}

// Gera relatório de compras com informações dos usuários e produtos associados
async function gerarRelatorioCompras() {
    const res = await fetch("http://localhost:3000/compra").then(r => r.json())
    const usuarios = await fetch("http://localhost:3000/usuario").then(r => r.json())
    const produtos = await fetch("http://localhost:3000/produto").then(r => r.json())

    const headers = ["ID", "Usuário", "Produto", "Qtd", "Data", "Preço Final (R$)"]

    // Para cada compra, associa os dados do usuário e produto via busca pelo ID
    const linhas = res.map(c => {
        const u = usuarios.find(u => u.id_usuario === c.cod_usuario)
        const p = produtos.find(p => p.id_produto === c.cod_produto)
        return [
            c.id_compra,
            `${u?.primeiroNome} ${u?.sobrenome}` || "Desconhecido", // Caso usuário não exista
            p?.titulo || "Desconhecido",                             // Caso produto não exista
            c.quantidade,
            c.dataCompra,
            c.precoFinal.toFixed(2)
        ]
    })

    document.getElementById("relCompras").innerHTML = criarTabela(headers, linhas)
}

// Gera relatório de produtos com estoque crítico (estoque menor que 10)
async function gerarRelatorioEstoqueCritico() {
    const res = await fetch("http://localhost:3000/produto").then(r => r.json())
    const criticos = res.filter(p => p.estoque < 10)  // Filtra produtos com estoque baixo
    const headers = ["Título", "Estoque", "Categoria"]

    const linhas = criticos.map(p => [p.titulo, p.estoque, p.categoria])
    document.getElementById("relEstoqueCritico").innerHTML = criarTabela(headers, linhas)
}

// Gera relatório consolidado juntando dados de compras, usuários e produtos
async function gerarRelatorioConsolidado() {
    const compras = await fetch("http://localhost:3000/compra").then(r => r.json())
    const usuarios = await fetch("http://localhost:3000/usuario").then(r => r.json())
    const produtos = await fetch("http://localhost:3000/produto").then(r => r.json())

    const headers = ["Usuário", "Produto", "Qtd", "Data", "Preço Final (R$)", "Pagamento", "Status"]

    // Mapeia compras com dados completos associados
    const linhas = compras.map(c => {
        const u = usuarios.find(u => u.id_usuario === c.cod_usuario)
        const p = produtos.find(p => p.id_produto === c.cod_produto)
        return [
            `${u?.primeiroNome} ${u?.sobrenome}` || "Desconhecido",
            p?.titulo || "Desconhecido",
            c.quantidade,
            c.dataCompra,
            c.precoFinal.toFixed(2),
            c.formaPagamento,
            c.statusCompra
        ]
    })

    document.getElementById("relConsolidado").innerHTML = criarTabela(headers, linhas)
}
