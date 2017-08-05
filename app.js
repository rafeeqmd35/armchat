var express = require('express');
var app = express();
var socket = require('socket.io');
var server = app.listen(3000);
var io = socket.listen(server);
var async = require('async');
// var mysql= require('mysql');
// var pool  = mysql.createPool({
//   host     : 'ec2-54-75-231-85.eu-west-1.compute.amazonaws.com',
//   user     : 'twujzkbgramnlx',
//   password : 'b78b31610b9e7dace267ead8b14a2ec71422931fa2f73a5c66ac64c77e976b03',
//   database:'ddh0s2eeja7t2v',
//   port : '5432'
// });

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://engpizuyczkuoj:912e8dc5777d796bfd9a436507a740ef48a592716bfac9ba60231b02824f92f0@ec2-54-75-239-190.eu-west-1.compute.amazonaws.com:5432/d6jeoclqkrrrja';


var chatserver=require('./chatserver.js');
var chatpage=io.of('/chatpage').authorization(function (handshakeData, callback) {
  console.dir(handshakeData);
  handshakeData.page = 'chatpage';
  callback(null, true);
}).on('connection', function (socket) {
  console.dir(socket.handshake.page);
  chatserver.getUserFeeds(chatpage,socket,io,pool,async);
});