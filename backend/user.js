const mongoose = require("./db");

const userSchema = new mongoose.Schema({
    userName:String,
    password:String
})
const users = mongoose.model("users",userSchema);
module.exports=users;