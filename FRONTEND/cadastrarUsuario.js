const res = document.getElementById('res')
const btnCadastrar = document.getElementById('btnCadastrar')

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
    let aniversario = Date(document.getElementById('aniversario').value)

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
    res.innerHTML = ''

    fetch(`http://localhost:3000/usuario`,{
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(valores)
    })
    then(resp => resp.json())
    then(dados =>{
        res.innerHTML += `Usuario ${dados.primeiroNome} Cadastrado com Sucesso`
    })
    catch((err)=>{
        console.error('erro ao cadastrar o usuario',err)
    })
})