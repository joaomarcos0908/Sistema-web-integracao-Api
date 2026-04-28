async function buscarCotacoes() {
    try {
        const resposta = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL');
        const dados = await resposta.json();
        
        const cotacoes = {
            dolar: parseFloat(dados.USDBRL.bid).toFixed(2),
            euro: parseFloat(dados.EURBRL.bid).toFixed(2)
        };
        
        return cotacoes;
    } catch (erro) {
        console.error(erro);
    }
}