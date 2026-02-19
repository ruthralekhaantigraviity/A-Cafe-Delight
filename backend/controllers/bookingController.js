const { sql, getIsConnected } = require('../db/db');

const mockTables = [
    { TableId: 1, TableNumber: 1, Capacity: 2, Status: 'Available' },
    { TableId: 2, TableNumber: 2, Capacity: 2, Status: 'Available' },
    { TableId: 3, TableNumber: 3, Capacity: 4, Status: 'Available' },
    { TableId: 4, TableNumber: 4, Capacity: 4, Status: 'Available' },
    { TableId: 5, TableNumber: 5, Capacity: 6, Status: 'Available' },
    { TableId: 6, TableNumber: 6, Capacity: 8, Status: 'Available' }
];

// Get all available tables
exports.getTables = async (req, res) => {
    if (!getIsConnected()) {
        console.log('Serving Mock Tables Data');
        return res.status(200).json(mockTables);
    }

    try {
        const result = await sql.query("SELECT * FROM Tables");
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Book a table
exports.bookTable = async (req, res) => {
    if (!getIsConnected()) {
        console.log('Mock Booking Successful');
        return res.status(201).json({ message: 'Table booked successfully (Mock Mode)' });
    }

    const { customerName, customerPhone, tableId, bookingDate, bookingTime } = req.body;
    try {
        // Create customer if not exists or get ID
        // Simplified: Insert customer and get ID
        const customerResult = await sql.query`INSERT INTO Customers (Name, Phone) VALUES (${customerName}, ${customerPhone}); SELECT SCOPE_IDENTITY() AS CustomerId;`;
        const customerId = customerResult.recordset[0].CustomerId;

        // Create booking
        await sql.query`INSERT INTO Bookings (CustomerId, TableId, BookingDate, BookingTime) VALUES (${customerId}, ${tableId}, ${bookingDate}, ${bookingTime})`;

        // Update table status
        await sql.query`UPDATE Tables SET Status = 'Booked' WHERE TableId = ${tableId}`;

        res.status(201).json({ message: 'Table booked successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
