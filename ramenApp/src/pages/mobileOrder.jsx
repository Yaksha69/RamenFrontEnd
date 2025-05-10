import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../components/mobileNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import placeholderImage from '../assets/placeholder.jpg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function MobileOrder() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    
    dateRange: '',
    orderStatus: '',
    paymentMethod: '',
    customerType: ''
  });
  const [orders, setOrders] = useState([
    {
      id: '#ORD-1001',
      customer: 'James De Castro',
      date: '2023-06-15 10:30 AM',
      total: 299.99,
      paymentStatus: 'Paid',
      deliveryStatus: 'processing',
      items: [
        {
          name: 'Shoyu Ramen',
          sku: 'WH-2023',
          price: 299.99,
          quantity: 1,
          image: placeholderImage
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
        name: 'James De Castro',
        email: 'james@example.com',
        phone: '+632 1234 5678',
        address: '123 Main Street'
      },
      paymentMethod: 'Gcash',
    },
    {
      id: '#ORD-1002',
      customer: 'Juan Dela Cruz',
      date: '2023-06-16 11:45 AM',
      total: 210,
      paymentStatus: 'Pending',
      deliveryStatus: 'pending',
      items: [
        {
          name: 'Spicy Ramen',
          sku: 'SR-2023',
          price: 210,
          quantity: 1,
          image: placeholderImage
        }
      ],
      timeline: [
        {
          event: 'Order Placed',
          time: 'June 16, 2023 11:45 AM',
          description: 'Customer placed the order via mobile app.',
          completed: true
        }
      ],
      customerInfo: {
        name: 'Juan Dela Cruz',
        email: 'juan@example.com',
        phone: '+632 9876 5432',
        address: '456 Magulo Street'
      },
      paymentMethod: 'Cash on Delivery',
    }
  ]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
    console.log('Viewing order:', order.id);
  };

  const handleCancelOrder = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to cancel this order?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedOrders = orders.map(order => 
          order.id === selectedOrder.id 
            ? { ...order, deliveryStatus: 'cancelled' } 
            : order
        );
        setOrders(updatedOrders);
        Swal.fire(
          'Cancelled!',
          'The order has been cancelled.',
          'success'
        );
        setShowModal(false);
      }
    });
  }

  const handleUpdateStatus = (e) => {
    const newStatus = e.target.value;
    
    Swal.fire({
      title: 'Confirm Status Change',
      text: `Are you sure you want to change the status to ${newStatus}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedOrders = orders.map(order => 
          order.id === selectedOrder.id 
            ? { ...order, deliveryStatus: newStatus } 
            : order
        );
        setOrders(updatedOrders);
        setSelectedOrder({ ...selectedOrder, deliveryStatus: newStatus });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Order status updated to: ${newStatus}`,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        e.target.value = selectedOrder.deliveryStatus;
      }
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Filters applied!',
      showConfirmButton: false,
      timer: 1500
    });
  };
  const [showPaymentStatusDropdown, setShowPaymentStatusDropdown] = useState(false);
  const handlePaymentStatusChange = (newStatus) => {
    Swal.fire({
      title: 'Confirm Payment Status Change',
      text: `Are you sure you want to change payment status to ${newStatus}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedOrders = orders.map(order => 
          order.id === selectedOrder.id
            ? { ...order, paymentStatus: newStatus }
            : order
        );
        setOrders(updatedOrders);
        setSelectedOrder({ ...selectedOrder, paymentStatus: newStatus });
        setShowPaymentStatusDropdown(false);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Payment status updated to: ${newStatus}`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
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
  const getPaymentStatusBadgeClass = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-success';
      case 'Pending':
        return 'bg-warning';
      case 'Refunded':
        return 'bg-info';
      case 'Failed':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.date);
    const dateInRange = 
      !dateRange[0] || 
      !dateRange[1] || 
      (orderDate >= dateRange[0] && orderDate <= dateRange[1]);
  
    return (
      dateInRange &&
      (filters.orderStatus === '' || order.deliveryStatus === filters.orderStatus) &&
      (filters.paymentMethod === '' || 
        order.paymentMethod.toLowerCase().includes(filters.paymentMethod.toLowerCase())) &&
      (filters.customerType === '' || 
        (filters.customerType === 'new' && order.customer.includes('John')) ||
        (filters.customerType === 'returning' && order.customer.includes('Maria')))
    );
  });

  return (
    
    <Navbar>
      <style>
        {`
          .modal-backdrop-custom {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            z-index: 1040;
          }
          
          .modal-custom {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1050;
            width: 70%;
            max-width: 900px;
            max-height: 90vh;
          }
          
          .status-badge {
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
          }
          
          .status-pending {
            background-color: #fff3cd;
            color: #856404;
          }
          
          .status-processing {
            background-color: #cce5ff;
            color: #004085;
          }
          
          .status-shipped {
            background-color: #e2d4f0;
            color: #4a2a7a;
          }
          
          .status-delivered {
            background-color: #d4edda;
            color: #155724;
          }
          
          .status-cancelled {
            background-color: #f8d7da;
            color: #721c24;
          }
          
          .product-img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 4px;
          }
          
          
          
          
        `}
      </style>

      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Order Management</h1>
        
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Filters</h5>
          <form onSubmit={handleFilterSubmit}>
            <div className="row g-3">
              <div className="col-12 col-md-2">
                <label htmlFor="dateRange" className="form-label">Date  </label>
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                    setFilters(prev => ({
                      ...prev,
                      dateRange: update
                    }));
                  }}
                  isClearable={true}
                  placeholderText="Select date range"
                  className="form-control"
                  dateFormat="MMMM d, yyyy"
                />
              </div>
              <div className="col-6 col-md-2">
                <label htmlFor="orderStatus" className="form-label">Order Status</label>
                <select 
                  className="form-select" 
                  id="orderStatus" 
                  name="orderStatus"
                  value={filters.orderStatus}
                  onChange={handleFilterChange}
                >
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
                <select 
                  className="form-select" 
                  id="paymentMethod" 
                  name="paymentMethod"
                  value={filters.paymentMethod}
                  onChange={handleFilterChange}
                >
                  <option value="">All Methods</option>
                  <option value="gcash">Gcash</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="cash">Cash on Delivery</option>
                </select>
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
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>₱{order.total.toFixed(2)}</td>
                    <td><span className={`badge ${order.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning'}`}>
                      {order.paymentStatus}
                    </span></td>
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

      {showModal && selectedOrder && (
        <>
          <div 
            className="modal-backdrop-custom" 
            onClick={() => setShowModal(false)}
          ></div>
          <div className="modal-custom">
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
                <div className="row bg-light p-3 mb-3">
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
                            <p className="mb-1"><span className={`badge ${getPaymentStatusBadgeClass(selectedOrder.paymentStatus)}`}>
                              {selectedOrder.paymentStatus}
                            </span></p>
                          </div>
                            <p className="mb-1 text-muted">Delivery Status</p>
                            <div className="d-flex align-items-center">
                              <span className={`${getStatusBadgeClass(selectedOrder.deliveryStatus)} me-2`}>
                                {selectedOrder.deliveryStatus.charAt(0).toUpperCase() + selectedOrder.deliveryStatus.slice(1)}
                              </span>
                              <select
                                className="form-select form-select-sm"
                                value={selectedOrder.deliveryStatus}
                                onChange={handleUpdateStatus}
                                style={{ width: '120px' }}
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
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
                                      <img 
                                        src={item.image} 
                                        alt="Product" 
                                        className="product-img me-3"
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = placeholderImage;
                                        }}
                                      />
                                      
                                    </div>
                                  </td>
                                  <td>₱{item.price.toFixed(2)}</td>
                                  <td>{item.quantity}</td>
                                  <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="border-top pt-3">
                          <div className="row">
                            <div className="col-6 text-end">
                              <p className="mb-0 fw-bold">Total:</p>
                            </div>
                            <div className="col-6">
                              <p className="mb-0 text-end fw-bold">₱{selectedOrder.total.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
                          <div className="position-relative flex-grow-1">
                            <button 
                              className="btn btn-warning w-100 d-flex align-items-center justify-content-between gap-2"
                              onClick={() => setShowPaymentStatusDropdown(!showPaymentStatusDropdown)}
                            >
                              <span>Update Payment Status</span>
                              <i className={`fas fa-chevron-${showPaymentStatusDropdown ? 'up' : 'down'}`}></i>
                            </button>
                            
                            {showPaymentStatusDropdown && (
                              <div className="position-absolute bg-white p-2 rounded shadow mt-1 border w-100" 
                                  style={{ 
                                    zIndex: 10,
                                  }}>
                                <div className="d-flex flex-column gap-1">
                                  <button 
                                    className={`btn btn-sm text-start ${selectedOrder.paymentStatus === 'Paid' ? 'btn-primary text-white' : 'btn-outline-primary'}`}
                                    onClick={() => handlePaymentStatusChange('Paid')}
                                  >
                                    <i className="fas fa-check-circle me-2"></i> Paid
                                  </button>
                                  <button 
                                    className={`btn btn-sm text-start ${selectedOrder.paymentStatus === 'Pending' ? 'btn-warning text-white' : 'btn-outline-warning'}`}
                                    onClick={() => handlePaymentStatusChange('Pending')}
                                  >
                                    <i className="fas fa-clock me-2"></i> Pending
                                  </button>
                                  <button 
                                    className={`btn btn-sm text-start ${selectedOrder.paymentStatus === 'Refunded' ? 'btn-info text-white' : 'btn-outline-info'}`}
                                    onClick={() => handlePaymentStatusChange('Refunded')}
                                  >
                                    <i className="fas fa-undo me-2"></i> Refunded
                                  </button>
                                  <button 
                                    className={`btn btn-sm text-start ${selectedOrder.paymentStatus === 'Failed' ? 'btn-danger text-white' : 'btn-outline-danger'}`}
                                    onClick={() => handlePaymentStatusChange('Failed')}
                                  >
                                    <i className="fas fa-times-circle me-2"></i> Failed
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="d-flex gap-2 flex-grow-1">
                            <button 
                              className="btn btn-danger flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                              onClick={handleCancelOrder}
                            >
                              <i className="fas fa-times"></i> Cancel Order
                            </button>
                            <button   
                              type="button" 
                              className="btn btn-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2" 
                              onClick={() => setShowModal(false)}
                            >
                              <i className="fas fa-times"></i> Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                
              </div>
            </div>
          </div>
        </>
      )}
    </Navbar>
  );
}

export default MobileOrder;