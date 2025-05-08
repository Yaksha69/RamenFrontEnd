import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col" data-theme="autumn">
      {/* Top Navigation Bar */}
      <header className="flex flex-wrap justify-between items-center p-4 bg-red-500 text-white custom-header sticky top-0 z-10">
        {/* Logo */}
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-lg font-bold">Ramen App</span>
        </div>
        {/* Account Section with Logout */}
        <div className="flex items-center mt-2 md:mt-0">
          <span className="mr-4 hidden sm:inline">Welcome, Admin</span>
          <button id="logoutButton" className="btn btn-error btn-sm">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-64 h-screen bg-base-200 text-base-content custom-sidebar text-white sticky top-0 hidden md:block">
          <div className="p-4">
            {/* Menu */}
            <h2 className="text-lg font-bold">Menu</h2>
            <ul className="mt-4">
              <li className="mb-2">
                <Link to="/dashboard" className="block p-2 rounded hover:bg-error">
                  <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/mobile-order" className="block p-2 rounded hover:bg-error">
                  <i className="fas fa-shopping-cart mr-2"></i> Orders
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/customers" className="block p-2 rounded hover:bg-error">
                  <i className="fas fa-users mr-2"></i> Customers
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/inventory" className="block p-2 rounded hover:bg-error">
                  <i className="fas fa-box-open mr-2"></i> Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/analytics" className="block p-2 rounded hover:bg-error">
                  <i className="fas fa-chart-line mr-2"></i> Analytics
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/settings" className="block p-2 rounded hover:bg-error">
                  <i className="fas fa-cog mr-2"></i> Settings
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 bg-base-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Navbar;