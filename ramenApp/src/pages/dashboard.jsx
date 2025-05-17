import React, { useState } from 'react';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Chart from '../components/chart';
import PieChart from '../components/piechart';
import SmallBarChart from '../components/barchart';

function Dashboard() {
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  // Sample data (replace with real data as needed)
  const rawData = [
    { date: '2025-05-01', actual: 120, predicted: 115 },
    { date: '2025-05-02', actual: 130, predicted: 128 },
    { date: '2025-05-03', actual: 110, predicted: 112 },
    { date: '2025-05-04', actual: 140, predicted: 135 },
    { date: '2025-05-05', actual: 150, predicted: 148 },
  ];
  const filteredData = rawData.filter(row => {
    const rowDate = row.date;
    const afterStart = !filterStartDate || rowDate >= filterStartDate;
    const beforeEnd = !filterEndDate || rowDate <= filterEndDate;
    return afterStart && beforeEnd;
  });
  const lowStockItems = [
    { name: 'Eggs', status: 'Low' },
    { name: 'Chicken', status: 'Low' },
    { name: 'Onions', status: 'Low' },
    { name: 'Rice', status: 'Low' },
    { name: 'Nori', status: 'Low' },
  ];

  return (
    <Navbar>
        <main className="flex-1 p-8">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <span className="text-gray-500 font-medium mb-2">Total Revenue</span>
                <span className="text-2xl font-bold mb-1">40,689</span>
                <span className="text-green-500 text-sm font-medium">▲ 8.5% Up from yesterday</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <span className="text-gray-500 font-medium mb-2">Total Order</span>
                <span className="text-2xl font-bold mb-1">10,293</span>
                <span className="text-green-500 text-sm font-medium">▲ 1.3% Up from past week</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <span className="text-gray-500 font-medium mb-2">Profit</span>
                <span className="text-2xl font-bold mb-1">$89,000</span>
                <span className="text-red-500 text-sm font-medium">▼ 4.3% Down from yesterday</span>
            </div>
            </div>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Details and Product Sales */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Sales Details */}
                <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Sales Details</h3>
                    <button className="btn btn-sm btn-danger text-light" onClick={() => setShowModal(true)}>More Details</button>
                </div>
                <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    {/* Replace with chart component */}
                    <Chart />
                </div>
                </div>
                {/* Product Sales */}
                <div className="bg-white rounded-xl shadow p-6">
                <h4 className="font-bold mb-4">Product Sales</h4>
                <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    {/* Replace with bar chart component */}
                    <SmallBarChart />
                </div>
                </div>
            </div>
            {/* Order Types Pie Chart and Low Quantity Stock */}
            <div className="flex flex-col gap-6">
                {/* Order Types Pie Chart */}
                <div className="bg-white rounded-xl shadow p-6">
                <h4 className="font-bold mb-4">Order Types</h4>
                <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                    {/* Replace with pie chart component */}
                    <PieChart />
                </div>
                </div>
                {/* Low Quantity Stock */}
                <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold">Low Quantity Stock</h4>
                    <a href="#" className="text-blue-500 text-sm" onClick={e => { e.preventDefault(); setShowLowStockModal(true); }}>See All</a>
                </div>
                <ul className="divide-y">
                    <li className="flex justify-between py-1">Eggs <span className="text-red-500 text-xs font-bold">Low</span></li>
                    <li className="flex justify-between py-1">Chicken <span className="text-red-500 text-xs font-bold">Low</span></li>
                    <li className="flex justify-between py-1">Onions <span className="text-red-500 text-xs font-bold">Low</span></li>
                    <li className="flex justify-between py-1">Rice <span className="text-red-500 text-xs font-bold">Low</span></li>
                    <li className="flex justify-between py-1">Nori <span className="text-red-500 text-xs font-bold">Low</span></li>
                </ul>
                </div>
            </div>
            </div>
        </main>

        {/* Modal for More Details */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Actual vs Predicted Details</h2>
              <div className="mb-4 flex gap-2">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">Start Date:</label>
                  <input
                    type="date"
                    className="form-control w-full border rounded px-3 py-2"
                    value={filterStartDate}
                    onChange={e => setFilterStartDate(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">End Date:</label>
                  <input
                    type="date"
                    className="form-control w-full border rounded px-3 py-2"
                    value={filterEndDate}
                    onChange={e => setFilterEndDate(e.target.value)}
                  />
                </div>
              </div>
              <table className="w-full mb-4 border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 border">Date</th>
                    <th className="py-2 px-3 border">Actual</th>
                    <th className="py-2 px-3 border">Predicted</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr><td colSpan="3" className="text-center py-4">No data found.</td></tr>
                  ) : (
                    filteredData.map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-2 px-3 border">{row.date}</td>
                        <td className="py-2 px-3 border">{row.actual}</td>
                        <td className="py-2 px-3 border">{row.predicted}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="flex justify-end">
                <button className="btn btn-secondary" onClick={() => { setFilterStartDate(''); setFilterEndDate(''); }}>Clear Filter</button>
                <button className="btn btn-danger" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Low Stock Modal */}
        {showLowStockModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Low Quantity Stock Details</h2>
              <ul className="divide-y mb-4">
                {lowStockItems.map((item, idx) => (
                  <li key={idx} className="flex justify-between py-2">
                    <span>{item.name}</span>
                    <span className="text-red-500 text-xs font-bold">{item.status}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end">
                <button className="btn btn-danger" onClick={() => setShowLowStockModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

    </Navbar>
  );
}

export default Dashboard;
