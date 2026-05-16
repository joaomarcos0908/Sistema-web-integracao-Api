Galeria de Arte Digital — Carlos Ventura
Projeto desenvolvido para a avaliação P2 da disciplina de Programação Web do iCEV. Simula uma galeria online para um artista plástico nordestino, com frontend hospedado no GitHub Pages e backend em Node.js hospedado no Railway.
Links de Acesso

Site: https://joaomarcos0908.github.io/Sistema-web-integracao-Api/
API: https://sistema-web-integracao-api-production.up.railway.app

Requisitos Técnicos Implementados

1. Interface e Responsividade

HTML semântico com <header>, <main>, <section> e <footer>
Layout responsivo com Flexbox e CSS Grid para mobile e desktop

2. Interatividade e DOM

Galeria de obras gerada dinamicamente via JavaScript
Filtros por técnica, coleção e faixa de preço sem recarregar a página
Validação de campos obrigatórios no formulário de interesse

3. Consumo de API Externa

Integração com a AwesomeAPI para cotações em tempo real de USD e EUR
Conversão automática dos preços das obras exibida na interface

4. Backend e Persistência (Bônus)

Servidor Node.js com Express hospedado no Railway
Rota POST /contato — recebe e salva dados do formulário em interessados.json
Rota GET /contatos — retorna todos os contatos salvos em JSON

Como Executar Localmente
Pré-requisitos

Node.js instalado
Git instalado

Passo a passo

Clone o repositório:

bashgit clone https://github.com/joaomarcos0908/Sistema-web-integracao-Api.git
cd Sistema-web-integracao-Api

Instale as dependências:

bashnpm install

Inicie o servidor backend:

bashnode server.js
O servidor rodará em http://localhost:3000

Abra o frontend com a extensão Live Server do VS Code (index.html)

O formulário detecta automaticamente se está rodando em localhost ou em produção e direciona para a API correta.

Estrutura do Projeto
├── index.html # Página inicial
├── galeria.html # Galeria de obras com filtros
├── adquirir.html # Formulário de interesse
├── sobre.html # Página sobre o artista
├── admin.html # Painel administrativo (LocalStorage)
├── server.js # Servidor Node.js (Express)
├── package.json
├── assets/
│ ├── css/style.css
│ └── js/
│ ├── main.js # Lógica principal do frontend
│ ├── api.js # Integração com AwesomeAPI (cotações)
│ └── admin.js # Painel administrativo
└── interessados.json # Dados salvos pelo backend

Infraestrutura
ServiçoPlataformaURLFrontendGitHub Pagesjoaomarcos0908.github.io/...BackendRailwaysistema-web-integracao-api-production.up.railway.app

Equipe

Eduardo Oliveira dos Santos
João Marcos Nogueira
Adriano Carvalho

Instituição: iCEV — Instituto de Ensino Superior
