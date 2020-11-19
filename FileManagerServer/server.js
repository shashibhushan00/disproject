const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const file = require("./file");
const ip = require('ip');
const { exit } = require("process");
const { command } = require("./file");
const kdc = require('../KDC/kdc-util.js');

const PORT = "4000";
const ADDRESS = "0.0.0.0";

const packageDef = protoLoader.loadSync("../file.proto", {});

const grpcObject = grpc.loadPackageDefinition(packageDef);
const filePackage = grpcObject.filePackage;

const server = new grpc.Server();

server.bind(ADDRESS + ":" + PORT, grpc.ServerCredentials.createInsecure());

server.addService(filePackage.File.service, {
    "pwd": (call, callback) => {
        console.log(call);
        console.log(file.pwd());
        callback(null, {path: file.pwd()})
    },
    "rm": (call, callback) => { 
        const path = call.request.path;
        file.rm(path).run().listen({
             onResolved: () => {callback(null, {})},
             onRejected: (err) => {callback(err)}
        })
    },
    "ls": (call, callback) => {
        const path = call.request.path;
        file.ls(path).run().listen({
            onResolved: (files) => {callback(null, {names: files})},
            onRejected: (err) => {callback(err)}
        })
    },
    'command': (call, callback) => {
        const cmd = call.request.cmd;
        console.log(cmd);
        file.command(cmd).run().listen({
            onResolved: (out) => {callback(null, {data: out})},
            onRejected: (err) => {callback(err)}
        })
    }
});

server.start();

let serveruid = ''; //unique id of server

command('cd ./FSH').run()
.listen({
    onRejected: () => {
        console.log("Failed to start File System!!!");
    },
    onResolved: () => {
        serveruid = kdc.uids.fs;
        console.log("File Server started on port", PORT);
    }
})