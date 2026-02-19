import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Twitter, Coffee } from 'lucide-react';

const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'text-cafe-gold font-bold' : 'text-white hover:text-cafe-crema transition-colors';

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${location.pathname === '/' ? 'bg-transparent pt-4' : 'bg-cafe-noir/90 backdrop-blur-md shadow-lg border-b border-cafe-charcoal'}`}>
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <Coffee className="h-8 w-8 text-white group-hover:text-cafe-gold transition-colors" />
                        <span className="text-2xl font-serif font-bold text-white tracking-wide">A cafe Delight</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center font-medium">
                        <Link to="/" className={isActive('/')}>Home</Link>
                        <Link to="/about" className={isActive('/about')}>About Us</Link>
                        <Link to="/menu" className={isActive('/menu')}>Menu</Link>
                        <Link to="/faq" className={isActive('/faq')}>FAQ</Link>
                        <Link to="/book" className={`px-6 py-2 rounded-lg border border-cafe-gold text-cafe-gold hover:bg-cafe-gold hover:text-cafe-noir transition-all duration-300 uppercase tracking-wider text-sm ${location.pathname === '/book' ? 'bg-cafe-gold text-cafe-noir' : ''}`}>
                            Book a Table
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-cafe-noir border-t border-cafe-charcoal animate-fade-in-down">
                        <div className="flex flex-col space-y-4 p-6">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className={isActive('/')}>Home</Link>
                            <Link to="/about" onClick={() => setIsMenuOpen(false)} className={isActive('/about')}>About Us</Link>
                            <Link to="/menu" onClick={() => setIsMenuOpen(false)} className={isActive('/menu')}>Menu</Link>
                            <Link to="/faq" onClick={() => setIsMenuOpen(false)} className={isActive('/faq')}>FAQ</Link>
                            <Link to="/book" onClick={() => setIsMenuOpen(false)} className={isActive('/book')}>Book Table</Link>
                            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className={isActive('/admin')}>Admin</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className={`flex-grow ${location.pathname === '/' ? '' : 'pt-20'}`}>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-cafe-noir text-white py-12 border-t border-cafe-charcoal">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                            <Coffee className="w-6 h-6 text-cafe-gold" />
                            <span className="text-xl font-serif font-bold">Cafe Delight</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Crafting moments of joy with every cup. Experience the finest blends and artisanal treats in a cozy atmosphere.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-cafe-crema">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/menu" className="hover:text-cafe-gold transition">Our Menu</Link></li>
                            <li><Link to="/book" className="hover:text-cafe-gold transition">Reservations</Link></li>
                            <li><Link to="/admin" className="hover:text-cafe-gold transition">Admin Login</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-cafe-crema">Connect With Us</h4>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="#" className="p-2 bg-cafe-charcoal rounded-full hover:bg-cafe-gold hover:text-cafe-noir transition"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-cafe-charcoal rounded-full hover:bg-cafe-gold hover:text-cafe-noir transition"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-cafe-charcoal rounded-full hover:bg-cafe-gold hover:text-cafe-noir transition"><Twitter className="w-5 h-5" /></a>
                        </div>
                        <p className="mt-4 text-gray-500 text-sm">123 Coffee Lane, Cityville</p>
                    </div>
                </div>
                <div className="mt-8 border-t border-cafe-charcoal pt-6 text-center text-gray-500 text-xs">
                    &copy; {new Date().getFullYear()} Cafe Delight. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
