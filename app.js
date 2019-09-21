const express = require("express");
const app = express();

//use the template engine ejs
app.set("view engine", "ejs");

//middleware to serve files from "public" root directory
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("index");
});

server = app.listen(3000);

