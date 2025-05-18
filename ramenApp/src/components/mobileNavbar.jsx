// components/mobileNavbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import admin from '../assets/adminPIC.png';
import notif from '../assets/notif.png';
import './navbar.css';

const MobileNavbar = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Placeholder for actual logout logic
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col" data-theme="autumn">
      {/* Top Navigation Bar */}
      <header className="navbar flex flex-wrap justify-between items-center p-2 text-white sticky top-0 z-10">
        <div className="flex items-center">
          <button className="md:hidden mr-2 p-2 focus:outline-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
          <span className="text-lg font-bold">Ramen App</span>
        </div>
        {/* Account Section with Logout */}
        <div className="flex items-center mt-2 md:mt-0">
          <img src={notif} alt='notif' className="h-10 w-10 mr-2" />
          <div className="relative" ref={dropdownRef}>
            <img
              src={admin}
              alt="admin"
              className='h-10 w-10 mr-2 cursor-pointer rounded-full border-2 border-white'
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg z-50">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-red-100 rounded-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area: flex-row on desktop, flex-col on mobile */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>
        )}
        {/* Sidebar */}
        <nav
          className={`
            sidebar
            w-64 h-full z-40
            fixed top-0 left-0 md:static
            transform md:transform-none
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
            transition-transform duration-200 ease-in-out
            md:relative
            md:block
          `}
          style={{ minHeight: '100vh' }}
        >
          <div className="p-4">
            {/* Menu */}
            <h2 className="text-lg font-bold">Menu</h2>
            <ul className="mt-4">
              <li className="mb-2">
                <Link to="/POS" className="block p-2 rounded">
                  <i className="fas fa-tachometer-alt mr-2"></i> Point of Sale
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/mobile-order" className="block p-2 rounded">
                  <i className="fas fa-shopping-cart mr-2"></i> Mobile Order
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-2 md:p-4 bg-base-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MobileNavbar;
