const mongoose=require("mongoose");
const Schema = mongoose.Schema; 
const review=require("./review.js");
const { string } = require("joi");
const listSchema=new mongoose.Schema({
    title:{
      type: String,
       required:true
    },
    description : String,
image: {
 url:String,
 filename:String,
}
,

    price:Number,
    location:String,
    country:String,
    review:[{
        type:Schema.Types.ObjectId,
        ref:"review"
    }
],
owner:{
     type:Schema.Types.ObjectId,
        ref:"User"
}
})
listSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
         await review.deleteMany( {_id: {$in :listing.reviews}});
    }

})
const listing=mongoose.model("listing",listSchema);
module.exports=listing;