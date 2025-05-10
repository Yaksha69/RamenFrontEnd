import React, { useState } from 'react';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaSearch } from 'react-icons/fa';

function SalesReport() {
  const salesData = [
    { id: '00000001', type: 'Dine In', items: '3 Items', price: '₱430', date: '11/12/22' },
    { id: '00000002', type: 'Pick Up', items: '5 Items', price: '₱257', date: '2/12/22' },
    { id: '00000003', type: 'Delivery', items: '10 Items', price: '₱405', date: '5/12/22' },
    { id: '00000004', type: 'Dine In', items: '1 Items', price: '₱502', date: '8/12/22' },
    { id: '00000005', type: 'Pick Up', items: '5 Items', price: '₱530', date: '9/1/23' },
    { id: '00000006', type: 'Dine In', items: '2 Items', price: '₱605', date: '9/1/23' },
    { id: '00000007', type: 'Delivery', items: '5 Items', price: '₱408', date: '15/12/23' },
    { id: '00000008', type: 'Delivery', items: '3 Items', price: '₱359', date: '6/6/23' },
    { id: '00000009', type: 'Dine In', items: '8 Items', price: '₱205', date: '11/11/22' }
  ];

  return (
    <Navbar>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Sales Reports</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button type="button" className="btn btn-sm btn-primary">
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
  <div className="bg-white rounded-xl shadow p-6 flex flex-col">
    <span className="text-blue-500 font-medium mb-2">Total Sales</span>
    <span className="text-2xl font-bold mb-3">100,000</span>
    <span className="text-black-500 text-sm font-medium">Last 7 Days</span>
  </div>
  <div className="bg-white rounded-xl shadow p-6 flex flex-col">
    <span className="text-yellow-500 font-medium mb-2">Total Orders</span>
    <span className="text-2xl font-bold mb-3">14</span>
    <span className="text-black-500 text-sm font-medium">Last 7 Days</span>
  </div>
  <div className="bg-white rounded-xl shadow p-6 flex flex-col">
    <span className="text-purple-600 font-semibold text-sm mb-4">Order Type</span>
    <div className="flex justify-between items-center mb-1">
      <span className="text-2xl font-bold">5</span>
      <span className="text-2xl font-bold ">8</span>
      <span className="text-2xl font-bold ">7</span>
    </div>
    <div className="flex justify-between text-sm text-gray-400">
      <span>Dine In</span>
      <span>Pick Up</span>
      <span>Delivery</span>
    </div>
  </div>
  <div className="bg-white rounded-xl shadow p-6 flex flex-col">
    <span className="text-red-500 font-medium mb-2">Revenue</span>
    <span className="text-2xl font-bold mb-3">25,000</span>
    <span className="text-black-500 text-sm font-medium">Last 7 Days</span>
  </div>
</div>



      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-6 mb-4">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Search Input */}
    <div className="flex items-center border rounded px-3">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        className="w-full border-0 focus:outline-none py-2"
        placeholder="Search transactions..."
      />
    </div>

    {/* Date Range Input */}
    <input
      type="text"
      className="border rounded px-4 py-2 w-full focus:outline-none"
      placeholder="01 March 2025 - 31 March 2025"
    />

    {/* Buttons */}
    <div className="flex justify-end gap-2">
      <button className="btn btn-outline-secondary">Filters</button>
      <button className="btn btn-outline-primary">Download</button>
    </div>
  </div>
</div>


      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 table-auto">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Transaction ID <i className="fas fa-sort ms-1"></i>
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Order Type <i className="fas fa-sort ms-1"></i>
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Items <i className="fas fa-sort ms-1"></i>
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Total Price <i className="fas fa-sort ms-1"></i>
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
            Date <i className="fas fa-sort ms-1"></i>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {salesData.map((item, index) => (
          <tr key={index}>
            <td className="px-4 py-2">{item.id}</td>
            <td className="px-4 py-2">
              <span className={`badge text-white px-2 py-1 rounded-full text-xs ${
                item.type === 'Dine In' ? 'bg-blue-500' :
                item.type === 'Pick Up' ? 'bg-cyan-500' : 'bg-green-500'
              }`}>
                {item.type}
              </span>
            </td>
            <td className="px-4 py-2">{item.items}</td>
            <td className="px-4 py-2">{item.price}</td>
            <td className="px-4 py-2">{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  

          {/* Pagination */}
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center mt-4">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
              </li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Navbar>
  );
}

export default SalesReport;