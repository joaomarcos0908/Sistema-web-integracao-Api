document.addEventListener('DOMContentLoaded' , async  () => {
const currencyBar = document.getElementById('currency-bar');

if(currencyBar) {
    const cotacoes =  await buscarCotacoes();

    if(cotacoes){
        currencyBar.innerHTML = `<span><strong>USD:</strong> R$ ${cotacoes.dolar}</span> | <span><strong>EUR:</strong> R$ ${cotacoes.euro}</span>`;
    }
}
const formAdquirir = document.getElementById('form-adquirir');
if(formAdquirir) {
    formAdquirir.addEventListener('submit' (evento)  => {
        evento.preventDefault(); 
        const nome = document.getElementById('campo-nome').ariaValueMax.trim();
        const email = document.getElementById('campo-email').value.trim();
        const telefone = document.getElementById('campo-telefone').value.trim();

        if (!nome|| !email || !telefone ) {
            alert("Carlos ventura precisa do seu nome, e-mail e telefone para retornar o contato!");
        } else {
            alert("Solicitação enviada com sucesso! O artista entrará em contato.");
            formAdquirir.reset();
        }
    });
}

    /// Parte do João Marcos
    // João, insire aqui a lógica de esconder/mostrar as obras

});