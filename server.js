const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());

// Configuração do pool de conexões com o PostgreSQL
const pool = new Pool({
    user: 'postgresql',
    host: 'localhost',
    database: 'meu_projeto',
    password: 'root',
    port: 5432,
});

// Endpoint para obter todos os comentários
app.get('/comments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM comments ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao obter os comentários' });
    }
});

// Endpoint para adicionar um novo comentário
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
