
import { useState } from "react";
import supabase from "../config/supabaseClient";

function SignIn() {
   
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  let handleSubmit = async (e) =>{
    e.preventDefault();
    let {data, error} = await supabase.auth.signUp({
        email: email,
        password: password
    })
    if(error){
        console.log("Error signing up:", error);
        return;
    } else {
        console.log("Sign up successful!", data);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#232b2b]">
      <h1 className="text-white">Sign Up Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <input 
            type="text" 
            placeholder="Email" 
            className="text-white"
            value={email} 
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="text-white"
            value={password}
            onChange={handlePasswordChange}
          />

          <button
            className="bg-[#3f3f3f] text-white p-2 rounded-md transition-all duration-150
            hover:bg-[#525252]
            active:scale-95
           active:bg-[#2f2f2f]
            active:shadow-inner"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>

      
    </div>
  );
}

export default SignIn;
