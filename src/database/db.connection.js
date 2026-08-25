
import mysql from 'mysql2/promise'

// Colocar para validar se a conexão foi bem sucedida.
const db = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
});

export default db