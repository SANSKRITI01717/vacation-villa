const express=require("express");
const usercontroller=require("../controllers/users.js");
const router = express.Router();
const User=require("../models/user");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const wrapAsync=require("../utils/wrapAsync.js");
router.route("/signup").
get(usercontroller.signuprender)
.post(wrapAsync(usercontroller.signup));

 router.route("/login")
 .get(usercontroller.loginrender)
 .post(saveRedirectUrl,
  passport.authenticate('local', { failureRedirect: '/login' ,failureFlash:true}),usercontroller.login
);
 router.get("/logout",usercontroller.logout);
module.exports=router;