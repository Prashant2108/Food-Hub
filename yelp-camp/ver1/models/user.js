var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);