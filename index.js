var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 3000;

const CENSIMENT = {
	controller : 0,
	arcade : 0
};

app.get('/', function(req, res){
	if (req.get("user-agent").indexOf("Mobile") > -1) {

		if (!CENSIMENT.controller) {
			CENSIMENT.controller++;
			res.sendFile(__dirname + '/controller.html');
		} else {
			res.sendFile(__dirname + '/fullup.html');
		}
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
	io.on("disconnect", () => {
		CENSIMENT.controller = 0;
		console.log(socket);
	});

	socket.on("action", (action) => {
		io.emit(action.action, action);
  	});
  // socket.on("jump down", (action) => {
  // 	io.emit("jump down", action);
  // });

  // socket.on("jump up", (action) => {
  // 	io.emit("jump up", action);
  // });

  // socket.on("duck down", (action) => {
  // 	io.emit("duck down", action);
  // });

  // socket.on("duck up", (action) => {
  // 	io.emit("duck up", action);
  // });

  // socket.on("crashed", (crashdata) => {
  // 	io.emit("crashed", crashdata);
  // })
});

http.listen(port, function(){
  console.log(`listening on *:${3000}`);
});