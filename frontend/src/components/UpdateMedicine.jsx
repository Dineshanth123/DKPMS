import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMedicineById, updateMedicine } from "../api";

const UpdateMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState({
    name: "",
    batchNumber: "",
    expiryDate: "",
    quantity: 0,
    price: 0,
    supplier: ""
  });

  useEffect(() => {
    fetchMedicine();
  }, []);

  const fetchMedicine = async () => {
    try {
      const { data } = await getMedicineById(id);
      setMedicine(data);
    } catch (error) {
      console.error("Error fetching medicine:", error);
    }
  };

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMedicine(id, medicine);
      navigate("/");
    } catch (error) {
      console.error("Error updating medicine:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Update Medicine</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        {["name", "batchNumber", "expiryDate", "quantity", "price", "supplier"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "expiryDate" ? "date" : field === "quantity" || field === "price" ? "number" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={medicine[field]}
            onChange={handleChange}
            required
            className="p-2 border rounded w-full"
          />
        ))}
        <button type="submit" className="p-2 bg-blue-600 text-white rounded">Update Medicine</button>
      </form>
    </div>
  );
};

export default UpdateMedicine;
