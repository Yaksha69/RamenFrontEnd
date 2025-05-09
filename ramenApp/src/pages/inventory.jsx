import React from 'react';
import Navbar from '../components/navbar';
import { CirclePlus, Pencil, Trash2, ChevronsDown} from 'lucide-react';

function Inventory() {
  return (
    <Navbar>
      <main className="flex-1 p-8">
     
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-gray-500 font-medium mb-2">Categories</span>
            <span className="text-2xl font-bold mb-3">14</span>
            <span className="text-black-500 text-sm font-medium ">Last 7 Days</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-gray-500 font-medium mb-2">Total Product</span>
            <span className="text-2xl font-bold mb-3">868</span>
            <span className="text-black-500 text-sm font-medium">Last 7 Days</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-purple-600 font-semibold text-sm mb-4">Top Selling</span>
            <div className="flex justify-between items-center mb-1">
              <span className="text-2xl font-bold">5</span>
              <span className="text-xl font-semibold text-gray-600">₱2500</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Last 7 days</span>
              <span>Cost</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-purple-600 font-semibold text-sm mb-4">Low Stock</span>
            <div className="flex justify-between items-center mb-1">
              <span className="text-2xl font-bold">5</span>
              <span className="text-xl font-semibold text-gray-600">2</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Ordered</span>
              <span>Not in Stock</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-64 px-4 py-1 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
          />
          <i className="absolute left-57 top-1/2 transform -translate-y-1/2 text-gray-500 fas fa-search"></i>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Products</h2>
            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-6 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm">
                Add Product
              </button>
              <button className="border border-gray-300 px-6 py-1 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition flex items-center text-sm">
                <ChevronsDown className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Units</th>
                  <th className="px-4 py-2">Restocked Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Noodles", qty: 5, unit: "Packs", date: "11/12/22", status: "In-stock" },
                  { name: "Eggs", qty: 0, unit: "Pieces", date: "21/12/22", status: "Out of stock" },
                  { name: "Pork", qty: 10, unit: "Kilograms", date: "5/12/22", status: "In-stock" },
                  { name: "Chicken", qty: 0, unit: "Kilograms", date: "8/12/22", status: "Out of stock" },
                  { name: "Nori", qty: 5, unit: "Packs", date: "9/1/23", status: "Low stock" },
                  { name: "Garlics", qty: 20, unit: "Pieces", date: "9/1/23", status: "In-stock" },
                ].map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.qty}</td>
                    <td className="px-4 py-2">{item.unit}</td>
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`${
                          item.status === "In-stock"
                            ? "text-green-600"
                            : item.status === "Low stock"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button className="text-purple-600">
                        <CirclePlus size={15} />
                      </button>
                      <button className="text-black">
                        <Pencil size={15} />
                      </button>
                      <button className="text-red-600">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button className="border px-4 py-1 rounded-md text-gray-600 focus:ring-2 focus:ring-gray-400">Previous</button>
            <span className="text-sm text-gray-500">Page 1 of 10</span>
            <button className="border px-4 py-1 rounded-md text-gray-600 focus:ring-2 focus:ring-gray-400">Next</button>
          </div>
        </div>
      </main>
    </Navbar>
  );
}

export default Inventory;
