import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'myuser',
    password: 'mypassword',
    database: 'mydatabase'
});

export const db =  pool.promise();