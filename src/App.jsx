import supabase from './config/supabaseClient'
import { Route, Routes } from 'react-router'
import TaskManager from './pages/TaskManager'
function App() {
  
  console.log(supabase)

  return (

      <Routes>
        <Route path='/' element={<TaskManager />} />

      </Routes>
    
  )
}

export default App
