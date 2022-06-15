const mysql = require('mysql');

const express = require('express');
const app = express();
const http= require('http');

const fantasyAuthConnect= mysql.createPool({
  connectionLimit: 200,
  multipleStatements: true,
  host:'localhost',
  port:3306,
  user:'root',
  password:'',
  database:'FantasyAuth'
});

fantasyAuthConnect.getConnection(function(err, connection) {
    if(err){
      console.log(err);
    }
    else if(connection){
      console.log("congrats you are connected");
      connection.release()
    }
});
console.log("connected here*************");
module.exports.fantasyAuthConnect= fantasyAuthConnect;