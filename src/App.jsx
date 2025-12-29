import supabase from './config/supabaseClient'
import { Route, Routes } from 'react-router'
import { useState, useEffect} from 'react'
import TaskManager from './pages/TaskManager'
import LogIn from './pages/LogIn'
import SignIn from './pages/SignIn'

function App() {
  
  let [session, setSession] = useState(null)

  let fetchSession = async () => {
    let currentSession = await supabase.auth.getSession()
    console.log(currentSession)
    setSession(currentSession.data)
    console.log(session)
    
  }

  useEffect(() => {
    fetchSession()

  }, [])

  return (

      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/signup' element={<SignIn />} />
        <Route path='/tasks' element={<TaskManager />} />

      </Routes>
    
  )
}

export default App
