const Supplier = require('../models/Supplier');

// Get all suppliers
exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching suppliers' });
    }
};

// Create a new supplier
exports.createSupplier = async (req, res) => {
    const { name, contact, address } = req.body;
    try {
        const newSupplier = new Supplier({ name, contact, address });
        await newSupplier.save();
        res.json(newSupplier);
    } catch (error) {
        res.status(500).json({ message: 'Error creating supplier' });
    }
};

// Update supplier details
exports.updateSupplier = async (req, res) => {
    const { name, contact, address } = req.body;
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            { name, contact, address },
            { new: true }
        );
        res.json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ message: 'Error updating supplier' });
    }
};

// Delete a supplier
exports.deleteSupplier = async (req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        res.json({ message: 'Supplier deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting supplier' });
    }
};
