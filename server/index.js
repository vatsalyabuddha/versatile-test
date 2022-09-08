const express = require('express');
app = express();

require('dotenv').config();

app.get('/',(req,res)=>{
    res.send('hello World');
})

const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () =>  {
    console.log(`Listening on Port ${PORT}`);
})