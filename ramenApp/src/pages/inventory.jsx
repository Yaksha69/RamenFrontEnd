import React from 'react';

const inventoryData = [
  { name: 'Noodles', quantity: 5, units: 'Packs', date: '11/12/22', status: 'In-stock' },
  { name: 'Eggs', quantity: 0, units: 'Pieces', date: '21/12/22', status: 'Out of stock' },
  { name: 'Pork', quantity: 10, units: 'Kilograms', date: '5/12/22', status: 'In-stock' },
  { name: 'Chicken', quantity: 0, units: 'Kilograms', date: '8/12/22', status: 'Out of stock' },
  { name: 'Nori', quantity: 5, units: 'Packs', date: '8/1/23', status: 'Low stock' },
  { name: 'Garlics', quantity: 20, units: 'Pieces', date: '9/1/23', status: 'In-stock' },
  { name: 'Onions', quantity: 0, units: 'Pieces', date: '15/12/23', status: 'Out of stock' },
  { name: 'Shrimps', quantity: 20, units: 'Kilograms', date: '6/6/23', status: 'In-stock' },
  { name: 'Rice', quantity: 5, units: 'Kilograms', date: '11/11/22', status: 'Low stock' },
];

const getStatusStyle = (status) => {
  switch (status) {
    case 'In-stock':
      return 'text-green-600 font-semibold';
    case 'Out of stock':
      return 'text-red-500 font-semibold';
    case 'Low stock':
      return 'text-yellow-500 font-semibold';
    default:
      return '';
  }
};

const Inventory = () => {
  return (
    <div className="flex-1 p-6">
      {/* Inventory Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow">
          <p className="text-sm">Categories</p>
          <p className="text-xl font-bold">14</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow">
          <p className="text-sm">Total Products</p>
          <p className="text-xl font-bold">868</p>
        </div>
        <div className="bg-purple-100 text-purple-800 p-4 rounded shadow">
          <p className="text-sm">Top Selling</p>
          <p className="text-xl font-bold">5</p>
          <p className="text-sm">₱2500</p>
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded shadow">
          <p className="text-sm">Low Stocks</p>
          <p className="text-xl font-bold">12</p>
          <p className="text-sm">2 Not in stock</p>
        </div>
      </div>

      {/* Search & Add */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search products..."
          className="input input-bordered w-full md:w-1/2"
        />
        <button className="btn btn-primary">Add Product</button>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto shadow rounded bg-white">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Quantity</th>
              <th>Units</th>
              <th>Restocked Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item, index) => (
              <tr key={index} className="hover">
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.units}</td>
                <td>{item.date}</td>
                <td className={getStatusStyle(item.status)}>{item.status}</td>
                <td className="flex items-center gap-2 justify-center">
                  <button className="btn btn-sm btn-outline btn-info">✏️</button>
                  <button className="btn btn-sm btn-outline btn-error">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between">
        <button className="btn btn-sm">Previous</button>
        <span className="text-sm">Page 1 of 10</span>
        <button className="btn btn-sm">Next</button>
      </div>
    </div>
  );
};

export default Inventory;
