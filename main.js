var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var networkServer = require('./server/NetworkServer');
var APP_PORT = 3000;

server.listen(APP_PORT);

app.use('/common', express.static(__dirname + '/common'));
app.use('/client', express.static(__dirname + '/client'));
app.use('/network', express.static(__dirname + '/network'));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render(__dirname + '/web/index');
});

var network = new networkServer.class(io);

console.log('running on localhost:', APP_PORT);

