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

btnPovoar.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const api = await fetch('https://dummyjson.com/users');
        const { users } = await api.json();

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const valores = {
                primeiroNome: user.firstName,
                sobrenome: user.lastName,
                idade: user.age,
                email: user.email,
                telefone: user.phone,
                endereco: user.address.address,
                cidade: user.address.city,
                estado: user.address.state,
                aniversario: user.birthDate,
            };

            await fetch(`http://localhost:3000/usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(valores)
            });
        }

        resCadastrar.innerHTML = `Lote de usuários cadastrado com sucesso!`;

    } catch (err) {
        console.error('Erro ao cadastrar o lote de usuários:', err);
        resCadastrar.innerHTML = `<p style="color:red;">Erro ao cadastrar o lote de usuários.</p>`;
    }
});



btnListar.addEventListener('click', () => {
    resListar.innerHTML = '';

    fetch(`http://localhost:3000/usuario`)
        .then(resp => resp.json())
        .then(dados => {
            let tabela = `
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Aniversário</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            dados.forEach(dad => {
                tabela += `
                    <tr>
                        <td data-label="Código">${dad.id_usuario}</td>
                        <td data-label="Nome">${dad.primeiroNome} ${dad.sobrenome}</td>
                        <td data-label="Idade">${dad.idade}</td>
                        <td data-label="Email">${dad.email}</td>
                        <td data-label="Telefone">${dad.telefone}</td>
                        <td data-label="Endereço">${dad.endereco}</td>
                        <td data-label="Cidade">${dad.cidade}</td>
                        <td data-label="Estado">${dad.estado}</td>
                        <td data-label="Aniversário">${dad.aniversario}</td>
                    </tr>
                `;
            });

            tabela += `</tbody></table>`;
            resListar.innerHTML = tabela;
        })
        .catch((err) => {
            console.error('erro ao listar o usuario', err)
        });
});

btnAtualizar.addEventListener('click', (e) => {
    e.preventDefault()
    let id_usuario = Number(document.getElementById('id_usuarioUpd').value)
    let primeiroNome = document.getElementById('primeiroNomeUpd').value
    let sobrenome = document.getElementById('sobrenomeUpd').value
    let idade = Number(document.getElementById('idadeUpd').value)
    let email = document.getElementById('emailUpd').value
    let telefone = document.getElementById('telefoneUpd').value
    let endereco = document.getElementById('enderecoUpd').value
    let cidade = document.getElementById('cidadeUpd').value
    let estado = document.getElementById('estadoUpd').value
    let aniversario = document.getElementById('aniversarioUpd').value

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
    let id_usuario = Number(document.getElementById('id_usuarioDelet').value)
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
    e.preventDefault();
    let id_usuario = Number(document.getElementById('id_usuarioBID').value);
    resBuscarID.innerHTML = '';

    fetch(`http://localhost:3000/usuario/${id_usuario}`)
        .then(resp => resp.json())
        .then(dados => {
            let tabela = `
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Aniversário</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Código">${dados.id_usuario}</td>
                            <td data-label="Nome">${dados.primeiroNome} ${dados.sobrenome}</td>
                            <td data-label="Idade">${dados.idade}</td>
                            <td data-label="Email">${dados.email}</td>
                            <td data-label="Telefone">${dados.telefone}</td>
                            <td data-label="Endereço">${dados.endereco}</td>
                            <td data-label="Cidade">${dados.cidade}</td>
                            <td data-label="Estado">${dados.estado}</td>
                            <td data-label="Aniversário">${dados.aniversario}</td>
                        </tr>
                    </tbody>
                </table>
            `;
            resBuscarID.innerHTML = tabela;
        })
        .catch((err) => {
            console.error('Erro ao buscar usuário por ID:', err);
            resBuscarID.innerHTML = `<p style="color: red;">Erro ao buscar usuário por ID.</p>`;
        });
});

btnBuscarN.addEventListener('click', (e) => {
    e.preventDefault();
    let primeiroNome = document.getElementById('primeiroNomeBN').value;
    resBuscarN.innerHTML = '';

    fetch(`http://localhost:3000/usuario/nome/${primeiroNome}`)
        .then(resp => resp.json())
        .then(dados => {
            let tabela = `
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Aniversário</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            dados.forEach(dad => {
                tabela += `
                    <tr>
                        <td data-label="Código">${dad.id_usuario}</td>
                        <td data-label="Nome">${dad.primeiroNome} ${dad.sobrenome}</td>
                        <td data-label="Idade">${dad.idade}</td>
                        <td data-label="Email">${dad.email}</td>
                        <td data-label="Telefone">${dad.telefone}</td>
                        <td data-label="Endereço">${dad.endereco}</td>
                        <td data-label="Cidade">${dad.cidade}</td>
                        <td data-label="Estado">${dad.estado}</td>
                        <td data-label="Aniversário">${dad.aniversario}</td>
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
            console.error('Erro ao buscar usuário por nome:', err);
            resBuscarN.innerHTML = `<p style="color: red;">Erro ao buscar usuário por nome.</p>`;
        });
});