import {useState,useEffect} from 'react'
export function Todos(){
    const [todos,setTodos]=useState([]);
    const token = localStorage.getItem("token")

    useEffect(() => {
        fetch("http://localhost:3000/todos",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        })
        .then(async (res) => {
            const json = await res.json();
            setTodos(json.todos);
        })
        .catch((err) => {
            console.error("Failed to fetch:", err);
        });
    }, [token]);

    //delete todo
    const handleDelete = async(id)=>{
        try{
            const res = await fetch("http://localhost:3000/del",{
                method:"DELETE",
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({ id }),
            })

            const data = await res.json().msg;
            if(res.ok){
                setTodos(todos.filter(todo => todo._id !== id));
            }
            else{
                alert("failed to delete : "+ data.msg)
            }
        }
        catch(err){
            alert("something went wrong"+err)
        }
    }

    //update todo
    const handleUpdate = async(id)=>{
        try{
            const res = await fetch("http://localhost:3000/completed",{
                method:"PUT",
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({ id }),
            })

            const data = await res.json().msg;
            if(!res.ok){
                alert("not updated"+data.msg)
            }
            else{
                setTodos(
                    todos.map((todo) =>
                    todo._id === id ? { ...todo, completed: true } : todo
                    )
                );
            }
            
        }
        catch(err){
            alert("something went wrong"+err)
        }

    }

    return <div className="allTodos">
         {todos.map(function(todo){
          return <div className="todos" key={todo._id || todo.id}>
               <h1>{todo.title}</h1>
               <h2>{todo.description}</h2>
               <button onClick={()=>handleUpdate(todo._id)}>{todo.completed==true?"completed":"mark as completed"}</button>
               <button onClick={()=>handleDelete(todo._id)}>Delete</button>
          </div>
         })}
    </div>
}