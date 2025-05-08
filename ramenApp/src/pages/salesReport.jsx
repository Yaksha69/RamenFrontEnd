import React from 'react';
import { FaDownload, FaFilter, FaSearch } from 'react-icons/fa';

const SalesReport = () => {

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
    <div className="p-6 w-full bg-base-100">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-sm text-gray-500">Total Sales</h3>
          <p className="text-xl font-semibold">100,000</p>
          <p className="text-xs text-gray-400">Last 7 days</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-sm text-gray-500">Total Orders</h3>
          <p className="text-xl font-semibold">14</p>
          <p className="text-xs text-gray-400">Last 7 days</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-sm text-gray-500">Order Type</h3>
          <p className="text-sm">7 Dine In</p>
          <p className="text-sm">5 Pick Up</p>
          <p className="text-sm">4 Delivery</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-sm text-gray-500">Revenue</h3>
          <p className="text-xl font-semibold text-red-500">25,000</p>
          <p className="text-xs text-gray-400">Last 7 days</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full pl-10"
          />
        </div>

        <input
          type="text"
          className="input input-bordered"
          placeholder="01 March 2025 - 31 March 2025"
        />

        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm">
            <FaFilter className="mr-2" /> Filters
          </button>
          <button className="btn btn-outline btn-sm">
            <FaDownload className="mr-2" /> Download all
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>TransactionID</th>
              <th>Order Type</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((item, index) => (
              <tr key={index} className="hover">
                <td>{item.id}</td>
                <td>{item.type}</td>
                <td>{item.items}</td>
                <td>{item.price}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button className="btn btn-outline btn-sm">Previous</button>
        <span className="text-sm text-gray-500">Page 1 of 10</span>
        <button className="btn btn-outline btn-sm">Next</button>
      </div>
    </div>
  );
};

export default SalesReport;
