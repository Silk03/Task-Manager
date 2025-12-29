
import {Link} from 'react-router'

function LogIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#232b2b]">
      <h1 className="text-white">Log In Page</h1>
      <form action="">
        <div className="flex flex-col space-y-4">
          <input type="text" placeholder="Email" className="text-white" />
          <input
            type="password"
            placeholder="Password"
            className="text-white"
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
