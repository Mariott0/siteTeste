const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',            // Seu usuário PostgreSQL
    host: 'localhost',       // Host do banco de dados
    database: 'meu_projeto', // Nome do banco de dados
    password: 'root',        // Sua senha
    port: 5432,              // Porta padrão do PostgreSQL
});

module.exports = { pool };
