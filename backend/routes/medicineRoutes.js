// medicineRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getMedicines, 
    getMedicineById, 
    createMedicine, 
    updateMedicine, 
    deleteMedicine 
} = require('../controllers/medicineController');

// CRUD Routes
router.get('/', getMedicines);
router.get('/:id', getMedicineById);
router.post('/', createMedicine);
router.put('/:id', updateMedicine);
router.delete('/:id', deleteMedicine);

module.exports = router;
