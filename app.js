const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("index");
});

app.get("/register", (req, res)=>{

    res.render("register")
})

app.get("/login", (req,res)=>{

    res.render("login")
})



app.listen(3000, function(){
    console.log("Server is started on port 3000");
});