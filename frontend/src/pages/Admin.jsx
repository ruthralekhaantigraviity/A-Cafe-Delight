import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getMenu, addMenuItem, deleteMenuItem, getSales, generateBill } from '../services/api';
import { LayoutDashboard, Utensils, DollarSign, Trash2, Plus, FileText, CheckCircle } from 'lucide-react';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('menu'); // menu, sales
    const [menuItems, setMenuItems] = useState([]);
    const [sales, setSales] = useState([]);
    const [newItem, setNewItem] = useState({ itemName: '', price: '', category: 'Food' });
    const [billingBookingId, setBillingBookingId] = useState('');

    useEffect(() => {
        if (activeTab === 'menu') fetchMenu();
        if (activeTab === 'sales') fetchSales();
    }, [activeTab]);

    const fetchMenu = async () => {
        try {
            const res = await getMenu();
            setMenuItems(res.data);
        } catch (err) { console.error(err); }
    };

    const fetchSales = async () => {
        try {
            const res = await getSales();
            setSales(res.data);
        } catch (err) { console.error(err); }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            await addMenuItem(newItem);
            fetchMenu();
            setNewItem({ itemName: '', price: '', category: 'Food' });
        } catch (err) { alert('Failed to add item'); }
    };

    const handleDeleteItem = async (id) => {
        if (window.confirm('Delete this item?')) {
            try {
                await deleteMenuItem(id);
                fetchMenu();
            } catch (err) { alert('Failed to delete'); }
        }
    };

    const handleGenerateBill = async () => {
        if (!billingBookingId) return alert('Enter Booking ID');
        try {
            const res = await generateBill(billingBookingId);
            alert(`Bill Generated! Total: $${res.data.grandTotal}`);
            setBillingBookingId('');
            fetchSales(); // Refresh sales if currently viewing
        } catch (err) { alert('Failed to generate bill'); }
    };

    const totalRevenue = sales.reduce((acc, curr) => acc + curr.GrandTotal, 0);

    return (
        <Layout>
            <div className="bg-gray-100 min-h-screen pb-12">
                <div className="bg-cafe-noir text-white py-12 px-6">
                    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h1 className="text-4xl font-serif font-bold mb-2">Admin Dashboard</h1>
                            <p className="text-cafe-crema">Manage your cafe operations seamlessly</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm text-center min-w-[140px]">
                                <p className="text-cafe-gold text-sm font-bold uppercase tracking-wider">Total Sales</p>
                                <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm text-center min-w-[140px]">
                                <p className="text-cafe-gold text-sm font-bold uppercase tracking-wider">Total Orders</p>
                                <p className="text-2xl font-bold text-white">{sales.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 -mt-8">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">
                        {/* Sidebar */}
                        <div className="w-full md:w-64 bg-white border-r border-gray-100 p-6 flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab('menu')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'menu' ? 'bg-cafe-brown text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Utensils size={20} /> Menu Management
                            </button>
                            <button
                                onClick={() => setActiveTab('sales')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'sales' ? 'bg-cafe-brown text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <DollarSign size={20} /> Sales & Billing
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-8 bg-gray-50/50">
                            {activeTab === 'menu' && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <h3 className="text-lg font-bold text-cafe-noir mb-6 flex items-center gap-2">
                                            <Plus className="text-cafe-gold" /> Add New Item
                                        </h3>
                                        <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <input
                                                type="text" placeholder="Item Name" required
                                                value={newItem.itemName} onChange={e => setNewItem({ ...newItem, itemName: e.target.value })}
                                                className="border border-gray-200 p-3 rounded-xl focus:border-cafe-brown focus:ring-1 focus:ring-cafe-brown/20 outline-none md:col-span-2"
                                            />
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                                <input
                                                    type="number" placeholder="Price" required step="0.01"
                                                    value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                                    className="border border-gray-200 p-3 pl-8 rounded-xl focus:border-cafe-brown focus:ring-1 focus:ring-cafe-brown/20 outline-none w-full"
                                                />
                                            </div>
                                            <select
                                                value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                                                className="border border-gray-200 p-3 rounded-xl focus:border-cafe-brown focus:ring-1 focus:ring-cafe-brown/20 outline-none"
                                            >
                                                <option>Food</option>
                                                <option>Beverage</option>
                                                <option>Dessert</option>
                                            </select>
                                            <button type="submit" className="md:col-span-4 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-bold shadow-md hover:shadow-lg">
                                                Add Item
                                            </button>
                                        </form>
                                    </div>

                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-50 border-b border-gray-100">
                                                <tr>
                                                    <th className="p-4 font-semibold text-gray-600">Name</th>
                                                    <th className="p-4 font-semibold text-gray-600">Category</th>
                                                    <th className="p-4 font-semibold text-gray-600">Price</th>
                                                    <th className="p-4 font-semibold text-gray-600">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {menuItems.map(item => (
                                                    <tr key={item.ItemId} className="hover:bg-gray-50 transition-colors">
                                                        <td className="p-4 font-medium text-cafe-noir">{item.ItemName}</td>
                                                        <td className="p-4"><span className="px-3 py-1 bg-cafe-crema/30 text-cafe-brown rounded-full text-xs font-bold uppercase">{item.Category}</span></td>
                                                        <td className="p-4 text-gray-600">${item.Price.toFixed(2)}</td>
                                                        <td className="p-4">
                                                            <button
                                                                onClick={() => handleDeleteItem(item.ItemId)}
                                                                className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                                                title="Delete Item"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'sales' && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <h3 className="text-lg font-bold text-cafe-noir mb-6 flex items-center gap-2">
                                            <FileText className="text-cafe-gold" /> Generate Bill
                                        </h3>
                                        <div className="flex gap-4">
                                            <input
                                                type="number" placeholder="Enter Booking ID to close table"
                                                value={billingBookingId} onChange={e => setBillingBookingId(e.target.value)}
                                                className="border border-gray-200 p-3 rounded-xl focus:border-cafe-brown focus:ring-1 focus:ring-cafe-brown/20 outline-none flex-grow max-w-sm"
                                            />
                                            <button
                                                onClick={handleGenerateBill}
                                                className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition font-bold shadow-md hover:shadow-lg flex items-center gap-2"
                                            >
                                                <CheckCircle size={18} /> Generate & Close
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                            <h3 className="font-bold text-gray-700">Detailed Sales Report</h3>
                                        </div>
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-50 border-b border-gray-100">
                                                <tr>
                                                    <th className="p-4 font-semibold text-gray-600">Bill ID</th>
                                                    <th className="p-4 font-semibold text-gray-600">Booking ID</th>
                                                    <th className="p-4 font-semibold text-gray-600">Date & Time</th>
                                                    <th className="p-4 font-semibold text-gray-600">Total Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {sales.map(sale => (
                                                    <tr key={sale.BillId} className="hover:bg-gray-50 transition-colors">
                                                        <td className="p-4 text-gray-500">#{sale.BillId}</td>
                                                        <td className="p-4 text-gray-800 font-medium">#{sale.BookingId}</td>
                                                        <td className="p-4 text-gray-500">{new Date(sale.BillDate).toLocaleString()}</td>
                                                        <td className="p-4 font-bold text-green-600">${sale.GrandTotal.toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Admin;
