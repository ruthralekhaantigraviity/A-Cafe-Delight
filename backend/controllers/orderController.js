const { sql } = require('../db/db');

// Add items to order
exports.addOrder = async (req, res) => {
    const { bookingId, items } = req.body; // items: [{ itemId, quantity, price }]
    try {
        for (const item of items) {
            const totalPrice = item.quantity * item.price;
            await sql.query`INSERT INTO Orders (BookingId, ItemId, Quantity, TotalPrice) VALUES (${bookingId}, ${item.itemId}, ${item.quantity}, ${totalPrice})`;
        }
        res.status(201).json({ message: 'Order placed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Generate Bill
exports.generateBill = async (req, res) => {
    const { bookingId } = req.body;
    try {
        // Calculate total
        const result = await sql.query`SELECT SUM(TotalPrice) AS GrandTotal FROM Orders WHERE BookingId = ${bookingId}`;
        const grandTotal = result.recordset[0].GrandTotal;

        if (!grandTotal) {
            return res.status(400).json({ message: 'No orders found for this booking' });
        }

        // Create Bill
        await sql.query`INSERT INTO Billing (BookingId, GrandTotal) VALUES (${bookingId}, ${grandTotal})`;

        // Update Table Status to Available
        const bookingResult = await sql.query`SELECT TableId FROM Bookings WHERE BookingId = ${bookingId}`;
        const tableId = bookingResult.recordset[0].TableId;
        await sql.query`UPDATE Tables SET Status = 'Available' WHERE TableId = ${tableId}`;

        res.status(201).json({ message: 'Bill generated successfully', grandTotal });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Sales Report
exports.getSales = async (req, res) => {
    try {
        const result = await sql.query("SELECT * FROM Billing ORDER BY BillDate DESC");
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
