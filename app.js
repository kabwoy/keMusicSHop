const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const app = express();
mongoose.connect("mongodb://localhost/usersDB")

app.set('view engine', 'ejs');
app.use(express.static("public"));
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

app.get("/", function(req, res){
    res.render("index");
});

app.get("/cart", (req, res) => {
    res.render("cart")
})

app.get("/checkout", (req, res) => {
    res.render("checkout")
})

app.get("/register", (req, res)=>{

   res.render("register")
})

app.get("/login", (req,res)=>{

    res.render("login")
})
app.get("/uploads", (req,res)=>{

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
            })
        }
    })
})




app.listen(3000, function(){
    console.log("Server is started on port 3000");
});