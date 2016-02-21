// use mongoose connector
var mongoose = require('mongoose');
var config = require('../config/db_mongodb').db;

// Data base connexion
console.info(config.mongodb.db_string)
mongoose.connect(config.mongodb.db_string);
var db = mongoose.connection;
db.on('error', function (callback) {
  console.error("Error when connecting to DB !");
});
db.once('open', function (callback) {
  console.info("Successfuly connected to DB !");
});

exports.connect = mongoose;
