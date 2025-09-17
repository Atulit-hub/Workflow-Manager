import {useState} from 'react';
export function CreateTodo(){
    const[title,setTitle]=useState("");
    const[description,setDesc]=useState("");
    return <div>
        <input style={{padding:10,margin:10}} type="text" placeholder="title" onChange={function(e){
            setTitle(e.target.value);
        }}></input><br></br>
        <input style={{padding:10,margin:10}} type="text" placeholder="description" onChange={function(e){
            setDesc(e.target.value);
        }}></input><br></br>
        <button style={{padding:10,margin:10}} onClick={()=>{
            fetch("http://localhost:3000/todo", {
                method: "POST",
                body: JSON.stringify({
                title: title,
                description: description
                }),
                headers: {
                "Content-Type": "application/json"
                }
                })
                .then(async function(res) {
                const json = await res.json();
                alert("Todo added");
                })
        }}>add a todo</button>
    </div>
}