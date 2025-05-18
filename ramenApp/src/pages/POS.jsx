import React, { useState } from 'react';
import MobileNavbar from '../components/mobileNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from 'sweetalert2';


function Pos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderType, setOrderType] = useState('Dine-in');

  const orderTypes = [
    { id: 'Dine-in', name: 'Dine-in', icon: 'fa-utensils' },
    { id: 'Takeout', name: 'Takeout', icon: 'fa-shopping-bag' },
    { id: 'Pickup', name: 'Pickup', icon: 'fa-box' },
  ];

  const paymentMethods = [
    { id: 'Cash', name: 'Cash', icon: 'fa-money-bill' },
    { id: 'GCash', name: 'GCash', icon: 'fa-mobile-alt' },
    { id: 'Maya', name: 'Maya', icon: 'fa-credit-card' },
  ];

  const ramenAddOns = [
    { name: 'Extra Chashu', price: 50 },
    { name: 'Extra Egg', price: 30 },
    { name: 'Extra Noodles', price: 40 },
    { name: 'Extra Corn', price: 20 },
    { name: 'Extra Seaweed', price: 15 },
    { name: 'Extra Green Onions', price: 10 },
  ];

  const spiceLevels = [
    { name: 'No Spice', price: 0 },
    { name: 'Mild', price: 0 },
    { name: 'Medium', price: 0 },
    { name: 'Hot', price: 0 },
    { name: 'Extra Hot', price: 0 },
  ];

  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState('Mild');

  const [menuItems] = useState([
    { name: 'Tonkotsu Ramen', price: 210, image: 'Tramen.jpg', category: 'Ramen' },
    { name: 'Tantanmen Ramen', price: 210, image: 'tantanmen.jpg', category: 'Ramen' },
    { name: 'Karaage Ramen', price: 200, image: 'karaaageRamen.jpg', category: 'Ramen' },
    { name: 'Chicken Karaage', price: 160, image: 'karaage-chicken.jpg', category: 'Side Dishes' },
    { name: 'Chashu Don', price: 150, image: 'Chashu-Don-3.jpg', category: 'Rice Bowls' },
    { name: 'Katsu Curry', price: 180, image: 'katsuCurry.jpg', category: 'Rice Bowls' },
    { name: 'California Roll Sushi', price: 170, image: 'california.jpg', category: 'Side Dishes' },
    { name: 'Gyoza', price: 80, image: 'gyoza.jpg', category: 'Side Dishes' },
    { name: 'Tempura', price: 150, image: 'tempura.jpg', category: 'Side Dishes' },
  ]);

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setSelectedAddOns([]);
    setSelectedSpiceLevel('Mild');
    setShowModal(true);
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
      const newItem = {
        ...selectedItem,
        quantity,
        addOns: selectedAddOns,
        spiceLevel: selectedSpiceLevel,
        total: (selectedItem.price + addOnsTotal) * quantity
      };
      setCartItems([...cartItems, newItem]);
      setShowModal(false);
    }
  };

  const toggleAddOn = (addon) => {
    setSelectedAddOns(prev => {
      const isSelected = prev.find(item => item.name === addon.name);
      if (isSelected) {
        return prev.filter(item => item.name !== addon.name);
      } else {
        return [...prev, addon];
      }
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.total, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      // Use SweetAlert2 for the alert
      Swal.fire({
        icon: 'warning',
        title: 'Cart is empty',
        text: 'Please add items to cart first',
        confirmButtonColor: '#dc3545'
      });
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = () => {
    // Here you would typically handle the payment processing
    Swal.fire({
      title: 'Order Completed!',
      html: 
        <div class="text-left">
        </div>
      ,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#dc3545',
      customClass: {
        popup: 'rounded-lg',
        title: 'text-xl font-bold',
        htmlContainer: 'text-left',
        confirmButton: 'rounded-lg'
      }
    }).then(() => {
      setCartItems([]);
      setShowPaymentModal(false);
    });
  };

  const isRamen = selectedItem?.category === 'Ramen';

  return (
    <MobileNavbar>
      <div className="flex flex-col md:flex-row gap-4 md:h-screen items-start overflow-hidden bg-gray-50">
        {/* Menu/Products Section */}
        <div className="flex-1 overflow-y-auto md:h-screen pb-4 order-1">
          {/* Search and Categories */}
          <div className="sticky top-0 bg-white z-0 pb-4 px-2 sm:px-4 pt-4 shadow-sm rounded-b-lg">
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  className="form-control pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-red-400 focus:ring focus:ring-red-200 focus:ring-opacity-50 w-full bg-gray-50 text-sm"
                  placeholder="     Search menu items..."
                  aria-label="Search menu"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
              </div>
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2 mb-2">
              {["All", "Ramen", "Rice Bowls", "Side Dishes", "Drinks"].map((category, index) => (
                <button
                  key={index}
                  className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium rounded-full transition duration-200 ${
                    selectedCategory === category
                      ? 'bg-red-400 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-red-400 hover:text-white hover:shadow-md'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid Container */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-6 pt-2">
            {filteredItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-white border rounded-xl shadow-md hover:shadow-lg p-2 sm:p-4 flex flex-col items-center cursor-pointer transition-transform duration-200 hover:-translate-y-1 min-h-[180px] sm:min-h-[260px]"
                onClick={() => handleItemClick(item)}
              >
                <div className="w-full h-20 sm:h-28 flex items-center justify-center mb-2 overflow-hidden rounded-md bg-gray-100">
                  <img src={`/images/${item.image}`} alt={item.name} className="object-contain h-full max-w-full" />
                </div>
                <span className="font-semibold text-center text-xs sm:text-base mb-1">{item.name}</span>
                <span className="text-red-500 font-bold text-sm sm:text-lg">PHP {item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="bg-white p-2 sm:p-6 rounded-lg shadow-lg w-full md:w-96 md:h-screen flex flex-col border border-gray-100 order-2 mb-4 md:mb-0">
          <div className="border-b pb-2 mb-3 flex justify-between items-center">
            <h2 className="text-lg sm:text-2xl font-bold">Cart</h2>
            <span className="text-gray-400 text-xs sm:text-sm font-mono">#0001</span>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto pr-2">
            {cartItems.length === 0 ? (
              <div className="text-gray-400 text-center mt-10">Your cart is empty.</div>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="py-2 border-b last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-normal text-xs sm:text-base">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">Qty: {item.quantity}</p>
                      {item.spiceLevel && (
                        <p className="text-xs sm:text-sm text-gray-500">Spice: {item.spiceLevel}</p>
                      )}
                      {item.addOns && item.addOns.length > 0 && (
                        <div className="text-xs sm:text-sm text-gray-500">
                          Add-ons: {item.addOns.map(addon => addon.name).join(', ')}
                        </div>
                      )}
                    </div>
                    <span className="text-xs sm:text-base">PHP {item.total.toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="mt-4 border-t pt-3 text-xs sm:text-sm">
            {/* Order Type Selection */}
            <div className="mb-4">
              <label className="text-gray-600 font-medium mb-2 block">Order Type</label>
              <div className="grid grid-cols-3 gap-2">
                {orderTypes.map((type) => (
                  <button
                    key={type.id}
                    className={`p-2 rounded-lg border text-center text-xs sm:text-sm ${
                      orderType === type.id
                        ? 'border-red-400 bg-red-50 text-red-600'
                        : 'border-gray-200 hover:border-red-400'
                    }`}
                    onClick={() => setOrderType(type.id)}
                  >
                    <i className={`fas ${type.icon} mb-1`}></i>
                    <div>{type.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-4">
              <label className="text-gray-600 font-medium mb-2 block">Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    className={`p-2 rounded-lg border text-center text-xs sm:text-sm ${
                      paymentMethod === method.id
                        ? 'border-red-400 bg-red-50 text-red-600'
                        : 'border-gray-200 hover:border-red-400'
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <i className={`fas ${method.icon} mb-1`}></i>
                    <div>{method.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between text-base font-bold mt-2">
              <span>Total</span>
              <span>PHP {calculateTotal().toFixed(2)}</span>
            </div>
            <button 
              className="btn btn-danger w-full mt-4 text-white font-bold"
              onClick={handleCheckout}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-md">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Confirm Order</h2>
            <div className="mb-4">
              <p className="text-gray-600">Order Type:</p>
              <div className="flex items-center gap-2 mt-2">
                <i className={`fas ${orderTypes.find(t => t.id === orderType)?.icon} text-xl`}></i>
                <span className="font-semibold">{orderType}</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Payment Method:</p>
              <div className="flex items-center gap-2 mt-2">
                <i className={`fas ${paymentMethods.find(m => m.id === paymentMethod)?.icon} text-xl`}></i>
                <span className="font-semibold">{paymentMethod}</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Total Amount:</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">PHP {calculateTotal().toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <button 
                className="btn btn-secondary flex-1"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger flex-1"
                onClick={handlePaymentConfirm}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add to Cart Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-4">{selectedItem.name}</h2>
            <img 
              src={`/images/${selectedItem.image}`} 
              alt={selectedItem.name} 
              className="w-full h-32 sm:h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex justify-between items-center mb-4">
              <span className="text-base sm:text-lg font-bold">PHP {selectedItem.price.toFixed(2)}</span>
              <div className="flex items-center gap-2">
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {isRamen && (
              <>
                {/* Spice Level Selection */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Spice Level</h3>
                  <div className="flex flex-wrap gap-2">
                    {spiceLevels.map((level, index) => (
                      <button
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm ${
                          selectedSpiceLevel === level.name
                            ? 'bg-red-400 text-white'
                            : 'bg-gray-200 hover:bg-red-400 hover:text-white'
                        }`}
                        onClick={() => setSelectedSpiceLevel(level.name)}
                      >
                        {level.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons Selection */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Add-ons</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {ramenAddOns.map((addon, index) => (
                      <div
                        key={index}
                        className={`p-2 border rounded-lg cursor-pointer text-xs sm:text-sm ${
                          selectedAddOns.find(item => item.name === addon.name)
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-200'
                        }`}
                        onClick={() => toggleAddOn(addon)}
                      >
                        <div className="flex justify-between items-center">
                          <span>{addon.name}</span>
                          <span className="font-medium">+PHP {addon.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-2 mt-4">
              <button 
                className="btn btn-secondary flex-1"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger flex-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileNavbar>
  );
}

export default Pos;