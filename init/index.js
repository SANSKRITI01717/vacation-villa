const mongoose=require("mongoose");
const initdata=require("./data.js");
const listing=require("../models/listing.js");
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dermo');
  console.log("connection successfull!");

}
main().then((res)=>{
  // console.log(res);
}).catch((err)=>{
  console.log(err);
})
const initDB=async()=>{
    await listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:'69a3ce59733a011081ca9cc8'}));
    await listing.insertMany(initdata.data);
    console.log("data was initalized!");
}
initDB();