const mongoose=require("mongoose");
const initdata=require("./data.js");
const listing=require("../models/listing.js");
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dermo');
  console.log("connectio successful!");

}
main().then((res)=>{
  console.log(res);
}).catch((err)=>{
  console.log(err);
})
const initDB=async()=>{
    await listing.deleteMany({});
    await listing.insertMany(initdata.data);
    console.log("data was initalized!");
}
initDB();