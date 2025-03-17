import React, { useState } from 'react'; // Import useState correctly

import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Signup';

const Home = () => {
  const [showLogin, setShowLogin] = useState(true); // Correct usage of useState

  return (
    <div className="max-w-md mx-auto border-gray-300 rounded-lg shadow-xl">
      <div className='border border-gray-300 shadow-2xl p-4 mt-4 '>
      <div >
        {showLogin ? <Login />:<Signup />} {/* Use showLogin directly */}
      </div>
      <div className="flex flex-col items-center">
        <p className="m-auto">
          {showLogin ? "Don't have an Account?" :"Already have an account?" } {/* Conditional text */}
        </p>
        <button
          className=" w-[95%] py-2 rounded-md bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold transition-transform duration-200 hover:scale-95 active:scale-110"
          onClick={() => setShowLogin(!showLogin)} // Toggle showLogin state
        >
          {showLogin ?  "Create Account" : "Login" } {/* Conditional button text */}
        </button>
      </div>
      </div>
    </div>
  );
};

export default Home;