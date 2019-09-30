const   express = require("express"), 
        app = express(),
        bodyParser = require("body-parser"),
        mongoose = require("mongoose"),
        passport = require("passport"),
        LocalStrategy = require("passport-local"),
        User = require("./models/user"),
        authRoutes = require("./routes/auth");
        
//Enable POST and req.body requests
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to database
mongoose.connect("mongodb://localhost/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("DB connected")).catch(err => console.log(err));

mongoose.set("useFindAndModify", false);
    
//Use the template engine ejs
app.set("view engine", "ejs");

//Middleware to serve files from "public" root directory
app.use(express.static("public"));

//Passport config
app.use(require("express-session")({
    secret: "9f03jf9043jf093jf4903jjf3j943f",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//Routes
app.use(authRoutes);

server = app.listen(process.env.PORT || 3000);

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


