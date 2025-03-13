import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewByTablet = () => {
  const [medicines, setMedicines] = useState([]);
  const [batchFilter, setBatchFilter] = useState("");
  const [daysToExpiryFilter, setDaysToExpiryFilter] = useState("");
  const [quantityFilter, setQuantityFilter] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/medicines");
      setMedicines(response.data);
    } catch (error) {
      console.error("Failed to fetch medicines", error);
    }
  };

  const updateQuantity = async (id, change) => {
    try {
      const medicine = medicines.find((med) => med._id === id);
      const newQuantity = medicine.quantity + change;
      if (newQuantity < 0) {
        alert("Quantity cannot be negative");
        return;
      }
      await axios.put(`http://localhost:5000/api/medicines/${id}`, {
        quantity: newQuantity,
      });
      setMedicines((prev) =>
        prev.map((med) =>
          med._id === id ? { ...med, quantity: newQuantity } : med
        )
      );
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/medicines/${id}`);
      fetchMedicines();
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const filteredMedicines = medicines.filter((medicine) => {
    const isBatchMatch = batchFilter === "" || medicine.batchNumber.includes(batchFilter);
    const isQuantityMatch =
      quantityFilter === "" || medicine.quantity <= parseInt(quantityFilter);

    const isExpiryMatch = () => {
      if (daysToExpiryFilter === "") return true;
      const days = parseInt(daysToExpiryFilter);
      const expiryDate = new Date(medicine.expiryDate);
      const currentDate = new Date();
      const diffTime = expiryDate - currentDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= days;
    };

    return isBatchMatch && isQuantityMatch && isExpiryMatch();
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">View by Tablet</h1>

      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Filter by Batch Number"
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Filter by Days to Expiry"
          value={daysToExpiryFilter}
          onChange={(e) => setDaysToExpiryFilter(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <input
          type="number"
          placeholder="Filter by Quantity"
          value={quantityFilter}
          onChange={(e) => setQuantityFilter(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      <div className="grid gap-6">
        {filteredMedicines.map((medicine) => {
          const daysToExpiry = Math.ceil(
            (new Date(medicine.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
          );
          const isExpiringSoon = daysToExpiry <= 30;
          const isLowQuantity = medicine.quantity < 50;

          let bgColor = "bg-white"; 
          if (isExpiringSoon && isLowQuantity) {
            bgColor = "bg-red-100"; 
          } else if (isExpiringSoon) {
            bgColor = "bg-yellow-100"; 
          } else if (isLowQuantity) {
            bgColor = "bg-green-100"; 
          }

          return (
            <div
              key={medicine._id}
              className={`border p-6 rounded-lg shadow-md ${bgColor}`}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{medicine.name}</h2>
              <p className="text-gray-600"><span className="font-semibold">Batch:</span> {medicine.batchNumber}</p>
              <p className="text-gray-600"><span className="font-semibold">Supplier:</span> {medicine.supplier}</p>
              <p className="text-gray-600"><span className="font-semibold">Price:</span> ₹{medicine.price}</p>
              <p className="text-gray-600"><span className="font-semibold">Quantity:</span> {medicine.quantity}</p>
              <p className="text-gray-600"><span className="font-semibold">Expiry Date:</span> {new Date(medicine.expiryDate).toLocaleDateString()}</p>
              <p className="text-gray-600"><span className="font-semibold">Days to Expiry:</span> {daysToExpiry}</p>

              <div className="flex items-center space-x-4 mt-4">
                <button
                  onClick={() => updateQuantity(medicine._id, -1)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{medicine.quantity}</span>
                <button
                  onClick={() => updateQuantity(medicine._id, 1)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                >
                  +
                </button>
              </div>

              <div className="flex items-center space-x-4 mt-4">
                <Link
                  to={`/update/${medicine._id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(medicine._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewByTablet;