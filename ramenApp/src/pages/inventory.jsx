import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { CirclePlus, Pencil, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editIngredient, setEditIngredient] = useState({ name: '', qty: 0 });

  const [newProduct, setNewProduct] = useState({
    image: null,
    name: '',
    price: ''
  });

  const [ingredientData, setIngredientData] = useState({
    name: '',
    quantity: ''
  });

  const [ingredientList, setIngredientList] = useState([
    { name: "Noodles", qty: 5, unit: "Packs", date: "11/12/22", status: "In-stock" },
    { name: "Eggs", qty: 0, unit: "Pieces", date: "21/12/22", status: "Out of stock" },
    { name: "Pork", qty: 10, unit: "Kilograms", date: "5/12/22", status: "In-stock" },
    { name: "Chicken", qty: 0, unit: "Kilograms", date: "8/12/22", status: "Out of stock" },
    { name: "Nori", qty: 5, unit: "Packs", date: "9/1/23", status: "Low stock" },
    { name: "Garlics", qty: 20, unit: "Pieces", date: "9/1/23", status: "In-stock" },
    // Add more if needed to test pagination
    { name: "Onions", qty: 12, unit: "Pieces", date: "10/2/23", status: "In-stock" },
    { name: "Carrots", qty: 2, unit: "Kilograms", date: "11/2/23", status: "Low stock" },
    { name: "Beef", qty: 0, unit: "Kilograms", date: "12/2/23", status: "Out of stock" },
    { name: "Soy Sauce", qty: 15, unit: "Bottles", date: "13/2/23", status: "In-stock" },
    { name: "Salt", qty: 7, unit: "Packs", date: "14/2/23", status: "In-stock" },
    { name: "Pepper", qty: 0, unit: "Packs", date: "15/2/23", status: "Out of stock" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // SweetAlert2 alert na naka-center modal
  const showSuccess = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
      position: 'center',
      toast: false,
    });
  };

  const handleAddQuantity = (index) => {
    const updatedList = [...ingredientList];
    updatedList[index].qty += 1;

    if (updatedList[index].qty === 0) {
      updatedList[index].status = "Out of stock";
    } else if (updatedList[index].qty < 5) {
      updatedList[index].status = "Low stock";
    } else {
      updatedList[index].status = "In-stock";
    }

    setIngredientList(updatedList);
  };

  const handleEdit = (index) => {
    const item = ingredientList[index];
    setEditIngredient({ name: item.name, qty: item.qty });
    setEditIndex(index);
  };

  const handleSaveEdit = () => {
    const updatedList = [...ingredientList];
    updatedList[editIndex].name = editIngredient.name;
    updatedList[editIndex].qty = Number(editIngredient.qty);

    if (updatedList[editIndex].qty === 0) {
      updatedList[editIndex].status = "Out of stock";
    } else if (updatedList[editIndex].qty < 5) {
      updatedList[editIndex].status = "Low stock";
    } else {
      updatedList[editIndex].status = "In-stock";
    }

    setIngredientList(updatedList);
    setEditIndex(null);
    showSuccess("Ingredient updated successfully!");
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won’t be able to revert this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedList = [...ingredientList];
        updatedList.splice(index, 1);
        setIngredientList(updatedList);
        showSuccess("Ingredient deleted successfully!");
        // Reset page if current page exceeds new number of pages
        const totalPages = Math.ceil(updatedList.length / itemsPerPage);
        if (currentPage > totalPages) setCurrentPage(totalPages);
      }
    });
  };

  const filteredData = ingredientList.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.qty.toString().includes(term) ||
      item.unit.toLowerCase().includes(term) ||
      item.date.includes(term) ||
      item.status.toLowerCase().includes(term)
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((page) => (page > 1 ? page - 1 : page));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => (page < totalPages ? page + 1 : page));
  };

  return (
    <Navbar>
      <main className="flex-1 p-8">
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-gray-500 font-medium mb-2">Total Ingredients</span>
            <span className="text-2xl font-bold mb-3">14</span>
            <span className="text-black-500 text-sm font-medium">Last 7 Days</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-gray-500 font-medium mb-2">Total Product</span>
            <span className="text-2xl font-bold mb-3">868</span>
            <span className="text-black-500 text-sm font-medium">Last 7 Days</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-gray-600 font-semibold text-sm mb-4">Stock Turnover</span>
            <div className="flex justify-between items-center mb-1">
              <span className="text-2xl font-bold">5</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>last 7 Days</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-gray-600 font-semibold text-sm mb-4">Low Stock</span>
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

        {/* SEARCH BAR */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search by ..."
            className="w-full md:w-64 px-4 py-1 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset page to 1 on search
            }}
          />
        </div>

        {/* INGREDIENT TABLE CONTAINER */}
        <div className="ingredient-table-container bg-white rounded-xl shadow p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Raw Ingredients</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-sm btn-primary text-black"
              >
                Add New Product
              </button>
              <button
                onClick={() => setIsIngredientModalOpen(true)}
                className="btn btn-sm btn-primary text-black"
              >
                Add Ingredients
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
                {currentItems.map((item) => (
                  <tr key={item.name} className="border-b">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.qty}</td>
                    <td className="px-4 py-2">{item.unit}</td>
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">
                      <span className={`${
                        item.status === "In-stock"
                          ? "text-green-600"
                          : item.status === "Low stock"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        className="text-purple-600"
                        onClick={() => {
                          const originalIndex = ingredientList.findIndex(i => i.name === item.name);
                          if (originalIndex !== -1) {
                            handleAddQuantity(originalIndex);
                          }
                        }}
                      >
                        <CirclePlus size={15} />
                      </button>
                      <button
                        className="text-black"
                        onClick={() => {
                          const originalIndex = ingredientList.findIndex(i => i.name === item.name);
                          if (originalIndex !== -1) {
                            handleEdit(originalIndex);
                          }
                        }}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => {
                          const originalIndex = ingredientList.findIndex(i => i.name === item.name);
                          if (originalIndex !== -1) {
                            handleDelete(originalIndex);
                          }
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
                {currentItems.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No ingredients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="btn btn-sm btn-primary text-white"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <span className="text-sm text-gray-500">
              Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-sm btn-primary text-white"
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>

        {/* ADD PRODUCT MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="mb-4"> <label className="block text-sm font-medium mb-1">Price</label> 
              <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value 
              })} className="w-full border rounded p-2" /> 
              </div>
                        <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Add logic to save product here
                setIsModalOpen(false);
                showSuccess("Product added successfully!");
              }}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}

    {/* ADD INGREDIENT MODAL */}
    {isIngredientModalOpen && (
      <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Ingredient</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Ingredient Name</label>
            <input
              type="text"
              value={ingredientData.name}
              onChange={(e) => setIngredientData({ ...ingredientData, name: e.target.value })}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              value={ingredientData.quantity}
              onChange={(e) => setIngredientData({ ...ingredientData, quantity: e.target.value })}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsIngredientModalOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!ingredientData.name || !ingredientData.quantity) {
                  Swal.fire('Error', 'Please fill in all fields', 'error');
                  return;
                }
                const newIngredient = {
                  name: ingredientData.name,
                  qty: Number(ingredientData.quantity),
                  unit: "Units", // You can add a unit input if you want
                  date: new Date().toLocaleDateString(),
                  status: Number(ingredientData.quantity) === 0
                    ? "Out of stock"
                    : Number(ingredientData.quantity) < 5
                    ? "Low stock"
                    : "In-stock"
                };
                setIngredientList([newIngredient, ...ingredientList]);
                setIngredientData({ name: '', quantity: '' });
                setIsIngredientModalOpen(false);
                setCurrentPage(1);
                showSuccess("Ingredient added successfully!");
              }}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}

    {/* EDIT INGREDIENT MODAL */}
    {editIndex !== null && (
      <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Edit Ingredient</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Ingredient Name</label>
            <input
              type="text"
              value={editIngredient.name}
              onChange={(e) => setEditIngredient({ ...editIngredient, name: e.target.value })}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              value={editIngredient.qty}
              onChange={(e) => setEditIngredient({ ...editIngredient, qty: e.target.value })}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditIndex(null)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!editIngredient.name || editIngredient.qty === "") {
                  Swal.fire('Error', 'Please fill in all fields', 'error');
                  return;
                }
                handleSaveEdit();
              }}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}
  </main>
</Navbar>
  );
}
export default Inventory;
