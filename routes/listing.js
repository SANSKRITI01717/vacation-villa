const express=require("express");
const app=express();
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const listing=require("../models/listing");
const {isloggedin,validatelisting,isOwner}=require("../middleware.js");
const user = require("../models/user.js");

//-----------------------------------------Index route
router.get("/",wrapAsync(async(req,res)=>{
 const listings = await listing.find({});
//  console.log(listings)
 res.render("./listing/index.ejs",{listings});
}))
//----------------------------New route
router.get("/new",isloggedin,(req,res)=>{
 
  res.render("./listing/new.ejs");
})
//------------------------------------show route
router.get("/:id",wrapAsync(async(req,res)=>{
   let {id}=req.params;
   const ALLlisting= await listing.findById(id).populate("review").populate("owner");
   // We use.populate Here because. Populate. Like we have taken reference object ID from reviews and owner. So to see the all information of it. We use populate.
   console.log(ALLlisting);
   if(!ALLlisting){
     req.flash("error","the listing you are trying to find does not exists");
     res.redirect("/listing");
     return;
   }
   res.render("./listing/show.ejs",{ALLlisting});
}))
//--------------------------------------------add newlisting
router.post("/", isloggedin, validatelisting ,wrapAsync(async (req, res,next) => {


  const newlisting = new listing(req.body.listing);
  newlisting.owner=req.user._id;
  await newlisting.save();
  req.flash("success","new listing added!");
  res.redirect("/listing");
}));


//-----------------------------------------update route
router.get("/:id/edit", isloggedin,isOwner,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const toupdate= await listing.findById(id);
    res.render("./listing/update.ejs",{toupdate});
}))
//--------------------update route
router.put("/:id", isloggedin,isOwner,validatelisting,wrapAsync(async(req,res)=>{
  let {id}=req.params;
  await listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","listing updated!");
  res.redirect(`/listing/${id}`);
}))
//--------------------------------delete route
router.delete("/:id",isloggedin,isOwner,wrapAsync(async(req,res)=>{
  let {id}=req.params;
 let deletedlisting=await listing.findByIdAndDelete(id);
 console.log(deletedlisting);
  req.flash("success","listing deleted!");
 res.redirect("/listing");
}))
module.exports=router;