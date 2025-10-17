const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || "mongodb+srv://gabrielsilveira2505_db_user:54123@cluster0.8o5q2jl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const Livros = require('./models/livros');
const fs = require('fs');
const path = require('path');

const cors = require('cors')

app.use(express.json());

app.use(cors())

mongoose.connect(uri, {
}).then(() => console.log('Conectado ao MongoDB via mongoose'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

app.get("/livros", async (req, res) => {
    try {
        const lista = await Livros.find();
        res.json(lista);
    } catch (err) {
        res.status(500).json({ error: "Erro na busca de livros"});
    }
});

app.post("/livro", async (req, res) => {
    try {
        const novo = await Livros.create(req.body);
        res.status(201).json(novo);
    } catch (err) {
        res.status(500).json({ error: "Erro ao inserir livro", details: err.message});
    }
})

app.get('/', (req, res) => {
    res.send('Back-End Biblioteca')
})

app.get('/about', (req, res) => {
    res.send('Está é a página sobre a Back-End Biblioteca')
})

// rota para retornar package.json
app.get('/package.json', (req, res) => {
  const p = path.join(__dirname, 'package.json');
  fs.readFile(p, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Não foi possível ler package.json' });
    try {
      return res.json(JSON.parse(data));
    } catch (e) {
      return res.status(500).json({ error: 'JSON inválido em package.json' });
    }
  });
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`)
})
