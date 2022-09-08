const express = require('express');
app = express();
var http            = require('http').Server(app);
const router = express.Router()
// var mysql = require('mysql');
var bodyParser = require('body-parser')

// require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var dbConnection = require('./models/db');

// var dbConnection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Root@123"
//   });
  
//   dbConnection.connect(function(err) {
//     if (err) throw err;
//     console.log("DB Connected!");
// });


// Routes 
const apiRoute = require('./routes/api');
const communicationRoute = require('./routes/communication');
const vahanRoute = require('./routes/vahan');


app.use('/api',apiRoute);
app.use('/communication',communicationRoute);
app.use('/vahan',vahanRoute);

// const PORT = process.env.PORT || 3000;
 
http.listen(3000, '0.0.0.0',function(){;
    console.log("listening on port 3000");
});
