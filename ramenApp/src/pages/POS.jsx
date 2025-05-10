import React from 'react';
import MobileNavbar from '../components/mobileNavbar'; // Only changed capitalization
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Pos() {
  return (
    <MobileNavbar>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Content Area */}
        <div className="flex-1">
          {/* Search and Categories */}
          <div>
            {/* Search Bar */}
            <div className="mb-4 d-flex align-items-center">
              <div className="input-group w-10 w-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search menu..."
                  aria-label="Search menu"
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-white border-start-0">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                </div>
              </div>
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {["All", "Ramen", "Rice Bowls", "Side Dishes", "Drinks", "Add-ons"].map((category, index) => (
                <button
                  key={index}
                  className="px-8 py-1 bg-gray-300 hover:bg-red-400 hover:text-white text-sm rounded-full transition duration-200"
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Product Grid Container */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Tonkotsu Ramen', price: 210, image: 'tonkotsu.jpg' },
                { name: 'Tantanmen Ramen', price: 210, image: 'tantanmen.jpg' },
                { name: 'Karaage Ramen', price: 200, image: 'karaage.jpg' },
                { name: 'Chicken Karaage', price: 160, image: 'karaage-chicken.jpg' },
                { name: 'Chashu Don', price: 150, image: 'chashu.jpg' },
                { name: 'Katsu Curry', price: 180, image: 'katsu.jpg' },
                { name: 'California Roll Sushi', price: 170, image: 'california-roll.jpg' },
                { name: 'Gyoza', price: 80, image: 'gyoza.jpg' },
                { name: 'Tempura', price: 150, image: 'tempura.jpg' },
              ].map((item, index) => (
                <div key={index} className="bg-white border rounded-lg shadow hover:shadow-md p-2 flex flex-col items-center">
                  <img src={`/images/${item.image}`} alt={item.name} className="h-28 w-full object-cover rounded-md mb-2" />
                  <span className="font-semibold text-center">{item.name}</span>
                  <span className="text-red-500 font-bold">PHP {item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Section */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-80">
          <div className="border-b pb-2 mb-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Cart</h2>
            <span className="text-gray-500 text-sm font-mono">#0001</span>
          </div>

          {/* Cart Items */}
      
          {/* Order Summary */}
          <div className="mt-6 border-t pt-3 text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 font-medium">Select Payment Method</span>
              <span className="font-bold">Gcash</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 font-medium">Order Type</span>
              <span className="font-bold">Dine-In</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-2">
              <span>Total</span>
              <span>PHP 530.00</span>
            </div>
            <button className="btn btn-danger w-full mt-4 text-white font-bold">CHECKOUT</button>
          </div>
        </div>
      </div>
    </MobileNavbar>
  );
}

export default Pos;
