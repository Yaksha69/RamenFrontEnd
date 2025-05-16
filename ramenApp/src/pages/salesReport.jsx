import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaSearch } from 'react-icons/fa';

function SalesReport() {
  const salesData = [
    { id: '00000001', type: 'Dine In', items: '3 Items', price: '₱430', date: '11/12/22' },
    { id: '00000002', type: 'Pick Up', items: '5 Items', price: '₱257', date: '02/12/22' },
    { id: '00000003', type: 'Delivery', items: '10 Items', price: '₱405', date: '05/12/22' },
    { id: '00000004', type: 'Dine In', items: '1 Items', price: '₱502', date: '08/12/22' },
    { id: '00000005', type: 'Pick Up', items: '5 Items', price: '₱530', date: '09/01/23' },
    { id: '00000006', type: 'Dine In', items: '2 Items', price: '₱605', date: '09/01/23' },
    { id: '00000007', type: 'Delivery', items: '5 Items', price: '₱408', date: '12/12/20' },
    { id: '00000008', type: 'Delivery', items: '3 Items', price: '₱359', date: '06/06/23' },
    { id: '00000009', type: 'Dine In', items: '8 Items', price: '₱205', date: '11/11/22' }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Parse the sales date string format "mm/dd/yy" into Date object
  const parseDate = (dateStr) => {
    const [month, day, year] = dateStr.split('/');
    const fullYear = year.length === 2 ? `20${year}` : year;
    return new Date(fullYear, month - 1, day);
  };

  // Parse the input date string (yyyy-mm-dd) into Date object
  const parseInputDate = (dateStr) => (dateStr ? new Date(dateStr) : null);

  // Filter the sales based on search query and start date filter
  const filteredSales = salesData.filter(item => {
    const itemDate = parseDate(item.date);
    const searchMatch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.toLowerCase().includes(searchQuery.toLowerCase());

    if (!filterStartDate) {
      return searchMatch;
    }

    const filterDateObj = parseInputDate(filterStartDate);

    // Show items with date on or after filterStartDate
    return searchMatch && itemDate >= filterDateObj;
  });

  // Sorting handler
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // Toggle direction
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  // Sorting logic
  const sortedSales = React.useMemo(() => {
    let sortable = [...filteredSales];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Special handling for date and price
        if (sortConfig.key === 'date') {
          aValue = parseDate(aValue);
          bValue = parseDate(bValue);
        } else if (sortConfig.key === 'price') {
          aValue = parseFloat(aValue.replace(/[^\d.]/g, ''));
          bValue = parseFloat(bValue.replace(/[^\d.]/g, ''));
        } else if (sortConfig.key === 'items') {
          aValue = parseInt(aValue);
          bValue = parseInt(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [filteredSales, sortConfig]);

  const totalPages = Math.ceil(sortedSales.length / itemsPerPage);
  const paginatedSales = sortedSales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStartDate]);

  return (
    <Navbar>
      {/* Header */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Sales Reports</h1>
       
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col">
          <span className="text-blue-500 font-medium mb-2">Profit</span>
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

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="flex items-center border rounded px-3 mt-4 ">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              className="w-full border-0 focus:outline-none py-2"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="filter-start-date" className="block text-sm font-medium mb-1">Start Date</label>
            <input
              id="filter-start-date"
              type="date"
              className="border rounded px-4 py-2 w-full focus:outline-none"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            
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
                <th
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  Transaction ID{' '}
                  <i className={`fas fa-sort${sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '-up' : '-down') : ''} ms-1`}></i>
                </th>
                <th
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  Order Type{' '}
                  <i className={`fas fa-sort${sortConfig.key === 'type' ? (sortConfig.direction === 'asc' ? '-up' : '-down') : ''} ms-1`}></i>
                </th>
                <th
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer"
                  onClick={() => handleSort('items')}
                >
                  Items{' '}
                  <i className={`fas fa-sort${sortConfig.key === 'items' ? (sortConfig.direction === 'asc' ? '-up' : '-down') : ''} ms-1`}></i>
                </th>
                <th
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  Total Price{' '}
                  <i className={`fas fa-sort${sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? '-up' : '-down') : ''} ms-1`}></i>
                </th>
                <th
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  Date{' '}
                  <i className={`fas fa-sort${sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '-up' : '-down') : ''} ms-1`}></i>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedSales.length > 0 ? (
                paginatedSales.map((item, index) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No transactions match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center mt-4">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>Previous</button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Navbar>
  );
}

export default SalesReport;
