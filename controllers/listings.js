const listing=require("../models/listing");

module.exports.index=async(req,res)=>{
 const listings = await listing.find({});
//  console.log(listings)
 res.render("./listing/index.ejs",{listings});
}
module.exports.rendernewform=(req,res)=>{
 
  res.render("./listing/new.ejs");
}
module.exports.shownewlisting=async(req,res)=>{
   let {id}=req.params;
   const ALLlisting= await listing.findById(id).populate({path:"review",populate:{path:"author"},}).populate("owner");
   // We use.populate Here because. Populate. Like we have taken reference object ID from reviews and owner. So to see the all information of it. We use populate.
   console.log(ALLlisting);
   if(!ALLlisting){
     req.flash("error","the listing you are trying to find does not exists");
     res.redirect("/listing");
     return;
   }
   res.render("./listing/show.ejs",{ALLlisting});
}
module.exports.createnewlisting=async (req, res,next) => {

   let url=req.file.path;
   let filename=req.file.filename;
   console.log(url,"---",filename);
  const newlisting = new listing(req.body.listing);

  newlisting.owner=req.user._id;
  newlisting.image={url,filename};
  await newlisting.save();
  req.flash("success","new listing added!");
  res.redirect("/listing");
}
module.exports.updatelisting=async(req,res)=>{
    let {id}=req.params;
    const toupdate= await listing.findById(id);
    let orginalimageurl=toupdate.image.url;
    orginalimageurl.replace('/upload','/upload/h_300,w_250');
    res.render("./listing/update.ejs",{toupdate,orginalimageurl});
}
module.exports.updatelistingform=async(req,res)=>{
  let {id}=req.params;
  let Listing=await listing.findByIdAndUpdate(id,{...req.body.listing});
  if(req.filename){
    let url=req.file.path;
   let filename=req.file.filename;
   Listing.image={url,filename};
   await Listing.save();
  }
   
    req.flash("success","listing updated!");
  res.redirect(`/listing/${id}`);
}
module.exports.deletelisting=async(req,res)=>{
  let {id}=req.params;
 let deletedlisting=await listing.findByIdAndDelete(id);
 console.log(deletedlisting);
  req.flash("success","listing deleted!");
 res.redirect("/listing");
}