const Medicine = require('../models/Medicine');

exports.getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
        res.json(medicine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createMedicine = async (req, res) => {
    try {
        const { name, batchNumber, expiryDate, quantity, price, supplier } = req.body;
        const newMedicine = new Medicine({ name, batchNumber, expiryDate, quantity, price, supplier });
        await newMedicine.save();
        res.status(201).json(newMedicine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
        res.json(medicine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id);
        if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
        res.json({ message: 'Medicine deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
