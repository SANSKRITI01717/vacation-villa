const express=require("express");
const app=express();
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const listing=require("../models/listing");
const {isloggedin,validatelisting,isOwner}=require("../middleware.js");
const user = require("../models/user.js");
const listingcontroller=require("../controllers/listings.js");
const { render } = require("ejs");
//-----------------------------------------Index route
router.get("/",wrapAsync(listingcontroller.index));
//----------------------------New route
router.get("/new",isloggedin,listingcontroller.rendernewform);
//------------------------------------show route
router.get("/:id",wrapAsync(listingcontroller.shownewlisting));
//--------------------------------------------add newlisting
router.post("/", isloggedin, validatelisting ,wrapAsync(listingcontroller.createnewlisting));


//-----------------------------------------update route
router.get("/:id/edit", isloggedin,isOwner,wrapAsync(listingcontroller.updatelisting));
//--------------------update route
router.put("/:id", isloggedin,isOwner,validatelisting,wrapAsync(listingcontroller.updatelistingform));
//--------------------------------delete route
router.delete("/:id",isloggedin,isOwner,wrapAsync(listingcontroller.deletelisting));
module.exports=router;