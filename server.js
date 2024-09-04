const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { pool } = require('./db'); // Importa a configuração do banco de dados

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos

app.get('/comments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM comments ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao obter os comentários' });
    }
});

app.post('/comments', async (req, res) => {
    const { text } = req.body;
    try {
        const result = await pool.query('INSERT INTO comments (text) VALUES ($1) RETURNING *', [text]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar o comentário' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
