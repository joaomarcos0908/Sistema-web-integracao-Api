const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/contato', (req, res) => {
    try {
        const novoInteresse = req.body;
        const arquivo = './interessados.json';
        let lista = [];

        if (fs.existsSync(arquivo)) {
            const conteudoArquivo = fs.readFileSync(arquivo, 'utf-8');
            
           
            if (conteudoArquivo.trim() !== "") {
                lista = JSON.parse(conteudoArquivo);
            }
        }

        lista.push(novoInteresse);
        fs.writeFileSync(arquivo, JSON.stringify(lista, null, 2));

        console.log("Sucesso! Novo contato salvo.");
        res.status(201).send({ mensagem: "Dados salvos com sucesso!" });

    } catch (erro) {

        console.error("ERRO NO SERVIDOR:", erro.message);
        res.status(500).send({ erro: "Falha interna no servidor." });
    }
});

app.listen(3000, () => {
    console.log("Servidor do Carlos Ventura rodando: http://localhost:3000");
});