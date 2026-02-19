import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getMenu, addOrder } from '../services/api';
import { ShoppingBag, Plus, Minus, Search, UtensilsCrossed } from 'lucide-react';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState({});
    const [bookingId, setBookingId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await getMenu();
                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };
        fetchMenu();
    }, []);

    const handleQuantityChange = (itemId, delta) => {
        setCart(prev => {
            const currentQty = prev[itemId] || 0;
            const newQty = Math.max(0, currentQty + delta);
            if (newQty === 0) {
                const newCart = { ...prev };
                delete newCart[itemId];
                return newCart;
            }
            return { ...prev, [itemId]: newQty };
        });
    };

    const handlePlaceOrder = async () => {
        if (!bookingId) {
            alert('Please enter a Booking ID to place an order.');
            return;
        }

        const items = Object.entries(cart).map(([itemId, quantity]) => {
            const item = menuItems.find(i => i.ItemId === parseInt(itemId));
            return { itemId: parseInt(itemId), quantity, price: item.Price };
        });

        if (items.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        try {
            await addOrder({ bookingId: parseInt(bookingId), items });
            alert('Order placed successfully!');
            setCart({});
            setBookingId('');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Check Booking ID.');
        }
    };

    const getTotalPrice = () => {
        return Object.entries(cart).reduce((total, [itemId, quantity]) => {
            const item = menuItems.find(i => i.ItemId === parseInt(itemId));
            return total + (item ? item.Price * quantity : 0);
        }, 0);
    };

    const categories = ['All', ...new Set(menuItems.map(item => item.Category))];
    const filteredItems = menuItems.filter(item =>
        (activeCategory === 'All' || item.Category === activeCategory) &&
        item.ItemName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="bg-cafe-noir py-20 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2677&auto=format&fit=crop')] opacity-20 bg-cover bg-center"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-serif font-bold mb-4 animate-fade-in-down">Our Exquisite Menu</h1>
                    <p className="text-xl text-cafe-crema font-light">Curated flavors for every palate</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${activeCategory === category
                                    ? 'bg-cafe-brown text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64 group">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cafe-brown transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search delicacies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:border-cafe-brown focus:ring-2 focus:ring-cafe-brown/20 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {filteredItems.map(item => (
                        <div key={item.ItemId} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group ring-1 ring-gray-100 hover:ring-cafe-crema">
                            <div className="h-48 bg-gray-100 relative overflow-hidden group">
                                <img
                                    src={item.Image || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2694&auto=format&fit=crop"}
                                    alt={item.ItemName}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2694&auto=format&fit=crop"; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="bg-cafe-gold text-cafe-noir text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">{item.Category}</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-cafe-noir group-hover:text-cafe-brown transition-colors">{item.ItemName}</h3>
                                    <span className="text-xl font-bold text-cafe-brown">${item.Price.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between mt-6">
                                    {cart[item.ItemId] ? (
                                        <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-inner">
                                            <button
                                                onClick={() => handleQuantityChange(item.ItemId, -1)}
                                                className="w-8 h-8 rounded-full bg-white text-cafe-brown shadow flex items-center justify-center hover:bg-gray-50 transition"
                                            ><Minus size={16} /></button>
                                            <span className="font-bold w-10 text-center text-cafe-noir">{cart[item.ItemId]}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.ItemId, 1)}
                                                className="w-8 h-8 rounded-full bg-cafe-brown text-white shadow flex items-center justify-center hover:bg-cafe-dark transition"
                                            ><Plus size={16} /></button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleQuantityChange(item.ItemId, 1)}
                                            className="w-full py-3 rounded-xl border-2 border-cafe-brown text-cafe-brown font-bold hover:bg-cafe-brown hover:text-white transition-all flex items-center justify-center gap-2"
                                        >
                                            <Plus size={18} /> Add to Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredItems.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            <p className="text-xl">No items found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Cart Bar */}
            <div className={`fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] p-6 transition-transform duration-500 z-40 transform ${Object.keys(cart).length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-cafe-gold p-3 rounded-full text-cafe-noir shadow-lg animate-bounce">
                            <ShoppingBag />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="text-2xl font-bold text-cafe-noir">${getTotalPrice().toFixed(2)}</p>
                        </div>
                        <input
                            type="number"
                            placeholder="Booking ID #"
                            value={bookingId}
                            onChange={(e) => setBookingId(e.target.value)}
                            className="ml-4 p-3 border rounded-lg focus:border-cafe-brown outline-none w-32 md:w-48 bg-gray-50"
                        />
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        className="w-full md:w-auto bg-cafe-brown text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-cafe-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Confirm Order
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Menu;
