
import mysql from 'mysql2/promise'

const db = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 200,
    maxIdle: 100,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    connectTimeout: 10000
});

export default db