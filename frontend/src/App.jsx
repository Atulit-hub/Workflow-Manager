import { useState,useEffect } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Dashboard} from './Pages/Dashboard'
import {Landing} from './Pages/Landing'
import {Signin} from './Pages/Signin'
import {Signup} from './Pages/Signup'
import {Todos} from './components/Todos'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/Signin" element={<Signin/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="Todos" element={<Todos/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
