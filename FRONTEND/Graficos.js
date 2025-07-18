let chartProduto, chartUsuario // Variáveis globais para armazenar os gráficos já criados

// Função para gerar gráfico de barras do estoque dos produtos filtrados por intervalo de IDs
async function gerarGraficoProduto() {
    // Pega os valores dos inputs que definem o intervalo de IDs para filtrar os produtos
    const ini = Number(document.getElementById("produtoIdIni").value)
    const fim = Number(document.getElementById("produtoIdFim").value)

    // Busca todos os produtos do backend
    const dados = await fetch("http://localhost:3000/produto").then(res => res.json())

    // Filtra os produtos que estão dentro do intervalo e limita a 10 itens
    const filtrados = dados
        .filter(p => p.id_produto >= ini && p.id_produto <= fim)
        .slice(0, 10)

    // Cria arrays com os nomes (labels) e os estoques (valores) para o gráfico
    const labels = filtrados.map(p => p.titulo)
    const estoques = filtrados.map(p => p.estoque)

    // Se já existir um gráfico criado, destrói ele para recriar com dados novos
    if (chartProduto) chartProduto.destroy()

    // Pega o contexto do canvas onde o gráfico será desenhado
    const ctx = document.getElementById("graficoProduto").getContext("2d")

    // Cria o gráfico de barras com os dados e configurações
    chartProduto = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Estoque",
                data: estoques,
                backgroundColor: "rgba(54, 162, 235, 0.6)"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Produto x Estoque" // Título do gráfico
                }
            }
        }
    })
}

// Função para gerar gráfico de barras da idade dos usuários filtrados por intervalo de IDs
async function gerarGraficoUsuario() {
    // Pega intervalo de IDs dos inputs
    const ini = Number(document.getElementById("usuarioIdIni").value)
    const fim = Number(document.getElementById("usuarioIdFim").value)

    // Busca todos os usuários do backend
    const dados = await fetch("http://localhost:3000/usuario").then(res => res.json())

    // Filtra usuários dentro do intervalo e limita a 10 itens
    const filtrados = dados
        .filter(u => u.id_usuario >= ini && u.id_usuario <= fim)
        .slice(0, 10)

    // Gera labels com nome completo e valores com idades
    const labels = filtrados.map(u => `${u.primeiroNome} ${u.sobrenome}`)
    const idades = filtrados.map(u => u.idade)

    // Destrói gráfico anterior se existir
    if (chartUsuario) chartUsuario.destroy()

    // Pega o contexto do canvas e cria o gráfico
    const ctx = document.getElementById("graficoUsuario").getContext("2d")
    chartUsuario = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Idade",
                data: idades,
                backgroundColor: "rgba(255, 99, 132, 0.6)"
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Usuário x Idade"
                }
            }
        }
    })
}

// Exemplo de configuração mais detalhada para gráfico Produto, com estilos, tamanho e cores customizados
chartProduto = new Chart(ctx, {
    type: "bar",
    data: {
        labels: labels,
        datasets: [{
            label: "Estoque",
            data: estoques,
            backgroundColor: "rgba(54, 162, 235, 0.7)",
            borderRadius: 5, // bordas arredondadas nas barras
            barThickness: 40 // largura fixa das barras
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, // permite o gráfico ocupar todo o espaço do container
        plugins: {
            title: {
                display: true,
                text: "Produto x Estoque",
                font: { size: 24 },
                color: '#007BFF' // cor azul no título
            },
            legend: {
                labels: {
                    font: { size: 16 }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: { size: 14 },
                    color: '#333' // cor das legendas do eixo x
                }
            },
            y: {
                beginAtZero: true, // eixo y começa do zero
                ticks: {
                    font: { size: 14 },
                    color: '#333' // cor das legendas do eixo y
                }
            }
        }
    }
})
