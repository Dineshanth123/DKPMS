import { useEffect, useState } from "react";
import { getMedicines } from "../api";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const { data } = await getMedicines();
      setMedicines(data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Medicine List</h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-orange-600 text-white">
            <tr>
              {["Name", "Batch", "Expiry", "Quantity", "Price", "Supplier"].map((head) => (
                <th key={head} className="p-3 text-left font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr
                key={med._id}
                className="hover:bg-orange-50 transition duration-200"
              >
                <td className="p-3 border-b border-gray-200">{med.name}</td>
                <td className="p-3 border-b border-gray-200">{med.batchNumber}</td>
                <td className="p-3 border-b border-gray-200">
                  {new Date(med.expiryDate).toLocaleDateString()}
                </td>
                <td className="p-3 border-b border-gray-200">{med.quantity}</td>
                <td className="p-3 border-b border-gray-200">
                  ₹{med.price.toFixed(2)} {/* Rupee symbol added here */}
                </td>
                <td className="p-3 border-b border-gray-200">{med.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineList;