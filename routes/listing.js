const express=require("express");
const app=express();
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const listing=require("../models/listing");
const {isloggedin,validatelisting,isOwner}=require("../middleware.js");
const user = require("../models/user.js");
const listingcontroller=require("../controllers/listings.js");
const { render } = require("ejs");
const multer  = require('multer')
const {storage}=require("../cloudconfig.js");
const upload = multer({storage });
//-----------------------------------------Index route
router.route("/")
.get(wrapAsync(listingcontroller.index))
.post( isloggedin,
 
     upload.single('listing[image]'),
         validatelisting ,
     wrapAsync(listingcontroller.createnewlisting));

//----------------------------New route
router.get("/new",isloggedin,listingcontroller.rendernewform);
//------------------------------------show route
router.route("/:id")
.get(wrapAsync(listingcontroller.shownewlisting))
.put( isloggedin,isOwner,validatelisting,wrapAsync(listingcontroller.updatelistingform))
.delete(isloggedin,isOwner,wrapAsync(listingcontroller.deletelisting));


//-----------------------------------------update route
router.get("/:id/edit", isloggedin,isOwner,wrapAsync(listingcontroller.updatelisting));
module.exports=router;