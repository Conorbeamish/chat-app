const   express = require("express"),
        router = express.Router(),
        User = require("../models/user"),
        passport = require("passport");

router.get("/", function(req, res){
    res.render("index");
});

router.get("/login", function(req, res){
    res.render("login");
});

router.get("/register", function(req, res){
    res.render("register");
});

module.exports = router