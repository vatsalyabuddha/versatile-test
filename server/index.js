const express = require('express');
app = express();
const router = express.Router()
const { Sequelize } = require('sequelize');
var mysql = require('mysql');
var bodyParser = require('body-parser')

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root@123"
  });
  
  dbConnection.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
});


// Routes 
const apiRoute = require('./routes/api');
const communicationRoute = require('./routes/communication');
const vahanRoute = require('./routes/vahan');


app.use('/api',apiRoute);
app.use('/communication',communicationRoute);
app.use('/vahan',vahanRoute);

const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () =>  {
    console.log(`Listening on Port ${PORT}`);
})