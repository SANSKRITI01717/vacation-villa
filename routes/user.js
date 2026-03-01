const express=require("express");
const router = express.Router();
const User=require("../models/user");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
router.get("/signup",(req,res)=>{
    res.render("./user/signup.ejs");
})
const wrapAsync=require("../utils/wrapAsync.js");
router.post("/signup",wrapAsync(async(req,res)=>{
    try{
      let {username,email,password}=req.body;
    const newUser=new User({username,email});
   const registeredUser= await User.register(newUser,password);
   console.log(registeredUser);
   req.login(registeredUser,(err)=>{
    if(err){
      return next(err);
    }
      req.flash("success","user was registered!");
   res.redirect("/listing");
   })
 
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
   
}));
router.get("/login",(req,res)=>{
    res.render("./user/login.ejs");
})
router.post('/login', saveRedirectUrl,
  passport.authenticate('local', { failureRedirect: '/login' ,failureFlash:true}),async(req, res) =>{
    
    res.redirect(res.locals.redirectUrl || "/listing");
  });
  router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success","you are logout successfully");
        res.redirect( "/listing");
    })
  })
module.exports=router;