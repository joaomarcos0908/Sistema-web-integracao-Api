document.addEventListener('DOMContentLoaded' , async  () => {

const cotacoes =  await buscarCotacoes();

const currencyBar = document.getElementById('currency-bar');

if(currencyBar && cotacoes){
        currencyBar.innerHTML = `<span><strong>USD:</strong> R$ ${cotacoes.dolar}</span> | <span><strong>EUR:</strong> R$ ${cotacoes.euro}</span>`;
    }

const precosBRL = document.querySelectorAll('.preco-brl');

if(precosBRL.length > 0 && cotacoes) {
    precosBRL.forEach(element => {
    const valorReal = parseFloat(element.innerText.replace('R$', '').replace(/\./g, '').replace(',', '.'));
    const valorUSD = (valorReal/cotacoes.dolar).toFixed(2)

    const infoConversao = document.createElement('p');
    infoConversao.className = 'preco-convertido';
    infoConversao.innerHTML = `<strong>USD:</strong> $ ${valorUSD}`;

    element.parentElement.appendChild(infoConversao);
    });
}

const formAdquirir = document.getElementById('form-adquirir');
if(formAdquirir) {
    formAdquirir.addEventListener('submit', (evento)  => {
        evento.preventDefault(); 

        const nome = document.getElementById('campo-nome').value.trim();
        const email = document.getElementById('campo-email').value.trim();
        const telefone = document.getElementById('campo-telefone').value.trim();

        if (!nome || !email || !telefone) {
            alert("Carlos ventura precisa do seu nome, e-mail e telefone para retornar o contato!");
        } else {
            const dadosParaSalvar = { nome, email, telefone };

            fetch('http://localhost:3000/contato', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(dadosParaSalvar) 
            })
            .then(resposta => {
                if (resposta.ok) {
                    formAdquirir.style.display = 'none';

                    const divSucesso = document.getElementById('form-success');
                    if (divSucesso) {
                        divSucesso.style.display = 'block';
                    }
                    formAdquirir.reset();
                } else {
                    alert("Erro ao salvar no servidor. Tente novamente.");
                }
            })
            .catch(erro => {
                console.error("Erro na conexão com o servidor:", erro);
                alert("O servidor está desligado! Ligue o Node.js no terminal.");
            });
        }
    });

}
    /// Parte do João Marcos
    // João, insire aqui a lógica de esconder/mostrar as obras

});