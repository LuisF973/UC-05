const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();


const pool = new Pool({
       user: process.env.PG_USER,
       host: process.env.PG_HOST,
       database: process.env.PG_DATABASE,   // obrigatorio ser igual ao .inv 
       password: process.env.PG_PASSAWOR,
       port: process.env.PG_PORTA
      

})

module.exports = { pool };