
const express=require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapAsync.js");
const expressError=require("../utils/expressError.js");
const {reviewSchema}=require("../schema.js");
const review=require("../models/review");
const listing=require("../models/listing");
//----------------------------------------------------review validation
const validatereview=(req,res,next)=>{
     const { error } = reviewSchema.validate(req.body);

  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new expressError(400, msg);
  }else{
    next();
  }
}

//-------------------review route
router.post("/",validatereview, wrapAsync(async (req, res) => {

    const listingDoc = await listing.findById(req.params.id);

    const newreview = new review(req.body.review);

    listingDoc.review.push(newreview);

    await newreview.save();
    await listingDoc.save();

    console.log("review added");
   console.log(req.body)
   req.flash("success","new review created");
    res.redirect(`/listing/${req.params.id}`);
}));
//-----------------------------delete review route
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
  let {id,reviewId}=req.params;
 
  await listing.findByIdAndUpdate(id,{$pull :{review :reviewId}});
   await review.findByIdAndDelete(reviewId);
      req.flash("success","review  deleted!");
  res.redirect(`/listing/${id}`);
}))
module.exports=router;