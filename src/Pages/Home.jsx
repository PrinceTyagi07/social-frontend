import React, { useState } from 'react';
import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Signup';

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="max-w-md mx-auto border-gray-300 rounded-lg shadow-xl mt-10">
      <div className='border border-gray-300 shadow-2xl p-4'>
        <div>
          {showLogin ? <Login /> : <Signup />}
        </div>
        <div className="flex flex-col items-center mt-4">
          <p className="mb-2 text-gray-700">
            {showLogin ? "Don't have an Account?" : "Already have an account?"}
          </p>
          <button
            className="w-[95%] py-2 rounded-md bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold transition-transform duration-200 hover:scale-95 active:scale-110"
            onClick={() => setShowLogin(!showLogin)}
          >
            {showLogin ? "Create Account" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;