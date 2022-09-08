const express = require('express');
app = express();
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


app.get('/',(req,res)=>{
    res.send('hello World');
})

const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () =>  {
    console.log(`Listening on Port ${PORT}`);
})