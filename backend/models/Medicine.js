// Medicine.js
const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    batchNumber: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    supplier: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', MedicineSchema);
