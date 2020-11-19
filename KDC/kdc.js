const express = require('express');
const readline = require('readline');
const kdc = require('./kdc-util.js');
const app = express();

const port = process.env.PORT || 8080

//console.log("KDC running on port", port);
app.listen(port, () =>{
    console.log("KDC running on port", port);
})


