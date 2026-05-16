const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors({
  origin: [
    'https://joaomarcos0908.github.io',
    'http://localhost:5500',
    'http://127.0.0.1:5500'
  ]
}));
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
app.get('/contatos', (req, res) => {
    const arquivo = './interessados.json';
    if (fs.existsSync(arquivo)) {
        const lista = JSON.parse(fs.readFileSync(arquivo, 'utf-8'));
        res.json(lista);
    } else {
        res.json([]);
    }
});