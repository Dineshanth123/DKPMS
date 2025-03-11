import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [supplier, setSupplier] = useState({ name: '', contact: '', address: '', _id: '' });
    const [editMode, setEditMode] = useState(false);
    const [filterText, setFilterText] = useState('');

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        const response = await axios.get('http://localhost:5000/api/suppliers');
        setSuppliers(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    const handleSubmit = async () => {
        if (editMode) {
            await axios.put(`http://localhost:5000/api/suppliers/${supplier._id}`, supplier);
        } else {
            await axios.post('http://localhost:5000/api/suppliers', supplier);
        }
        setEditMode(false);
        setSupplier({ name: '', contact: '', address: '', _id: '' });
        fetchSuppliers();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/suppliers/${id}`);
        fetchSuppliers();
    };

    const handleEdit = (sup) => {
        setEditMode(true);
        setSupplier(sup);
    };

    const filteredSuppliers = suppliers.filter((sup) =>
        sup.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Suppliers</h1>

            {/* Filter Input */}
            <input
                type="text"
                placeholder="Filter by Name"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-6"
            />

            {/* Supplier Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    {editMode ? 'Edit Supplier' : 'Add Supplier'}
                </h2>
                <input
                    name="name"
                    placeholder="Name"
                    value={supplier.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-4"
                />
                <input
                    name="contact"
                    placeholder="Contact"
                    value={supplier.contact}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-4"
                />
                <input
                    name="address"
                    placeholder="Address"
                    value={supplier.address}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent mb-4"
                />
                <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                >
                    {editMode ? 'Update Supplier' : 'Add Supplier'}
                </button>
            </div>

            {/* Filtered Suppliers List */}
            <div className="grid gap-6">
                {filteredSuppliers.map((sup) => (
                    <div key={sup._id} className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{sup.name}</h2>
                        <p className="text-gray-600"><span className="font-semibold">Contact:</span> {sup.contact}</p>
                        <p className="text-gray-600"><span className="font-semibold">Address:</span> {sup.address}</p>
                        <div className="flex items-center space-x-4 mt-4">
                            <button
                                onClick={() => handleEdit(sup)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(sup._id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Suppliers;