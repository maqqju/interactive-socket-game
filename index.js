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

app.get("/chrome-dino.js", (req,res) => {
	res.sendFile(__dirname+"/chrome-dino.js")
});
app.get("/load-time-data.js", (req,res) => {
	res.sendFile(__dirname+"/load-time-data.js")
});

io.on('connection', function(socket){
  socket.on("jump", (action) => {
  	//console.log("Received action ", JSON.stringify(action));
  	io.emit("jump", action);
  });

  socket.on("duck down", (action) => {
  	io.emit("duck down", action);
  });

  socket.on("duck up", (action) => {
  	io.emit("duck up", action);
  });

  socket.on("crashed", (crashdata) => {
  	io.emit("crashed", crashdata);
  })
});

http.listen(port, function(){
  console.log(`listening on *:${3000}`);
});