var mysql = require('mysql');


var dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root@123"
});
  
dbConnection.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
});

global.dbConnection = dbConnection;