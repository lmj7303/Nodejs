const mysql = require("mysql");

let conn = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password : "na5231ra92",
    port : "3306",
    database : "nodejs_db"
})

module.exports = conn;