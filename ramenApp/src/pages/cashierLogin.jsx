import React from 'react';
import { useNavigate } from 'react-router-dom';

const CashierLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally handle authentication
    navigate('/POS');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-2 sm:px-4"
      style={{ backgroundImage: `url('/rrrr.jpg')` }}
    >
      <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-xs sm:max-w-md flex flex-col items-center">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white drop-shadow">Cashier Login</h3>
        <form className="w-full flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-700"
          />
          <button
            type="submit"
            className="mt-3 sm:mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow transition"
          >
            Login
          </button>
        </form>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/80 text-center">
          Not a cashier? <a href="/" className="underline text-blue-200 hover:text-blue-400">Switch to admin login</a>
        </p>
      </div>
    </div>
  );
};

export default CashierLogin;
