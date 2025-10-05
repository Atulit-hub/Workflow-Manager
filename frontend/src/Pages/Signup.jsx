import "../App.css"
import {useNavigate} from "react-router-dom"
import {useState} from "react"
export function Signup(){
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");

    function handleName(e){
        setName(e.target.value)
    }
    function handlePass(e){
        setPassword(e.target.value)
    }
    async function handle(){
        try{
            const res = await fetch("http://localhost:3000/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name,password})
            })
            const data = await res.json();
            if(res.ok){
                localStorage.setItem("token",data.token);
                navigate('/Dashboard')
            }
            else{
                alert("user already exist")
            }
        }
        catch(err){
            alert("something went wrong"+err)
        }
    }
    return(
        <div>
            <h1>Signup to workflow manager</h1>
            <input className="namebox1" type="text" placeholder="enter name" onChange={handleName}></input><br></br>
            <input className="passbox1" type="text" placeholder="enter password" onChange={handlePass}></input><br></br>
            <button onClick={handle}>Submit</button>
        </div>
    )
}