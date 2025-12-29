import supabase from "../config/supabaseClient"
import { useState } from "react"
import {useNavigate} from "react-router"
import {Link} from 'react-router'

function LogIn() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  let handleSubmit = async (e) =>{
    e.preventDefault();
    let {data, error} =  await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if(error){
        console.log("Error logging in:", error);
        return;
    } 
    if(data){
      console.log("Log in successful!", data);
      navigate("/tasks")

    }
        
        
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#232b2b]">
      <h1 className="text-white">Log In Page</h1>
      <form onClick={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <input 
            type="text" 
            placeholder="Email" 
            className="text-white" 
            onChange={handleEmailChange} 
          />
          <input
            type="password"
            placeholder="Password"
            className="text-white"
            onChange={handlePasswordChange}
          />

          <button
            className="bg-[#3f3f3f] text-white p-2 rounded-md transition-all duration-150
            hover:bg-[#525252]
            active:scale-95
           active:bg-[#2f2f2f]
            active:shadow-inner"
          >
            Log In
          </button>
        </div>
      </form>

      <div className="mt-4">
        <p className="text-white ">Don't have an account? <Link to="/signup" className="cursor-pointer underline">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default LogIn;
