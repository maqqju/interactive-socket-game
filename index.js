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

		res.sendFile(__dirname + '/controller.html');
		// if (!CENSIMENT.controller) {
		// 	CENSIMENT.controller++;
		// 	res.sendFile(__dirname + '/controller.html');
		// } else {
		// 	res.sendFile(__dirname + '/fullup.html');
		// }
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


	//TODO right now this feature is switched on, pending further testing
	socket.on("caw caw", () => {
		console.log("Disconnecting Controller");
		CENSIMENT.controller = 0;
	});

	socket.on("action", (action) => {
		io.emit(action.action, action);
  	});
  	socket.on("crashed", (crashdata) => {
	  	io.emit("crashed", crashdata);
  	});

});

http.listen(port, function(){
  console.log(`listening on *:${3000}`);
});