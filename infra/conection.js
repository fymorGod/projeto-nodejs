const mysql = require('mysql');

const conection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    port:3306,
    password:'231199Fylip@',
    database:'agenda-petshop'
});

module.exports = conection;

//231199Fylip@ - root password workbench