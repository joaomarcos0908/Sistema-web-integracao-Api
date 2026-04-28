async function buscarCotacoes() {
    try {

    const resposta = await fetch ('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL');

    const dados = await resposta.json();

    const cotacoes = {
            dolar: parseFloat(dados.USDBRL.bid).toFixed(2),
            euro: parseFloat(dados.EURBRL.bid).toFixed(2)
        };

    console.log("Sucesso! Cotações recebidas:" , cotacoes);
    return cotacoes;

    } catch (erro) {
        console.error("Erro ao buscar cotações na AwesomeAPI:", erro);
        return null;
    }
}
buscarCotacoes();
