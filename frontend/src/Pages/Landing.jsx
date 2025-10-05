import '../App.css'
import {useNavigate} from 'react-router-dom'
export function Landing() {
    const navigate = useNavigate()
  return (
    <div className="Landing">
        <div className="child"><h1>WORKFLOW MANAGER</h1>
        <h4>Click here to sign up or sign in</h4>
        </div>
        <button onClick={()=>
            navigate("/Signup")
        }>Sign up</button>

        <button onClick={()=>
            navigate("/Signin")
        }>Sign in</button>
    </div>
  )
}

