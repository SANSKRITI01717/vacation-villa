const express=require("express");
const mongoose=require("mongoose");
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");
const expressError=require("./utils/expressError.js");
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");
const cookieparser=require("cookie-parser");
const session=require("express-session");
const flash=require("connect-flash");
app.listen(3000,()=>{
    console.log("i am working!");
})
const sessionOptions={
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000, //in ms
    maxAge:7*24*60*60*1000,
    httpOnly:true
  }
}

app.use(session(sessionOptions));
  app.use(flash());//flash should be before routes bcz flash come before than come routes
app.use(cookieparser("secreatecode"));
app.engine('ejs', ejsMate);


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname,"public")));
const methodoverride=require("method-override");
const { sign } = require("crypto");

app.use(methodoverride("_method"));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dermo');
  console.log("connection successfull!");

}
main().catch((err)=>{
  console.log(err);
})
app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
 res.locals.error = req.flash("error");
  next();
})
//------------------------------------------------------listing
app.use("/listing",listings);

//-----------------------------------------------root route
app.get("/",(req,res)=>{
  console.log(req.cookies);
   res.send("i am happy");
})
//---------------------------------------review
app.use("/listing/:id/reviews",reviews);
//-----------------------------------------------------
app.use((req, res, next) => {
  console.log("Incoming request...");
  next();
});


//------------------------------page not found
app.use((req,res,next)=>{
  next(new expressError(404,"page not found"));
})
//-----------------------error middlebare
app.use((err,req,res,next)=>{
  let {status=500,message="something went wrong!"}=err;
 res.status(status).render("./listing/error.ejs",{message});
 
})
