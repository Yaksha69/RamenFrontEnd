import React, { useState } from 'react';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaDownload, FaFilter, FaSearch } from 'react-icons/fa';

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
            <FaDownload className="me-2" /> Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Total Sales</h6>
              <h3 className="card-title">₱100,000</h3>
              <p className="card-text text-muted small">Last 7 days</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Total Orders</h6>
              <h3 className="card-title">14</h3>
              <p className="card-text text-muted small">Last 7 days</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Order Types</h6>
              <p className="card-text mb-1">7 Dine In</p>
              <p className="card-text mb-1">5 Pick Up</p>
              <p className="card-text">4 Delivery</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">Revenue</h6>
              <h3 className="card-title text-danger">₱25,000</h3>
              <p className="card-text text-muted small">Last 7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search transactions..."
                />
              </div>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="01 March 2025 - 31 March 2025"
              />
            </div>
            <div className="col-md-4 d-flex justify-content-end">
              <button className="btn btn-outline-secondary me-2">
                <FaFilter className="me-2" /> Filters
              </button>
              <button className="btn btn-outline-primary">
                <FaDownload className="me-2" /> Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Transaction ID <i className="fas fa-sort ms-1"></i></th>
                  <th>Order Type <i className="fas fa-sort ms-1"></i></th>
                  <th>Items <i className="fas fa-sort ms-1"></i></th>
                  <th>Total Price <i className="fas fa-sort ms-1"></i></th>
                  <th>Date <i className="fas fa-sort ms-1"></i></th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                      <span className={`badge ${
                        item.type === 'Dine In' ? 'bg-primary' : 
                        item.type === 'Pick Up' ? 'bg-info' : 'bg-success'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td>{item.items}</td>
                    <td>{item.price}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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