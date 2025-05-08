import React, { useState } from 'react';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function MobileOrder() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  

  const orders = [
    {
      id: '#ORD-1001',
      customer: 'John Smith',
      date: '2023-06-15 10:30 AM',
      total: 125.99,
      paymentStatus: 'Paid',
      deliveryStatus: 'processing',
      items: [
        {
          name: 'Ramen Noodles',
          sku: 'WH-2023',
          price: 299.99,
          quantity: 1,
          image: 'https://via.placeholder.com/60'
        }
      ],
      timeline: [
        {
          event: 'Order Placed',
          time: 'June 15, 2023 10:30 AM',
          description: 'Customer placed the order via mobile app.',
          completed: true
        }
      ],
      customerInfo: {
        name: 'James',
        email: 'james@example.com',
        phone: '+632 1234 5678',
        address: '123 Main Street'
      },
      paymentMethod: 'Gcash',
    },
    
  ];

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };


  const handleCancelOrder = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      
      alert('Order cancelled!');
      setShowModal(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-badge status-pending';
      case 'processing':
        return 'status-badge status-processing';
      case 'shipped':
        return 'status-badge status-shipped';
      case 'delivered':
        return 'status-badge status-delivered';
      case 'cancelled':
        return 'status-badge status-cancelled';
      default:
        return 'status-badge status-processing';
    }
  };

  return (
    <Navbar>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Order Management</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button type="button" className="btn btn-sm btn-primary">
            <i className="fas fa-plus"></i> New Order
          </button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Filters</h5>
          <form>
            <div className="row g-3">
              <div className="col-12 col-md-3">
                <label htmlFor="dateRange" className="form-label">Date Range</label>
                <input type="text" className="form-control" id="dateRange" placeholder="Select date range" />
              </div>
              <div className="col-6 col-md-2">
                <label htmlFor="orderStatus" className="form-label">Order Status</label>
                <select className="form-select" id="orderStatus" defaultValue="">
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="col-6 col-md-2">
                <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                <select className="form-select" id="paymentMethod" defaultValue="">
                  <option value="">All Methods</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash on Delivery</option>
                </select>
              </div>
              <div className="col-6 col-md-2">
                <label htmlFor="customerType" className="form-label">Customer Type</label>
                <select className="form-select" id="customerType" defaultValue="">
                  <option value="">All Types</option>
                  <option value="new">New Customer</option>
                  <option value="returning">Returning Customer</option>
                </select>
              </div>
              <div className="col-6 col-md-3 d-flex align-items-end">
                <button type="submit" className="btn btn-primary me-2">
                  <i className="fas fa-filter"></i> Apply
                </button>
                <button type="reset" className="btn btn-outline-secondary">
                  <i className="fas fa-times"></i> Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Order ID <i className="fas fa-sort ms-1"></i></th>
                  <th>Customer Name <i className="fas fa-sort ms-1"></i></th>
                  <th>Order Date/Time <i className="fas fa-sort ms-1"></i></th>
                  <th>Total Amount <i className="fas fa-sort ms-1"></i></th>
                  <th>Payment Status <i className="fas fa-sort ms-1"></i></th>
                  <th>Delivery Status <i className="fas fa-sort ms-1"></i></th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td><span className="badge bg-success">{order.paymentStatus}</span></td>
                    <td><span className={getStatusBadgeClass(order.deliveryStatus)}>
                      {order.deliveryStatus.charAt(0).toUpperCase() + order.deliveryStatus.slice(1)}
                    </span></td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleViewOrder(order)}
                      >
                        <i className="fas fa-eye"></i> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

      {/* Order Detail Modal */}
      {showModal && selectedOrder && (
        <div 
          className="modal fade show" 
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowModal(false)}
        >
          <div 
            className="modal-dialog modal-xl modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Details - {selectedOrder.id}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
              
                  <div className="col-md-6">
                    <div className="card mb-4">
                      <div className="card-header">
                        <h6 className="mb-0">Order Summary</h6>
                      </div>
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-6">
                            <p className="mb-1 text-muted">Order ID</p>
                            <p className="fw-bold">{selectedOrder.id}</p>
                          </div>
                          <div className="col-6">
                            <p className="mb-1 text-muted">Order Date</p>
                            <p className="fw-bold">{selectedOrder.date}</p>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <p className="mb-1 text-muted">Customer</p>
                          <p className="fw-bold">{selectedOrder.customerInfo.name}</p>
                          <p className="mb-1">{selectedOrder.customerInfo.email}</p>
                          <p className="mb-1">{selectedOrder.customerInfo.phone}</p>
                        </div>
                        
                        <div className="mb-3">
                          <p className="mb-1 text-muted">Delivery Address</p>
                          <p className="fw-bold">{selectedOrder.customerInfo.address}</p>
                        </div>
                        
                        <div className="row">
                          <div className="col-6">
                            <p className="mb-1 text-muted">Payment Method</p>
                            <p className="fw-bold">{selectedOrder.paymentMethod}</p>
                            <p className="mb-1"><span className="badge bg-success">{selectedOrder.paymentStatus}</span></p>
                          </div>
                          <div className="col-6">
                            <p className="mb-1 text-muted">Delivery Status</p>
                            <div className="d-flex align-items-center">
                              <span className={`${getStatusBadgeClass(selectedOrder.deliveryStatus)} me-2`}>
                                {selectedOrder.deliveryStatus.charAt(0).toUpperCase() + selectedOrder.deliveryStatus.slice(1)}
                              </span>
                              <button className="btn btn-sm btn-outline-primary">
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
            
                    <div className="card">
                      <div className="card-header">
                        <h6 className="mb-0">Order Timeline</h6>
                      </div>
                      <div className="card-body">
                        <div className="order-timeline">
                          {selectedOrder.timeline.map((item, index) => (
                            <div key={index} className={`timeline-item ${item.completed ? 'completed' : ''}`}>
                              <h6 className="mb-1">{item.event}</h6>
                              <p className="text-muted small mb-2">{item.time}</p>
                              <p className="mb-0">{item.description}</p>
                            </div>
                          ))}
                          <div className="timeline-item">
                            <div className="mb-3">
                              <label htmlFor="adminNotes" className="form-label">Add Note</label>
                              <textarea 
                                className="form-control" 
                                id="adminNotes" 
                                rows="2" 
                                placeholder="Add internal notes..."
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                              ></textarea>
                            </div>
                            <button className="btn btn-sm btn-primary">Add Note</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
            
                  <div className="col-md-6">
                    <div className="card mb-4">
                      <div className="card-header">
                        <h6 className="mb-0">Order Items</h6>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedOrder.items.map((item, index) => (
                                <tr key={index}>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <img src={item.image} alt="Product" className="product-img me-3" />
                                      <div>
                                        <p className="mb-0 fw-bold">{item.name}</p>
                                        <p className="mb-0 text-muted small">SKU: {item.sku}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>${item.price.toFixed(2)}</td>
                                  <td>{item.quantity}</td>
                                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="border-top pt-3">
                          <div className="row mb-2">
                            <div className="col-6 text-end">
                              <p className="mb-0">Subtotal:</p>
                            </div>
                            <div className="col-6">
                              <p className="mb-0 text-end">${(selectedOrder.total - 12 - 5.03).toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-6 text-end">
                              <p className="mb-0">Shipping:</p>
                            </div>
                            <div className="col-6">
                              <p className="mb-0 text-end">$12.00</p>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-6 text-end">
                              <p className="mb-0">Tax:</p>
                            </div>
                            <div className="col-6">
                              <p className="mb-0 text-end">$5.03</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6 text-end">
                              <p className="mb-0 fw-bold">Total:</p>
                            </div>
                            <div className="col-6">
                              <p className="mb-0 text-end fw-bold">${selectedOrder.total.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between flex-wrap">
                          <button className="btn btn-outline-primary mb-2">
                            <i className="fas fa-print me-2"></i> Print Invoice
                          </button>
                          <button className="btn btn-outline-warning mb-2">
                            <i className="fas fa-exchange-alt me-2"></i> Update Status
                          </button>
                          <button 
                            className="btn btn-outline-danger mb-2"
                            onClick={handleCancelOrder}
                          >
                            <i className="fas fa-times me-2"></i> Cancel Order
                          </button>
                          <button className="btn btn-primary mb-2">
                            <i className="fas fa-envelope me-2"></i> Contact Customer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Navbar>
  );
}

export default MobileOrder;