import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally handle authentication
    navigate('/dashboard');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/rrrr.jpg')` }}
    >
      <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-white drop-shadow">Login</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 rounded-lg bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-700"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-white/80">
          Not an admin? <a href="/cashier-login" className="underline text-blue-200 hover:text-blue-400">Switch to cashier login</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
