const express = require("express");
const {router:signRouter,middleWare} = require("./sign.js");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const {createTodo,updateTodo} = require("./zod");
const {todo} = require("./db");

app.use("/",signRouter);

app.post("/todo",middleWare,async function(req,res){
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg:"wrong input"
        })
        return;
    }
    //put in database
    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false,
        userId:req.userId
    })
    return res.status(200).json({msg:"posted"})
})


app.get("/todos",middleWare,async function(req,res){
    const todos = await todo.find({userId:req.userId});
    res.json({todos});
})

app.delete("/del",middleWare,async function(req,res){
    try{
        const {id} = req.body;
        const deletedTodo = await todo.findByIdAndDelete(id);
        if(!deletedTodo){
            return res.status(404).json({msg:"Todo not found"})
        }
        else{
            return res.status(200).json({msg:"Todo deleted"});
        }
    }
    catch(err){
        return res.status(500).json({ message: "Server error" });
    }

})

app.put("/completed",middleWare,async function(req,res){
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);
    if(!parsePayload.success){
        return res.status(403).json({
            msg:"invalid id"
        });
    }
    await todo.updateOne({
        _id:updatePayload.id,userId:req.userId
    },{
        completed:true
    })
    return res.status(200).json({
        msg:"updated"
    })

})
app.listen(3000);