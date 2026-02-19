import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { getTables, bookTable } from '../services/api';
import { Users, Calendar, Clock, User, Phone, CheckCircle } from 'lucide-react';

const Booking = () => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        bookingDate: '',
        bookingTime: ''
    });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const response = await getTables();
            setTables(response.data);
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    };

    const handleTableSelect = (tableId) => {
        setSelectedTable(tableId);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedTable) {
            alert('Please select a table to continue.');
            return;
        }
        try {
            await bookTable({ ...formData, tableId: selectedTable });
            setSuccess(true);
            fetchTables();
            setFormData({ customerName: '', customerPhone: '', bookingDate: '', bookingTime: '' });
            setSelectedTable(null);
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error('Error booking table:', error);
            alert('Unable to compete booking. Please try again.');
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-cafe-crema/20 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold text-cafe-noir mb-4">Reserve Your Spot</h2>
                        <p className="text-gray-600">Secure the perfect table for your next visit.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Table Selection */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-cafe-brown flex items-center gap-2">
                                <Users size={24} /> Select a Table
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                {tables.map(table => (
                                    <button
                                        key={table.TableId}
                                        onClick={() => table.Status === 'Available' && handleTableSelect(table.TableId)}
                                        disabled={table.Status !== 'Available'}
                                        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 group ${table.Status === 'Available'
                                            ? selectedTable === table.TableId
                                                ? 'border-cafe-gold bg-cafe-gold/10 scale-105 shadow-xl'
                                                : 'border-white bg-white hover:border-cafe-latte hover:shadow-lg'
                                            : 'border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${table.Status === 'Available'
                                            ? selectedTable === table.TableId ? 'bg-cafe-gold text-white' : 'bg-cafe-crema text-cafe-brown'
                                            : 'bg-gray-300 text-gray-500'
                                            }`}>
                                            <span className="text-lg font-bold">{table.TableNumber}</span>
                                        </div>
                                        <div className="text-sm font-medium text-gray-600">{table.Capacity} Seats</div>
                                        {selectedTable === table.TableId && (
                                            <div className="absolute top-2 right-2 text-cafe-gold">
                                                <CheckCircle size={16} fill="currentColor" className="text-cafe-gold bg-white rounded-full" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Booking Form */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            <div className="bg-cafe-noir p-6 text-white text-center">
                                <h3 className="text-xl font-bold">Booking Details</h3>
                                <p className="text-cafe-crema text-sm mt-1">Please fill in your information</p>
                            </div>
                            <div className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cafe-brown transition-colors" />
                                            <input
                                                type="text"
                                                name="customerName"
                                                placeholder="Full Name"
                                                value={formData.customerName}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cafe-brown focus:ring-2 focus:ring-cafe-brown/20 outline-none transition-all placeholder-gray-400"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cafe-brown transition-colors" />
                                            <input
                                                type="tel"
                                                name="customerPhone"
                                                placeholder="Phone Number"
                                                value={formData.customerPhone}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cafe-brown focus:ring-2 focus:ring-cafe-brown/20 outline-none transition-all placeholder-gray-400"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="relative group">
                                                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cafe-brown transition-colors" />
                                                <input
                                                    type="date"
                                                    name="bookingDate"
                                                    value={formData.bookingDate}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cafe-brown focus:ring-2 focus:ring-cafe-brown/20 outline-none transition-all text-gray-600"
                                                />
                                            </div>
                                            <div className="relative group">
                                                <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cafe-brown transition-colors" />
                                                <input
                                                    type="time"
                                                    name="bookingTime"
                                                    value={formData.bookingTime}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cafe-brown focus:ring-2 focus:ring-cafe-brown/20 outline-none transition-all text-gray-600"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-cafe-brown text-white py-4 rounded-xl font-bold text-lg hover:bg-cafe-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        Confirm Reservation
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Success Modal */}
            {success && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md mx-4 animate-scale-up">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-cafe-noir mb-2">Booking Confirmed!</h3>
                        <p className="text-gray-600">We look forward to hosting you. Your table is reserved.</p>
                        <button
                            onClick={() => setSuccess(false)}
                            className="mt-8 bg-cafe-brown text-white px-8 py-3 rounded-full hover:bg-cafe-dark transition"
                        >Close</button>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Booking;
