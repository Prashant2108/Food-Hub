require("dotenv").config();
var express= require("express");
var app = express();
var bodyParser= require("body-parser");
var mongoose = require("mongoose");
var flash= require("connect-flash");

var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride= require("method-override");
var Campground= require("./models/campground");
var Comment= require("./models/comment");
var User= require("./models/user");
var seedDB= require("./seeds");

var commentRoutes= require("./routes/comments");
var campgroundRoutes= require("./routes/campgrounds");
//var reviewRoutes     = require("./routes/reviews");
var indexRoutes= require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v10";
mongoose.connect(url, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');
//seedDB();

app.use(require("express-session")({
	secret: "Prashant you're awesome!!!",
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
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
//app.use("/campgrounds/:id/reviews", reviewRoutes);

// Deleting Cuisines from Database
//Campground.remove({}, function (err) {
//  if (err) {
//    console.log(err);
//  } else {
//    console.log("Removed campgrounds.");
//  }
// });

//app.listen(3000, ()=>{
//	console.log("Server is connected!!!");
//});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});

