
import mysql from 'mysql2/promise'

const db = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

export default db