var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var APP_PORT = 3000;

server.listen(APP_PORT);

app.use(express.static(__dirname + 'web/public'));
app.use(express.static(__dirname + 'client'));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render(__dirname + '/web/index');
});

io.on('connection', function (socket) {
  socket.emit('hello', 'welcome:' + socket.id);
});

console.log('running on localhost:', APP_PORT);
