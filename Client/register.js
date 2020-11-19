const express = require('express');
const readline = require('readline');

const app = express();

const credentials = {
    client1: "client1",
    client2: "client2",
    client3: "client3",
    password: "1234"
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter client ID: ", function(id){
    rl.question("Enter client password: ", function(password){
        if((id == credentials.client1 || id == credentials.client2 || id == credentials.client2) && password == credentials.password){
            console.log('Client authenticated. Running on PORT 5000')            
        }
        else{
            console.log("Failed to authenticate client!!!");
            rl.close();
        }
    })
});

rl.on("close", function(){
    //console.log('do something')
})
