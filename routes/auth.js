const   express = require("express"),
        router = express.Router(),
        User = require("../models/user"),
        passport = require("passport");

//Index
router.get("/", (req, res) => {
    res.render("index");
});

//Register
router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err){
            console.log(err);
            return res.render("register")
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/");
            })
        }
    });
});

//Login form
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"

    }), (req, res) => {}
    );

//User Logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});


module.exports = router