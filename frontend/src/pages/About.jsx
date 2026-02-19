import React from 'react';
import Layout from '../components/Layout';
import { Coffee, Award, Users, Heart } from 'lucide-react';

const About = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center bg-cafe-noir text-white overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2671&auto=format&fit=crop"
                        alt="Cafe Interior"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-cafe-noir/90"></div>
                </div>
                <div className="relative z-10 text-center max-w-4xl px-6 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-cafe-gold">Our Story</h1>
                    <p className="text-xl md:text-2xl font-light text-gray-200">
                        Brewing passion, community, and excellence since 2010.
                    </p>
                </div>
            </div>

            {/* Our Journey Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="md:w-1/2 relative">
                            <div className="absolute top-4 left-4 w-full h-full border-2 border-cafe-gold rounded-lg transform translate-x-4 translate-y-4"></div>
                            <img
                                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2694&auto=format&fit=crop"
                                alt="Barista pouring coffee"
                                className="relative rounded-lg shadow-2xl w-full object-cover h-[500px]"
                            />
                        </div>
                        <div className="md:w-1/2 space-y-6">
                            <h2 className="text-4xl font-serif font-bold text-cafe-noir">From a Humble Bean to Your Cup</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Cafe Delight began with a simple mission: to serve the perfect cup of coffee in a space that feels like home.
                                Founded by two friends with a shared love for ethically sourced beans and artisanal pastries, we started as a small kiosk
                                and have grown into a beloved community hub.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                We believe that coffee is more than just a caffeine fix—it's a ritual, a conversation starter, and a moment of pause
                                in a busy day. That's why we meticulously select our beans, train our baristas to perfection, and bake our pastries fresh every morning.
                            </p>
                            <div className="pt-4">
                                <span className="font-serif text-2xl text-cafe-gold italic">"Life happens, coffee helps."</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-cafe-crema/20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-cafe-noir mb-4">Why We Do What We Do</h2>
                        <div className="w-24 h-1 bg-cafe-gold mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="bg-white p-10 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center group">
                            <div className="w-20 h-20 bg-cafe-noir rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-cafe-gold transition-colors">
                                <Award className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-cafe-noir">Uncompromising Quality</h3>
                            <p className="text-gray-600">
                                We source only the finest, 100% Arabica beans from sustainable farms across the globe. Every cup is a testament to quality.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center group">
                            <div className="w-20 h-20 bg-cafe-noir rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-cafe-gold transition-colors">
                                <Users className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-cafe-noir">Community First</h3>
                            <p className="text-gray-600">
                                We are more than a cafe; we are a gathering place. We support local artists, host community events, and cherish every regular.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center group">
                            <div className="w-20 h-20 bg-cafe-noir rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-cafe-gold transition-colors">
                                <Heart className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-cafe-noir">Made with Love</h3>
                            <p className="text-gray-600">
                                From our house-made syrups to our hand-rolled croissants, everything is prepared with care and attention to detail.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default About;
