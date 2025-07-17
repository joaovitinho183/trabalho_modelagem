const resCadastrar = document.getElementById('resCadastrar')
const resListar = document.getElementById('resListar')
const resAtualizar = document.getElementById('resAtualizar')
const resApagar = document.getElementById('resApagar')
const resBuscarID = document.getElementById('resBuscarID')
const resBuscarN = document.getElementById('resBuscarN')

const btnCadastrar = document.getElementById('btnCadastrar')
const btnListar = document.getElementById('btnListar')
const btnAtualizar = document.getElementById('btnAtualizar')
const btnApagar = document.getElementById('btnApagar')
const btnBuscarID = document.getElementById('btnBuscarID')
const btnBuscarN = document.getElementById('btnBuscarN')

btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault()
    let primeiroNome = document.getElementById('primeiroNome').value
    let sobrenome = document.getElementById('sobrenome').value
    let idade = Number(document.getElementById('idade').value)
    let email = document.getElementById('email').value
    let telefone = document.getElementById('telefone').value
    let endereco = document.getElementById('endereco').value
    let cidade = document.getElementById('cidade').value
    let estado = document.getElementById('estado').value
    let aniversario = document.getElementById('aniversario').value

    const valores = {
        primeiroNome: primeiroNome,
        sobrenome: sobrenome,
        idade: idade,
        email: email,
        telefone: telefone,
        endereco: endereco,
        cidade: cidade,
        estado: estado,
        aniversario: aniversario,
    }
    resCadastrar.innerHTML = ''

    fetch(`http://localhost:3000/usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(dados => {
            resCadastrar.innerHTML += `Usuario Cadastrado com Sucesso!!!`
        })
        .catch((err) => {
            console.error('erro ao cadastrar o usuario', err)
        })
})

btnListar.addEventListener('click', () => {
    
    resListar.innerHTML = ''

    fetch(`http://localhost:3000/usuario`)
        .then(resp => resp.json())
        .then(dados => {
            dados.forEach(dad => {
                resListar.innerHTML += `Código: ${dad.id_usuario}; Nome: ${dad.primeiroNome} ${dad.sobrenome}; Idade: ${dad.idade}; Email: ${dad.email}; Telefone: ${dad.telefone}; Endereço: ${dad.endereco}; Cidade: ${dad.cidade}; Estado: ${dad.estado}; Aniversario: ${dad.aniversario}`
                resListar.innerHTML += '<hr>'
            });
        })
        .catch((err) => {
            console.error('erro ao listar o usuario', err)
        })
})

btnAtualizar.addEventListener('click', (e) => {
    e.preventDefault()
    let id_usuario = Number(document.getElementById('id_usuario').value)
    let primeiroNome = document.getElementById('primeiroNome').value
    let sobrenome = document.getElementById('sobrenome').value
    let idade = Number(document.getElementById('idade').value)
    let email = document.getElementById('email').value
    let telefone = document.getElementById('telefone').value
    let endereco = document.getElementById('endereco').value
    let cidade = document.getElementById('cidade').value
    let estado = document.getElementById('estado').value
    let aniversario = document.getElementById('aniversario').value

    const valores = {
        id_usuario: id_usuario,
        primeiroNome: primeiroNome,
        sobrenome: sobrenome,
        idade: idade,
        email: email,
        telefone: telefone,
        endereco: endereco,
        cidade: cidade,
        estado: estado,
        aniversario: aniversario,
    }
    resAtualizar.innerHTML = ''

    fetch(`http://localhost:3000/usuario/${id_usuario}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valores)
    })
        .then(resp => resp.json())
        .then(dados => {
            resAtualizar.innerHTML += `Usuario Atualizado com Sucesso!!!`
        })
        .catch((err) => {
            console.error('erro ao atualizar o usuario', err)
        })
})

btnApagar.addEventListener('click', (e) => {
    e.preventDefault()
    let id_usuario = Number(document.getElementById('id_usuario').value)
    console.log(id_usuario)
    resApagar.innerHTML = ''

    fetch(`http://localhost:3000/usuario/${id_usuario}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => {
            if (resp.status === 204) {
                resApagar.innerHTML += `O Usuario foi Excluido!!!`
            } else {
                resApagar.innerHTML += `Usuario não encontrado`
            }
        })
        .catch((err) => {
            console.error('erro ao atualizar o usuario', err)
        })
})

btnBuscarID.addEventListener('click', (e) => {
    e.preventDefault()
    let id_usuario = Number(document.getElementById('id_usuario').value)
    resBuscarID.innerHTML = ''

    fetch(`http://localhost:3000/usuario/${id_usuario}`)
        .then(resp => resp.json())
        .then(dados => {
            dados.forEach(dad => {
                resBuscarID.innerHTML += `Nome: ${dad.primeiroNome} ${dad.sobrenome}; Idade: ${dad.idade}; Email: ${dad.email}; Telefone: ${dad.telefone}; Endereço: ${dad.endereco}; Cidade: ${dad.cidade}; Estado: ${dad.estado}; Aniversario: ${dad.aniversario}`
                resBuscarID += '<hr>'
            });
        })
        .catch((err) => {
            console.error('erro ao listar o usuario', err)
        })
})

btnBuscarN.addEventListener('click', (e) => {
    e.preventDefault()
    let primeiroNome = document.getElementById('primeiroNome').value
    resBuscarN.innerHTML = ''

    fetch(`http://localhost:3000/usuario/nome/${primeiroNome}`)
        .then(resp => resp.json())
        .then(dados => {
            dados.forEach(dad => {
                resBuscarN.innerHTML += `Nome: ${dad.primeiroNome} ${dad.sobrenome}; Idade: ${dad.idade}; Email: ${dad.email}; Telefone: ${dad.telefone}; Endereço: ${dad.endereco}; Cidade: ${dad.cidade}; Estado: ${dad.estado}; Aniversario: ${dad.aniversario}`
                resBuscarN += '<hr>'
            });
        })
        .catch((err) => {
            console.error('erro ao listar o usuario', err)
        })
})