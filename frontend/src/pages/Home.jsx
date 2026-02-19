import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Clock, MapPin, Mail, Calendar } from 'lucide-react';

const Home = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative h-screen flex flex-col justify-center bg-gray-900 text-white">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2694&auto=format&fit=crop"
                        alt="Coffee Shop Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-6 mt-20">
                    <div className="max-w-3xl animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                            Your neighborhood sanctuary <br />
                            for <span className="italic">exquisite coffee</span>
                        </h1>
                        <p className="text-lg text-gray-200 mb-10 font-sans tracking-wide">
                            Enjoy expertly crafted beverages.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/menu" className="bg-[#8B3A18] hover:bg-[#6d2e13] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 shadow-lg">
                                Full Menu
                            </Link>
                            <Link to="/about" className="bg-[#C5A085] hover:bg-[#b08d74] text-cafe-noir px-8 py-3 rounded-lg font-medium transition-colors duration-300 shadow-lg">
                                More Info
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Info Bar */}
                <div className="absolute bottom-0 w-full bg-[#5C230D] text-white py-10 z-20">
                    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

                        {/* Hours */}
                        <div className="flex items-start gap-4 justify-center md:justify-start">
                            <Calendar className="w-10 h-10 text-white shrink-0" strokeWidth={1.5} />
                            <div>
                                <div className="flex gap-4 w-48 mb-1">
                                    <span className="font-medium text-gray-300 w-20">Mon - Fri</span>
                                    <span className="font-light">8 AM to 8 PM</span>
                                </div>
                                <div className="flex gap-4 w-48">
                                    <span className="font-medium text-gray-300 w-20">Sat - Sun</span>
                                    <span className="font-light">7 AM to 9 PM</span>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <MapPin className="w-10 h-10 text-white shrink-0" strokeWidth={1.5} />
                            <div>
                                <p className="font-light text-base">123 Coffee Lane,</p>
                                <p className="font-light text-base">Bean Town, CA 90210</p>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <Mail className="w-10 h-10 text-white shrink-0" strokeWidth={1.5} />
                            <div>
                                <p className="font-light text-lg tracking-wide">(123) 456-7890</p>
                                <p className="text-gray-300 font-light">ACafeDelight@email.com</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Expertly Crafted Section */}
            <section className="py-24 bg-[#f8f5f2] relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        {/* Left Side - Images */}
                        <div className="lg:w-1/2 relative">
                            {/* Decorative Background Circle */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#EAE0D5] rounded-full opacity-50 z-0"></div>

                            <div className="relative z-10 w-full max-w-lg mx-auto h-[500px]">
                                {/* Top Image */}
                                <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-8 border-white overflow-hidden shadow-xl z-20">
                                    <img
                                        src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2671&auto=format&fit=crop"
                                        alt="Latte Art"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Bottom Image */}
                                <div className="absolute bottom-10 right-0 w-72 h-72 rounded-full border-8 border-white p-2 bg-white shadow-2xl z-30">
                                    <div className="w-full h-full rounded-full border-2 border-dashed border-cafe-brown overflow-hidden p-1">
                                        <img
                                            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2574&auto=format&fit=crop"
                                            alt="Friends drinking coffee"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="lg:w-1/2 space-y-8">
                            <h2 className="text-5xl font-serif font-bold text-cafe-noir leading-tight">
                                Enjoy expertly crafted <br />
                                beverages made from the finest coffee beans.
                            </h2>
                            <p className="text-xl text-gray-600 font-light">
                                Find delightful treats, and warm, inviting vibes.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-4">
                                {[
                                    "Premium Quality", "Community Focused",
                                    "Cozy Atmosphere", "Eco-Friendly Practices"
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6L9 17L4 12" stroke="#8B3A18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span className="text-lg font-medium text-cafe-noir">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rich and Robust Banner */}
            <section className="py-24 bg-[#EAE0D5]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        {/* Text Content */}
                        <div className="md:w-1/2 text-center md:text-left space-y-6">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-cafe-noir leading-tight">
                                Enjoy the rich and robust flavors
                            </h2>
                            <p className="text-lg text-cafe-charcoal font-medium max-w-lg mx-auto md:mx-0">
                                Locally roasted coffee, supporting both your taste buds and the local community.
                            </p>
                            <Link to="/about" className="inline-block bg-[#4A1C0A] text-white px-10 py-3 rounded-md font-medium hover:bg-[#3d1708] transition-all shadow-md text-lg">
                                Learn More
                            </Link>
                        </div>

                        {/* Image */}
                        <div className="md:w-1/2 flex justify-center md:justify-end relative">
                            <img
                                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop"
                                alt="Top down coffee cup"
                                className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-full shadow-2xl"
                                style={{ boxShadow: '25px 25px 50px #c7be15, -25px -25px 50px #ffffff' }}
                            />
                            <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore our Foods Section */}
            <section className="py-24 bg-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-cafe-noir mb-16">
                        Explore our Foods
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {[
                            { title: "Espresso-based", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=2670&auto=format&fit=crop" },
                            { title: "Brewed Coffee", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2670&auto=format&fit=crop" },
                            { title: "Tea Selection", img: "https://images.unsplash.com/photo-1576092768241-dec231847233?q=80&w=2574&auto=format&fit=crop" },
                            { title: "Pastries & Desserts", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2565&auto=format&fit=crop" }
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center group cursor-pointer">
                                <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-lg mb-6 transition-transform duration-300 group-hover:-translate-y-2">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-xl font-medium text-cafe-brown font-serif">{item.title}</h3>
                            </div>
                        ))}
                    </div>

                    <Link to="/menu" className="inline-block bg-[#C5A085] hover:bg-[#b08d74] text-white px-8 py-3 rounded-md font-medium transition-colors duration-300 shadow-md">
                        See Full Menu
                    </Link>
                </div>
            </section>

            {/* Sourcing Banner */}
            <section className="relative py-32 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504618223453-2c5016c77bb4?q=80&w=2672&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 container mx-auto px-6 text-center text-white">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight max-w-4xl mx-auto">
                        We source our milk and dairy products from nearby family-owned farms.
                    </h2>
                    <Link to="/about" className="bg-[#8B3A18] hover:bg-[#6d2e13] text-white px-8 py-3 rounded-md font-medium transition-colors duration-300 shadow-lg inline-block mb-12">
                        Learn More
                    </Link>

                    {/* Product Mockups */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        <img
                            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop"
                            alt="Coffee"
                            className="w-full h-48 object-cover rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 border-2 border-white/20"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2526&auto=format&fit=crop"
                            alt="Pastry"
                            className="w-full h-48 object-cover rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 border-2 border-white/20"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2581&auto=format&fit=crop"
                            alt="Pizza"
                            className="w-full h-48 object-cover rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 border-2 border-white/20"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=2574&auto=format&fit=crop"
                            alt="Burger"
                            className="w-full h-48 object-cover rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 border-2 border-white/20"
                        />
                    </div>
                </div>
            </section>

            {/* Book Your Table Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-4xl font-serif font-bold text-cafe-noir mb-12">
                        Book Your Table
                    </h2>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-cafe-brown" />
                        <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-cafe-brown" />
                        <input type="date" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-cafe-brown" />
                        <input type="time" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-cafe-brown" />
                        <select className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-cafe-brown md:col-span-2">
                            <option value="">People</option>
                            <option value="1">1 Person</option>
                            <option value="2">2 People</option>
                            <option value="3">3 People</option>
                            <option value="4">4+ People</option>
                        </select>
                    </form>

                    <Link to="/book" className="w-full md:w-auto bg-[#5C230D] hover:bg-[#4a1c0a] text-white px-12 py-3 rounded-md font-medium transition-colors duration-300 shadow-lg inline-block">
                        Find a Table
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#4A1C0A] text-white pt-16 pb-8">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">

                        <div className="flex items-center gap-2 mb-8 md:mb-0">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                <span className="text-2xl">☕</span>
                            </div>
                            <span className="text-2xl font-serif font-bold">A cafe Delight</span>
                        </div>

                        <div className="flex flex-wrap gap-8 justify-center mb-8 md:mb-0 text-sm font-medium">
                            <a href="#" className="hover:text-cafe-gold transition-colors">Home</a>
                            <a href="#" className="hover:text-cafe-gold transition-colors">About Us</a>
                            <Link to="/menu" className="hover:text-cafe-gold transition-colors">Menu</Link>
                            <a href="#" className="hover:text-cafe-gold transition-colors">FAQ</a>
                        </div>

                        <Link to="/menu" className="bg-[#C5A085] hover:bg-[#b08d74] text-white px-6 py-2 rounded-md font-medium transition-colors duration-300">
                            Full Menu
                        </Link>
                    </div>

                    <hr className="border-white/10 mb-8" />

                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>123 Coffee Lane, Bean Town, CA 90210</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>(123) 456-7890</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>ACafeDelight@gmail.com</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-cafe-gold hover:text-cafe-noir transition-all">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-cafe-gold hover:text-cafe-noir transition-all">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.072 3.252.148 4.771 1.691 4.919 4.919.06 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

        </Layout>
    );
};

export default Home;
