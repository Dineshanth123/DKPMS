// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config(); // Load environment variables
const supplierRoutes = require('./routes/supplierRoutes');

const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
const allowedUsers = [
  { username: 'Dinesh', password: 'Dinesh@123' },
  { username: 'user2', password: 'pass2' },
  { username: 'user3', password: 'pass3' }
];

// Routes
app.use('/api/medicines', require('./routes/medicineRoutes'));
app.use('/api/suppliers', supplierRoutes);

app.get('/', (req, res) => res.send('PMS API Running...'));

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = allowedUsers.find(u => u.username === username && u.password === password);

  if (user) {
      res.json({ success: true });
  } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
