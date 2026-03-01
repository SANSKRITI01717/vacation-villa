const express=require("express");
const usercontroller=require("../controllers/users.js");
const router = express.Router();
const User=require("../models/user");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const wrapAsync=require("../utils/wrapAsync.js");
router.get("/signup",usercontroller.signuprender)

router.post("/signup",wrapAsync(usercontroller.signup));
router.get("/login",usercontroller.loginrender);
router.post('/login', saveRedirectUrl,
  passport.authenticate('local', { failureRedirect: '/login' ,failureFlash:true}),usercontroller.login
);
 router.get("/logout",usercontroller.logout);
module.exports=router;