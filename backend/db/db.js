const sql = require('mssql');
const dotenv = require('dotenv');

dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // Use this for Azure SQL or if encryption is enabled
        trustServerCertificate: true // Change to true for local dev / self-signed certs
    }
};

let isConnected = false;

const connectDB = async () => {
    try {
        await sql.connect(config);
        isConnected = true;
        console.log('Database Connected Successfully');
    } catch (err) {
        console.error('Database Connection Failed. Running in Mock Mode.', err.message);
        isConnected = false;
        // Do not exit process
    }
};

module.exports = { connectDB, sql, getIsConnected: () => isConnected };
