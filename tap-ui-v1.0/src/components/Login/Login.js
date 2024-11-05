import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmail } from '../../redux/actions/EmailActions';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
 
const Login = () => {
  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();  
  const navigate = useNavigate();  
 
  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };
 
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (!email || !password) {
      toast.error('Please fill in all the fields!');
      return;  
    }
 
    dispatch(setEmail(email));
 
    toast.success('Logged in successfully!');
 
    navigate('/dashboard');
  };
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-center text-[#27235C] mb-6">Login</h2>
 
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
 
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
 
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="w-full py-3 bg-[#27235C] text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#524F7D] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
 
        <div className="flex justify-center text-sm text-[#27235C]">
          <Link to="/forgetpassword" className="hover:text-[#6791ed]">
            Forgot Password?
          </Link>
         
        </div>
      </div>
    </div>
  );
};
 
export default Login;
 