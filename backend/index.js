const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const {createTodo,updateTodo} = require("./zod");
const {todo} = require("./db");

app.post("/todo",async function(req,res){
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if(!parsePayload){
        res.status(411).json({
            msg:"wrong input"
        })
        return;
    }
    //put in database
    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false
    })
    res.json({msg:"posted"})
})
app.get("/todos",async function(req,res){
    const todos = await todo.find({});
    res.json({todos});
})
app.put("/completed",async function(req,res){
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);
    if(!parsePayload){
        res.status(403).json({
            msg:"invalid id"
        });
    }
    await todo.updateOne({
        _id:updatePayload.id
    },{
        completed:true
    })
    res.json({
        msg:"updated"
    })

})
app.listen(3000);