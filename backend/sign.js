const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./user.js");
const router = express.Router();
const jwt_secret = "87654321";
//signup 
router.post("/signup",async function(req,res){
    const {name,password} = req.body;
    try{
        const exist = await User.findOne({userName:name});
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
//signin
router.post('/signin',async function(req,res){
    const{name,password}=req.body;
    try{
        const user = await User.findOne({userName:name});
        if(!user){
            return res.status(411).json({msg:"user does not exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password); 
        if(!isMatch){
            return res.status(401).json({msg:"wrong password"});
        }
        //return token
        const token = jwt.sign({id:user._id},jwt_secret);
        res.json({token});
    }
    catch(err){
        res.status(411).json({msg:"something went wrong"+err});
    }
})
//Middleware
function middleWare(req,res,next){
    const token  = req.headers["authorization"];
    if(!token){
        return res.status(411).json({msg:"request fail"});
    }
    try{
        const decoded = jwt.verify(token.split(" ")[1],jwt_secret);
        req.userId = decoded.id;
        next();
    }
    catch(err){
        res.status(411).json({msg:"something went wrong"+err});
    }
}

module.exports={router,middleWare};