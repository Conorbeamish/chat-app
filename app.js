const   express = require("express"), 
        app = express();
    
//Use the template engine ejs
app.set("view engine", "ejs");

//Middleware to serve files from "public" root directory
app.use(express.static("public"));

//Routes
app.get("/", function(req, res){
    res.render("index");
});

server = app.listen(3000);

//Set up socket.io
io = require("socket.io")(server);

//Check for user connections 
io.on("connection", (socket) => {
    console.log("User has connected");

    socket.username = "Anon"

    socket.on("changeUsername", (data) => {
        socket.username = data.username
    });

    socket.on("new-message", (data) => {
        io.sockets.emit("new-message", {message: data.message, username: socket.username});
    })
});


