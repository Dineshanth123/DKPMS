import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMedicine } from "../api";

const AddMedicine = () => {
  const [medicine, setMedicine] = useState({
    name: "",
    batchNumber: "",
    expiryDate: "",
    quantity: "",
    price: "",
    supplier: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...medicine, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMedicine({
        ...medicine,
        quantity: Number(medicine.quantity),
        price: Number(medicine.price),
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add Medicine</h2>
      <form onSubmit={handleSubmit} className="w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
        {["name", "batchNumber", "expiryDate", "quantity", "price", "supplier"].map((field) => (
          <div key={field} className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              {field === "expiryDate"
                ? "Expiry Date"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              name={field}
              type={
                field === "expiryDate"
                  ? "date"
                  : field === "quantity" || field === "price"
                  ? "number"
                  : "text"
              }
              placeholder={
                field === "expiryDate"
                  ? ""
                  : `Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`
              }
              value={medicine[field]}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition duration-300 shadow-md hover:shadow-lg"
        >
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;