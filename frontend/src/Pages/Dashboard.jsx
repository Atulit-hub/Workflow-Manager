
import{CreateTodo}from'../components/CreateTodo'
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();
 
  function handleTodos(){
    navigate("/Todos")
  }

  return (
    <>
    <CreateTodo></CreateTodo>
    <button className="show" onClick={handleTodos}>show todos</button>
    </>
  )
}
