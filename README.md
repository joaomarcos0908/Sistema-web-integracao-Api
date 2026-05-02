#  Galeria de Arte Digital — Carlos Ventura

Este projeto é uma aplicação web funcional desenvolvida para a avaliação P2 da disciplina de Desenvolvimento Web do iCEV. O sistema simula um cenário corporativo real para um artista plástico nordestino, integrando design responsivo, consumo de APIs externas e um backend para persistência de dados.

## Link de Acesso
O projeto está hospedado e pode ser visualizado em:
[https://eduardoreex.github.io/Sistema-web-integracao-Api/](https://eduardoreex.github.io/Sistema-web-integracao-Api/)


##  Requisitos Técnicos Implementados

### 1. Interface e Responsividade (0,5 pt + 0,5 pt)
- **HTML Semântico:** Uso de tags como `<header>`, `<main>`, `<section>` e `<footer>` para melhor acessibilidade e SEO.
- **CSS Avançado:** Layout construído com Flexbox e CSS Grid para garantir que o site seja totalmente responsivo em dispositivos móveis e desktops.

### 2. Interatividade e DOM (1,0 pt)
- **Manipulação Dinâmica:** A galeria de obras é gerada dinamicamente via JavaScript[cite: 1].
- **Filtros Inteligentes:** Sistema de filtragem por técnica, coleção e preço sem recarregar a página[cite: 1].
- **Validação:** O formulário de interesse possui validação de campos obrigatórios antes do envio[cite: 1].

### 3. Consumo de API Externa (1,0 pt)
- **AwesomeAPI:** Uso da Fetch API para buscar cotações em tempo real de USD e EUR, renderizando a conversão de preços das obras automaticamente na interface[cite: 1].

### 4. Backend e Persistência (Bônus +1,0 pt)
- **Node.js:** Desenvolvimento de um servidor próprio para gerenciar as requisições do formulário[cite: 1].
- **Armazenamento:** Os dados de interessados são salvos de forma persistente em um arquivo `interessados.json` no servidor[cite: 1].

---

## Como Executar o Projeto Localmente

Para testar a funcionalidade completa (incluindo o salvamento de dados no backend), siga os passos:

1. **Clonar o repositório:**

   ```bash
   git clone [https://github.com/eduardoreex/Sistema-web-integracao-Api.git](https://github.com/eduardoreex/Sistema-web-integracao-Api.git)
   
Iniciar o Servidor Backend:
Navegue até a pasta do projeto e, no terminal, execute:

Bash
node server.js
O servidor rodará em http://localhost:3000 para processar os envios do formulário.

Abrir o Frontend:
Utilize a extensão Live Server do VS Code para abrir o arquivo index.html.

Organização do Painel Administrativo
O sistema conta com uma área de administração (admin.html) que permite o cadastro temporário de novas obras utilizando LocalStorage, demonstrando versatilidade na manipulação de dados tanto no lado do cliente quanto no servidor.

Estudantes: 
Eduardo Oliveira dos Santos
João Marcos Nogueira
Adriano Carvalho
Instituição: iCEV - Instituto de Ensino Superior.