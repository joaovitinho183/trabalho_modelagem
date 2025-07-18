Sistema de Compras - Versão Piloto

Aplicativo web fullstack com Node.js, Express, Sequelize, MySQL, HTML/CSS/JavaScript e Chart.js. Desenvolvido como trabalho prático para consumo de APIs públicas, estruturação de banco de dados relacional e execução de operações CRUD e relatórios gerenciais.

💡 Objetivo Geral

Desenvolver uma aplicação web com funcionalidades completas de cadastro, consulta, relatórios e visualização gráfica de dados, utilizando tecnologias modernas e boas práticas de arquitetura (MVC).

⚙️ Instruções de Instalação e Execução

📁 Requisitos

Node.js (https://nodejs.org/)

MySQL Server e MySQL Workbench

Navegador Web moderno (Chrome, Firefox, Edge)

🔧 Configuração do Banco de Dados

Abra o MySQL Workbench.

Execute o script dump_compras.sql incluído na pasta database/.

Isso criará o banco de dados compras_db com as tabelas usuarios, produtos e compras.

🔐 Variáveis de Ambiente

Crie um arquivo .env na raiz da pasta backend/ com:

DB_HOST=localhost
DB_USER=root
DB_PASS=senai
DB_NAME=compras_db
PORT=3000

📆 Backend - Instalação

cd backend
npm install

▶️ Backend - Execução

npm start

O backend estará disponível em: http://localhost:3000

🌐 Frontend Local

Acesse a pasta frontend/

Abra o index.html no navegador ou com extensão Live Server do VSCode

🌍 Publicação no Vercel

Crie conta no vercel.com

Conecte seu GitHub e selecione a pasta frontend como raiz

Clique em Deploy

Copie a URL de publicação

🔗 Integração Front Vercel x Back Local

No frontend, edite os fetch para usar o IP local do servidor backend:

fetch('http://SEU_IP_LOCAL:3000/usuarios')

Obtenha seu IP com ipconfig (Windows) ou ifconfig (Linux/macOS)

📊 População com Dados de API Externa

Utilize os endpoints da API DummyJSON para popular o banco:

https://dummyjson.com/users

https://dummyjson.com/products

Esses dados serão armazenados nas tabelas usuarios e produtos.