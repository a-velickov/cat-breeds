const pg = require('pg');
require('dotenv').config();


const client = new pg.Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    port: process.env.PGPORT,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
});

client.connect();


module.exports.DB = client;