const { sql, getIsConnected } = require('../db/db');

// Mock Data for Fallback
const mockMenu = [
    { ItemId: 1, ItemName: 'Espresso', Price: 3.00, Category: 'Coffee', Image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=2670&auto=format&fit=crop' },
    { ItemId: 2, ItemName: 'Americano', Price: 3.50, Category: 'Coffee', Image: 'https://images.unsplash.com/photo-1551030173-122ca80d0f97?q=80&w=2565&auto=format&fit=crop' },
    { ItemId: 3, ItemName: 'Cappuccino', Price: 4.50, Category: 'Coffee', Image: 'https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?q=80&w=2670&auto=format&fit=crop' },
    { ItemId: 4, ItemName: 'Latte', Price: 4.50, Category: 'Coffee', Image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2677&auto=format&fit=crop' },
    { ItemId: 5, ItemName: 'Mocha', Price: 5.00, Category: 'Coffee', Image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=2574&auto=format&fit=crop' },
    { ItemId: 6, ItemName: 'Macchiato', Price: 4.00, Category: 'Coffee', Image: 'https://images.unsplash.com/photo-1485808191679-5f8c7c8f312b?q=80&w=2670&auto=format&fit=crop' },
    { ItemId: 7, ItemName: 'Flat White', Price: 4.50, Category: 'Coffee', Image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=2574&auto=format&fit=crop' },
    { ItemId: 8, ItemName: 'Iced Coffee', Price: 4.00, Category: 'Cold Coffee', Image: 'https://images.unsplash.com/photo-1517701604599-bb29b5c73553?q=80&w=2670&auto=format&fit=crop' },
    { ItemId: 9, ItemName: 'Cold Brew', Price: 4.50, Category: 'Cold Coffee', Image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2669&auto=format&fit=crop' },
    { ItemId: 10, ItemName: 'Frappuccino', Price: 5.50, Category: 'Cold Coffee', Image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=2574&auto=format&fit=crop' },
    { ItemId: 11, ItemName: 'Green Tea', Price: 3.00, Category: 'Tea', Image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=2670&auto=format&fit=crop' },
    { ItemId: 12, ItemName: 'Black Tea', Price: 3.00, Category: 'Tea', Image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=2574&auto=format&fit=crop' },
    { ItemId: 13, ItemName: 'Chai Latte', Price: 4.00, Category: 'Tea', Image: 'https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?q=80&w=2669&auto=format&fit=crop' },
    { ItemId: 14, ItemName: 'Matcha Latte', Price: 5.00, Category: 'Tea', Image: 'https://images.unsplash.com/photo-1515822941585-707e788bc59e?q=80&w=2670&auto=format&fit=crop' },
    { ItemId: 15, ItemName: 'Croissant', Price: 3.50, Category: 'Pastry', Image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2526&auto=format&fit=crop' },
    { ItemId: 16, ItemName: 'Chocolate Muffin', Price: 3.00, Category: 'Pastry', Image: 'https://images.unsplash.com/photo-1623592873837-775677e5c54d?q=80&w=2670&auto=format&fit=crop' },
    { ItemId: 17, ItemName: 'Blueberry Muffin', Price: 3.00, Category: 'Pastry', Image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=2574&auto=format&fit=crop' },
    { ItemId: 18, ItemName: 'Bagel with Cream Cheese', Price: 4.00, Category: 'Food', Image: 'https://images.unsplash.com/photo-1596561138546-d2545041a7dc?q=80&w=2565&auto=format&fit=crop' },
    { ItemId: 19, ItemName: 'Avocado Toast', Price: 8.50, Category: 'Food', Image: 'https://images.unsplash.com/photo-1603046891726-36bfd957e0bf?q=80&w=2574&auto=format&fit=crop' },
    { ItemId: 20, ItemName: 'Club Sandwich', Price: 9.50, Category: 'Food', Image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=2673&auto=format&fit=crop' },
    { ItemId: 21, ItemName: 'Caesar Salad', Price: 8.00, Category: 'Food', Image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=2590&auto=format&fit=crop' },
    { ItemId: 22, ItemName: 'Cheesecake', Price: 5.50, Category: 'Dessert', Image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=2670&auto=format&fit=crop' },
    { ItemId: 23, ItemName: 'Brownie', Price: 4.00, Category: 'Dessert', Image: 'https://images.unsplash.com/photo-1606313564200-e75d5e304abd?q=80&w=2574&auto=format&fit=crop' },
    { ItemId: 24, ItemName: 'Tiramisu', Price: 6.00, Category: 'Dessert', Image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=2576&auto=format&fit=crop' }
];

// Get all menu items
exports.getMenu = async (req, res) => {
    if (!getIsConnected()) {
        console.log('Serving Mock Menu Data');
        return res.status(200).json(mockMenu);
    }

    try {
        const result = await sql.query("SELECT * FROM Menu");
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add menu item (Admin)
exports.addMenuItem = async (req, res) => {
    const { itemName, price, category } = req.body;
    try {
        await sql.query`INSERT INTO Menu (ItemName, Price, Category) VALUES (${itemName}, ${price}, ${category})`;
        res.status(201).json({ message: 'Menu item added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete menu item (Admin)
exports.deleteMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query`DELETE FROM Menu WHERE ItemId = ${id}`;
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
