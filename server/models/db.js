var mysql = require('mysql2');


var dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root@123",
    database : "versatile"
});
  
dbConnection.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!!!!");
});

global.dbConnection = dbConnection;