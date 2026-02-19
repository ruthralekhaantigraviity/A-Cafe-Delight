const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./db/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/bookingRoutes'));
app.use('/api', require('./routes/menuRoutes'));
app.use('/api', require('./routes/orderRoutes'));

// Database Connection
connectDB();

app.get('/', (req, res) => {
    res.send('Cafe Billing System API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
