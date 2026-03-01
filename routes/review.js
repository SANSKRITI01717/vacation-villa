
const express=require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapAsync.js");
const {isloggedin,validatereview,isAuthor}=require("../middleware.js");
const review=require("../models/review");
const listing=require("../models/listing");
const reviewcontroller=require("../controllers/reviews.js");
//-------------------review route
router.post("/",isloggedin,validatereview, wrapAsync(reviewcontroller.reviewroute));
//-----------------------------delete review route
router.delete("/:reviewId",isloggedin,isAuthor,wrapAsync(reviewcontroller.deletereview));
module.exports=router;