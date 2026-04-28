const express = require('express');
const cors = require('cors')
const fs =  require('fs')


const app = express()

app.use(cors())
app.use(express.json());

app.post('/contato', (req, res ) => {
    const novoInteresse = req.body;
    const arquivo = 'interessados.json'
    let list = []

    if (fs.existsSync(arquivo)) {
        lista = JSON.parse(fs.readFileSync(arquivo));   
    }

    lista.push(novoInteresse);

    fs.writeFileSync(arquivo, JSON.stringify(lista, null, 2));
    res.status(201).send({ mensagem: "Dados salvos com sucesso no servidor!" });

});

app.listen(3000, () => {
    console.log("Servidor do Carlos Ventura rodando: http://localhost:3000");
});
