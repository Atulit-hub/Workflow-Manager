const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./user.js");
const router = express.Router();
const jwt_secret = "87654321";

router.post("/signup",async function(req,res){
    const {name,password} = req.body;
    try{
        const exist = await User.findOne({name});
        if(exist){
            return res.status(411).json({msg:"user already exist"});
        }
        const hashedPass = await bcrypt.hash(password,10);
        const newUser = new User({
            userName:name,
            password:hashedPass
        })
        await newUser.save();

        //genrate token
        const token  = jwt.sign({id:newUser._id},jwt_secret);
        res.json({token});
    }
    catch(err){
        res.status(500).json({msg:"something went wrong"});
    }
})
module.exports=router;