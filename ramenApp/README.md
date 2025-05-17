# 🍜 ramenApp

A modern static web application for managing a ramen restaurant, featuring dedicated interfaces for both **Admin** and **Cashier** roles. Built with React and Vite, styled with Tailwind CSS and Bootstrap, and enhanced with interactive charts and modals.

---

## 🚀 Features

### 👩‍💼 Admin Panel

- **Dashboard**: Visualize key metrics like total revenue, orders, and profit. Includes charts for sales trends, product sales, and order types.
- **Inventory Management**: Track, add, edit, and update raw ingredients and products. See real-time stock status (in-stock, low, out of stock) and restock dates.
- **Sales Reports**: View, search, and sort transaction history by date, order type, and more.
- **Order Management**: Oversee mobile orders, update payment and delivery statuses, and view customer/order details.

### 💳 Cashier Panel

- **POS (Point of Sale)**: Fast, user-friendly interface for processing dine-in, takeout, and pickup orders. Add items, select add-ons, set spice levels, and handle multiple payment methods (Cash, GCash, Maya).
- **Cart & Checkout**: Manage cart items, calculate totals, and confirm payments with modal dialogs.
- **Login System**: Separate login pages for admin and cashier, with easy switching between roles.

---

## 🗂️ Project Structure

```
src/
  assets/           # Images and static assets
  components/       # Reusable UI components (navbar, charts, etc.)
  pages/            # Main pages (dashboard, inventory, POS, salesReport, mobileOrder, login, cashierLogin)
  App.jsx           # Main app and routing
  main.jsx          # Entry point
  App.css, index.css
```

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS, Bootstrap, DaisyUI, FontAwesome
- **Charts**: Chart.js, react-chartjs-2
- **UI Enhancements**: SweetAlert2, React Icons, Lucide React
- **Routing**: React Router DOM

---

## 🏁 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## 🔐 Roles & Navigation

- **Admin Login:** `/`  
  Access dashboard, inventory, sales reports, and order management.
- **Cashier Login:** `/cashier-login`  
  Access POS system for order processing.

---

## 📁 Additional Notes

- This is a static front-end project. Authentication and data persistence are simulated for demo purposes.
- For a full production system, connect to a backend API and database.

---

Feel free to further customize this README to match your deployment or documentation needs!
