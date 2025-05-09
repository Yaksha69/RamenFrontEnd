import React, { useState } from 'react';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Chart from '../components/chart';
import PieChart from '../components/piechart';
import SmallBarChart from '../components/barchart';

function Dashboard() {
  return (
    <Navbar>
        <main className="flex-1 p-8">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <span className="text-gray-500 font-medium mb-2">Total Sales</span>
                <span className="text-2xl font-bold mb-1">$89,000</span>
                <span className="text-red-500 text-sm font-medium">▼ 4.3% Down from yesterday</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <span className="text-gray-500 font-medium mb-2">New Users</span>
                <span className="text-2xl font-bold mb-1">2040</span>
                <span className="text-green-500 text-sm font-medium">▲ 1.8% Up from Past Week</span>
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
                    <button className="btn btn-sm btn-secondary text-black">More Details</button>
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
                    <a href="#" className="text-blue-500 text-sm">See All</a>
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

    </Navbar>
  );
}

export default Dashboard;