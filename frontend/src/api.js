import axios from "axios";

const API_URL = "https://dkpms3.onrender.com/api/medicines"; 

export const getMedicines = () => axios.get(API_URL);
export const getMedicineById = (id) => axios.get(`${API_URL}/${id}`);
export const addMedicine = (medicine) => axios.post(API_URL, medicine);
export const updateMedicine = (id, medicine) => axios.put(`${API_URL}/${id}`, medicine);
export const deleteMedicine = (id) => axios.delete(`${API_URL}/${id}`);
