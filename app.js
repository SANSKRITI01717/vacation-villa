const express=require("express");
const mongoose=require("mongoose");
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");
const expressError=require("./utils/expressError.js");
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");
app.engine('ejs', ejsMate);
app.listen(3000,()=>{
    console.log("i am working!");
})
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname,"public")));
const methodoverride=require("method-override");

app.use(methodoverride("_method"));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dermo');
  console.log("connection successfull!");

}
main().catch((err)=>{
  console.log(err);
})

//------------------------------------------------------listing
app.use("/listing",listings);

//-----------------------------------------------root route
app.get("/",(req,res)=>{
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
