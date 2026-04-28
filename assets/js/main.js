document.addEventListener('DOMContentLoaded' , async  () => {
const currencyBar = document.getElementById('currency-bar');

if(currencyBar) {
    const cotacoes =  await buscarCotacoes();

    if(cotacoes){
        currencyBar.innerHTML = `<span><strong>USD:</strong> R$ ${cotacoes}</sapn> | <span><strong>EUR:</strong> R$ ${cotacoes.euro}</span>`;
    }
}

})