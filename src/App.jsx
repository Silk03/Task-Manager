import supabase from './config/supabaseClient'
import { Route, Routes } from 'react-router'
import TaskManager from './pages/TaskManager'
import LogIn from './pages/LogIn'
import SignIn from './pages/SignIn'
function App() {
  
  console.log(supabase)

  return (

      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/signup' element={<SignIn />} />
        <Route path='/tasks' element={<TaskManager />} />

      </Routes>
    
  )
}

export default App
