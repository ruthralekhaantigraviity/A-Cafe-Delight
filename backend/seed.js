const { connectDB, sql } = require('./db/db');
const dotenv = require('dotenv');

dotenv.config();

const seedData = [
    { ItemName: 'Espresso', Price: 3.00, Category: 'Coffee' },
    { ItemName: 'Americano', Price: 3.50, Category: 'Coffee' },
    { ItemName: 'Cappuccino', Price: 4.50, Category: 'Coffee' },
    { ItemName: 'Latte', Price: 4.50, Category: 'Coffee' },
    { ItemName: 'Mocha', Price: 5.00, Category: 'Coffee' },
    { ItemName: 'Macchiato', Price: 4.00, Category: 'Coffee' },
    { ItemName: 'Flat White', Price: 4.50, Category: 'Coffee' },
    { ItemName: 'Iced Coffee', Price: 4.00, Category: 'Cold Coffee' },
    { ItemName: 'Cold Brew', Price: 4.50, Category: 'Cold Coffee' },
    { ItemName: 'Frappuccino', Price: 5.50, Category: 'Cold Coffee' },
    { ItemName: 'Green Tea', Price: 3.00, Category: 'Tea' },
    { ItemName: 'Black Tea', Price: 3.00, Category: 'Tea' },
    { ItemName: 'Chai Latte', Price: 4.00, Category: 'Tea' },
    { ItemName: 'Matcha Latte', Price: 5.00, Category: 'Tea' },
    { ItemName: 'Croissant', Price: 3.50, Category: 'Pastry' },
    { ItemName: 'Chocolate Muffin', Price: 3.00, Category: 'Pastry' },
    { ItemName: 'Blueberry Muffin', Price: 3.00, Category: 'Pastry' },
    { ItemName: 'Bagel with Cream Cheese', Price: 4.00, Category: 'Food' },
    { ItemName: 'Avocado Toast', Price: 8.50, Category: 'Food' },
    { ItemName: 'Club Sandwich', Price: 9.50, Category: 'Food' },
    { ItemName: 'Caesar Salad', Price: 8.00, Category: 'Food' },
    { ItemName: 'Cheesecake', Price: 5.50, Category: 'Dessert' },
    { ItemName: 'Brownie', Price: 4.00, Category: 'Dessert' },
    { ItemName: 'Tiramisu', Price: 6.00, Category: 'Dessert' }
];

const seedDB = async () => {
    try {
        await connectDB();

        // Optional: Clear existing menu items if you want a fresh start
        // await sql.query('DELETE FROM Menu');

        for (const item of seedData) {
            // Check if item exists
            const check = await sql.query`SELECT * FROM Menu WHERE ItemName = ${item.ItemName}`;
            if (check.recordset.length === 0) {
                await sql.query`INSERT INTO Menu (ItemName, Price, Category) VALUES (${item.ItemName}, ${item.Price}, ${item.Category})`;
                console.log(`Added: ${item.ItemName}`);
            } else {
                console.log(`Skipped (Exists): ${item.ItemName}`);
            }
        }

        console.log('Seeding completed!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedDB();
