var mysql = require('mysql');
var config = require('../config/db').db;

var pool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});

pool.getConnection(function (err, connection) {
    if (err) throw err;
});
exports.connect = pool;