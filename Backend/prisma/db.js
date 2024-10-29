// const pool=require('pg').Pool;
// const db=new pool({
//     user:"postgres",
//     host:"3.109.122.134",
//     database:"students",
//     password:"180821",
//     port:5432
// })
 
// console.log(db)
// module.exports= db;
require('dotenv').config(); // Load environment variables from .env

const { Pool } = require('pg');

// Create a new PostgreSQL pool using environment variables
const pool = new Pool({
    user:'postgres',         
    host: '65.0.5.153',        
    database:'students',     
    password: '180821',         
    port: 5432,             
});

// Log successful connection
pool.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Error connecting to PostgreSQL database:', err));

module.exports = pool;

