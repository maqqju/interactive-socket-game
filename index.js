var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 3000;
app.get('/', function(req, res){
	if (req.get("user-agent").indexOf("Mobile") > -1) {
		res.sendFile(__dirname + '/controller.html');
	} else {
   		res.sendFile(__dirname + '/arcade.html');
	}
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on("jump", (msg) => {
  	io.emit("jump", msg);
  });
});

http.listen(port, function(){
  console.log(`listening on *:${3000}`);
});