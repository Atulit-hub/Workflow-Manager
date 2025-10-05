import {useState} from 'react';
export function CreateTodo(){
    const[title,setTitle]=useState("");
    const[description,setDesc]=useState("");

    async function handleAddTodo(){
        const token = localStorage.getItem("token")
        try{
            const res = await fetch("http://localhost:3000/todo", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token, 
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                }),
            });
             const data = await res.json();
             if(res.ok){
                alert("todo added successfully")
             }
             else{
                alert(data.msg)
             }
        }
        catch(err){
             alert("Something went wrong: " + err);
        }
    }

    return <div>
        <input style={{padding:10,margin:10}} type="text" placeholder="title" onChange={function(e){
            setTitle(e.target.value);
        }}></input><br></br>
        <input style={{padding:10,margin:10}} type="text" placeholder="description" onChange={function(e){
            setDesc(e.target.value);
        }}></input><br></br>
        <button style={{padding:10,margin:10}} onClick={handleAddTodo}>add a todo</button>
    </div>
}