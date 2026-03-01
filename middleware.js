const listing=require("./models/listing");
const expressError=require("./utils/expressError.js");
const {listSchema,reviewSchema}=require("./schema.js");
module.exports.isloggedin=(req,res,next)=>{
     if(!req.isAuthenticated()){
      req.session.redirectUrl=req.originalUrl;
      // Originally URL stores. The URL of the original path that we were accessing.
    req.flash("error"," You must be logged in to create a listing!");
   return  res.redirect("/login");
  }
  next();
};
// We are using saveredirectURL here as a middleware because. By default, when we log in, the passport resets the sessions. And this information that we stored about the original URL get reset. So basically if we won't use locals because passport don't have access and it can't reset. Locals. So we can save our information there.
module.exports.saveRedirectUrl=(req,res,next)=>{
  if( req.session.redirectUrl){
    res.locals.redirectUrl= req.session.redirectUrl;
  }
  next();
};
module.exports.isOwner=async(req,res,next)=>{
   let {id}=req.params;
   let Listing= await listing.findById(id);
   if(! Listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error"," You don't have the permission to Edit or delete this listing");
    return res.redirect(`/listing/${id}`);
   }
   next();
}
//----------------------------------------------error validation
module.exports.validatelisting=(req,res,next)=>{
     const { error } = listSchema.validate(req.body);

  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new expressError(400, msg);
  }else{
    next();
  }
};
//----------------------------------------------------review validation
module.exports.validatereview=(req,res,next)=>{
     const { error } = reviewSchema.validate(req.body);

  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new expressError(400, msg);
  }else{
    next();
  }
}