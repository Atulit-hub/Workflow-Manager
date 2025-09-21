const zod = require("zod");
/*{
    title:string
    description:string
}
{
    id:string
}*/
const createTodo = zod.object({
    title:zod.string(),
    description:zod.string()
})
const updateTodo = zod.object({
    id:zod.string()
})
const info = zod.object({
    name:zod.string()
                .min(3,"name must have minimum 3 characters")
                .max(30,"name too long")
                .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
    password:zod.string()
                .min(4,"at least 4 digit password required")
})
module.exports={
    createTodo:createTodo,
    updateTodo:updateTodo,
    info:info
}