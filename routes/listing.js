const express=require("express");
const router=express.Router();
const {listSchema}=require("../schema.js");
const wrapAsync=require("../utils/wrapAsync.js");
const expressError=require("../utils/expressError.js");
const listing=require("../models/listing");
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
//-----------------------------------------Index route
router.get("/",wrapAsync(async(req,res)=>{
 const listings = await listing.find({});
//  console.log(listings)
 res.render("./listing/index.ejs",{listings});
}))
//----------------------------New route
router.get("/new",(req,res)=>{
  res.render("./listing/new.ejs");
})
//------------------------------------show route
router.get("/:id",wrapAsync(async(req,res)=>{
   let {id}=req.params;
   const ALLlisting= await listing.findById(id).populate("review");
   console.log(ALLlisting);
   res.render("./listing/show.ejs",{ALLlisting});
}))
//--------------------------------------------add newlisting
router.post("/",  validatelisting ,wrapAsync(async (req, res,next) => {


  const newlisting = new listing(req.body.listing);
  await newlisting.save();
  res.redirect("/listing");
}));


//-----------------------------------------update route
router.get("/:id/edit", wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const toupdate= await listing.findById(id);
    res.render("./listing/update.ejs",{toupdate});
}))
//--------------------updateroute
router.put("/:id", validatelisting,wrapAsync(async(req,res)=>{
  let {id}=req.params;

  await listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listing/${id}`);
}))
router.delete("/:id",wrapAsync(async(req,res)=>{
  let {id}=req.params;
 let deletedlisting=await listing.findByIdAndDelete(id);
 console.log(deletedlisting);
 res.redirect("/listing");
}))
module.exports=router;