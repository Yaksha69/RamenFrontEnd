// ramenApp/src/App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Inventory from './pages/inventory';
import MobileOrder from './pages/mobileOrder';
import POS from './pages/POS';
import SalesReport from './pages/salesReport';
import Login from './pages/login';
import CashierLogin from './pages/cashierLogin';
function App() {
  return (
  <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cashier-login" element={<CashierLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/mobile-order" element={<MobileOrder />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/Reports" element={<SalesReport />} />
        </Routes>
      </BrowserRouter>
  </>
  );
}

export default App;
