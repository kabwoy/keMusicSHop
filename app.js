require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
<<<<<<< HEAD
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user")
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require('mongoose-findorcreate');

=======
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
>>>>>>> 3775a26d72bda2a9958106a2ecff493fed253121
const app = express();
mongoose.connect("mongodb://localhost/usersDB")

app.set('view engine', 'ejs');
app.use(express.static("public"));
<<<<<<< HEAD
app.use(bodyParser.urlencoded({
    extended: true
}));

// express session
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/keMusicDB"); //monngose connection



passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/index"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id, facebookName: profile.username }, function (err, user) {
            return cb(err, user);
        });
    }
));
=======
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret:"kaboi",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())

var userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
})
userSchema.plugin(passportLocalMongoose)


var User = mongoose.model("User", userSchema)


passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
>>>>>>> 3775a26d72bda2a9958106a2ecff493fed253121

app.get("/", function(req, res){
    User.find({}, function(err, foundUsers){
        if(err){
            console.log(err)
        } else {
            res.render("main", {
                foundUsers: foundUsers,
                currentUser: req.user
            })
        }
    })
})

// index user route
app.get("/index", function (req, res) {
    User.find({}, function(err, foundUsers){
        if(err){
            console.log(err)
        } else {
            res.render("index", {
                foundUsers: foundUsers,
                currentUser: req.user
            })
        }
    })
});
// index user route

// facebook route
app.get('/auth/facebook',
    passport.authenticate('facebook', {scope: ["public_profile"]})
);

app.get('/auth/facebook/index',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("/index");
    }
);


// cart route
app.get("/cart", (req, res) => {
    User.find({}, function(err, foundUsers){
        if(err){
            console.log(err)
        } else {
            res.render("cart", {
                foundUsers: foundUsers,
                currentUser: req.user
            })
        }
    })
});
// cart route

// checkout route
app.get("/checkout", (req, res) => {
    User.find({}, function(err, foundUsers){
        if(err){
            console.log(err)
        } else {
            res.render("checkout", {
                foundUsers: foundUsers,
                currentUser: req.user
            })
        }
    })
});
// checkout route

<<<<<<< HEAD
// register routes
app.get("/register", (req, res) => {
    res.render("register")
});

app.post("/register", (req, res) => {
    User.register({
        username: req.body.username,
        useremail: req.body.email,
        phoneno: req.body.phoneno
    }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/");
            });
        }
    });
});
// register routes
=======
   res.render("register")
})
>>>>>>> 3775a26d72bda2a9958106a2ecff493fed253121

// login routes
app.get("/login", (req, res) => {

    res.render("login")
});

app.post("/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/");
            });
        }
    })
})
// login routes

// logout route
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});
// logout route

app.get("/uploadalbum", (req, res) => {
    User.find({}, function(err, foundUsers){
        if(err){
            console.log(err)
        } else {
            res.render("uploadalbum", {
                foundUsers: foundUsers,
                currentUser: req.user
            })
        }
    })
})

<<<<<<< HEAD
app.get("/uploadsong", (req, res) => {
    User.find({}, function(err, foundUsers){
        if(err){
            console.log(err)
        } else {
            res.render("uploadsong", {
                foundUsers: foundUsers,
                currentUser: req.user
=======
    if(req.isAuthenticated()){

        res.render("uploads")

    } else{

        res.redirect("/login")
    }

    
})
app.post("/register" , (req,res)=>{

    User.register({username:req.body.username , email:req.body.email} , req.body.password , function(err, user){

        if(err){
            res.redirect("/register")
        } else{

            passport.authenticate("local")(req,res, function(){

                res.redirect("/uploads")
            })
        }
    })
})

app.post("/login", (req,res)=>{

    var user = new User({
        username:req.body.username,
        password:req.body.password
    })

    req.login(user, function(err){

        if(err){

            res.redirect("/login")
        } else {

            passport.authenticate("local")(req, res , ()=>{

                res.redirect("/uploads")
>>>>>>> 3775a26d72bda2a9958106a2ecff493fed253121
            })
        }
    })
})
app.get("/:id", (req,res)=>{

    User.findById(req.params.id, function(err, foundUser){

        if(err){

            console.log(err)
        }else{

            res.render("profile", {currentUser:foundUser})
        }
    })
})



app.listen(3000, function () {
    console.log("Server is started on port 3000");
});