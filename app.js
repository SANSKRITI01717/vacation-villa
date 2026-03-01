const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
const listingsroute = require("./routes/listing.js");
const reviewsroute = require("./routes/review.js");
const userroute = require("./routes/user.js");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const sessionOptions = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //in ms
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}

app.use(session(sessionOptions));
app.use(flash());//flash should be before routes bcz flash come before than come routes
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(cookieparser("secreatecode"));
app.engine('ejs', ejsMate);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));
const methodoverride = require("method-override");
const { sign } = require("crypto");

app.use(methodoverride("_method"));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dermo');
  console.log("connection successfull!");

}
main().catch((err) => {
  console.log(err);
})
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser=req.user;
  next();
})
//------------------------------------------------------listing
app.use("/listing", listingsroute);

//-----------------------------------------------root route
app.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("i am happy");
})
//---------------------------------------review
app.use("/listing/:id/reviews", reviewsroute);
//-----------------------------------------------------
app.use((req, res, next) => {
  console.log("Incoming request...");
  next();
});
//-------------------------user
app.use("/",userroute);

//------------------------------page not found
app.use((req, res, next) => {
  next(new expressError(404, "page not found"));
})
//-----------------------error middlebare
app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong!" } = err;
  res.status(status).render("./listing/error.ejs", { message });

})
app.listen(3000, () => {
  console.log("i am working!");
})