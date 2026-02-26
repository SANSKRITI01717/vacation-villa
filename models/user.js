const mongoose=require("mongoose");
const Schema = mongoose.Schema; 
const passportlocalMongoose = require("passport-local-mongoose").default || require("passport-local-mongoose");
const UserSchema=new Schema({
    email:{
        type:String,
        required:true
    }//passport local mongoosh already create password and username and alo aunthaticate
})
UserSchema.plugin(passportlocalMongoose);
module.exports = mongoose.model('User', UserSchema);