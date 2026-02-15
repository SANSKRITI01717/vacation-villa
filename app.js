const express=require("express");
const mongoose=require("mongoose");
const app=express();
const listing=require("./models/listing");
const path=require("path");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const expressError=require("./utils/expressError.js");
const Joi = require('joi');
const {listSchema}=require("./schema.js");
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
//----------------------------------------------error validation
const validatelisting=(req,res,next)=>{
     const { error } = listSchema.validate(req.body);

  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new expressError(400, msg);
  }else{
    next();
  }
}
//-----------------------------------------------root route
app.get("/",(req,res)=>{
   res.send("i am happy");
})
// app.get("/testing",async(req,res)=>{
//   let sample=new listing({
//     title:"my new villa",
//     description:"near the beach",
//     price:"1200",
//     location:"goa",
//     country:"india"
//   })
//   await sample.save();
//   console.log("saved !");
//   res.send("saved!");
// })
//-----------------------------------------Index route
app.get("/listing",wrapAsync(async(req,res)=>{
 const listings = await listing.find({});
//  console.log(listings)
 res.render("./listing/index.ejs",{listings});
}))
//----------------------------New route
app.get("/listing/new",(req,res)=>{
  res.render("./listing/new.ejs");
})
//------------------------------------show route
app.get("/listing/:id",wrapAsync(async(req,res)=>{
   let {id}=req.params;
   const ALLlisting= await listing.findById(id);
   console.log(ALLlisting);
   res.render("./listing/show.ejs",{ALLlisting});
}))
//-------------------
app.use((req, res, next) => {
  console.log("Incoming request...");
  next();
});
//--------------------------------------------add newlisting
app.post("/listing",  validatelisting ,wrapAsync(async (req, res,next) => {


  const newlisting = new listing(req.body.listing);
  await newlisting.save();
  res.redirect("/listing");
}));


//-----------------------------------------update route
app.get("/listing/:id/edit", wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const toupdate= await listing.findById(id);
    res.render("./listing/update.ejs",{toupdate});
}))
//--------------------updateroute
app.put("/listing/:id", validatelisting,wrapAsync(async(req,res)=>{
  let {id}=req.params;

  await listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listing/${id}`);
}))
app.delete("/listing/:id",wrapAsync(async(req,res)=>{
  let {id}=req.params;
 let deletedlisting=await listing.findByIdAndDelete(id);
 console.log(deletedlisting);
 res.redirect("/listing");
}))
//------------------------------page not found
app.use((req,res,next)=>{
  next(new expressError(404,"page not found"));
})

//-----------------------error middlebare
app.use((err,req,res,next)=>{
  let {status=500,message="something went wrong!"}=err;
 res.status(status).render("./listing/error.ejs",{message});
 
})