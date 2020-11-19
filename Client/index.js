const { Command } = require("commander");
const inquirer = require("inquirer");
const client = require("./client");
const readline = require('readline');
const { async } = require("rxjs");
const kdc = require('../KDC/kdc-util.js');

const program = new Command();
program.version("0.0.1");

let clientKey = 'd9ce25c4-2342-4b2b';  //client's personal transaction key 

program
    .command("pwd")
    .description("Current directory on remote")
    .action(async () => {
        if(kdc.checkTransaction(clientKey)){
            console.log('Transaction authenticated...')
            const res = await client.command("pwd")
            console.log(res);
        }
        else{
            console.log('Transaction key authentication failed!!!')
        }
    });

program
    .command('rm <path>')
    .description("Remove file from remote.")
    .action(async (path) => {
        if(kdc.checkTransaction(clientKey)){
            console.log('Transaction authenticated...')
            const res = await client.command("rm " + path);
            console.log(res);
            console.log('File removed')
        }
        else{
            console.log('Transaction key authentication failed!!!')
        }
         
    });

program
    .command('ls [path]')
    .description("list files and folder from remote.")
    .action(async (path) => {
        path = !path ? './' : path;
        if(kdc.checkTransaction(clientKey)){
            console.log('Transaction authenticated...')
            const res = await client.command("ls "+path)
            console.log(res);
        }
        else{
            console.log('Transaction key authentication failed!!!')
        }
        
    });

program
    .command('cat [filename]')
    .description('read the content of a file')
    .action(async (file) => {
        if (!file) {
            console.log("File name required.")
            return;
        }
        if(kdc.checkTransaction(clientKey)){
            console.log('Transaction authenticated...')
            const res = await client.command('cat '+file);
            console.log(res);
        }
        else{
            console.log('Transaction key authentication failed!!!')
        }
        
    });    

program
    .command('cp [source] [destination]')
    .description('copy file from source to destination.')
    .action( async (source, destination) => {
        if (!source || !destination) {
            console.log("Source or destination is missing");
            return;
        } else {
            if(kdc.checkTransaction(clientKey)){
                console.log('Transaction authenticated...')
                const res = await client.command('cp ' + source + " " + destination);
                console.log(res);
                console.log('File copied')
            }
            else{
                console.log('Transaction key authentication failed!!!')
            }  
        }
    })

program
    .command('mkdir [dirName]')
    .description('create a folder')
    .action(async (dirName) => {
        if (dirName) {
            if(kdc.checkTransaction(clientKey)){
                console.log('Transaction authenticated...')
                const res = await client.command('mkdir ' + dirName);
                console.log(res);
            }
            else{
                console.log('Transaction key authentication failed!!!')
            }
        } else {
            console.log("Please specify the folder name.")
        }
    }); 
    
program.parse(process.argv);








