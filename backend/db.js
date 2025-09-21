/*
todo{
    title:string
    description:string
    completed:boolean
}
*/
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://saudyad42_db_user:UhH8II1aPfJCIScz@cluster0.brxscrm.mongodb.net/todos");
const todoSchema = mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean,
    userId:{
        type: mongoose.Schema.Types.ObjectId, // link to User collection
        ref: "users",                          // optional, for population
        required: true
    }
})
const todo = mongoose.model('todo',todoSchema);
module.exports={
    todo
};
