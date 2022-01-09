var mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');


const userSchema = new mongoose.Schema({
    username: String,
    useremail: String,
    password: String,
    phoneno: String,
    googleId: String,
    facebookId: String,

});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports =  mongoose.model("User", userSchema)