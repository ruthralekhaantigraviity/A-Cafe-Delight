import React, { useState } from 'react';
import Layout from '../components/Layout';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, toggle }) => {
    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
                onClick={toggle}
            >
                <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-cafe-gold' : 'text-cafe-noir'}`}>
                    {question}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-cafe-gold" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-gray-600 leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "Do you offer vegan or gluten-free options?",
            answer: "Yes! We have a variety of vegan milks (oat, almond, soy) for our coffees and a selection of gluten-free pastries and vegan snacks. Check our menu for specific dietary labels."
        },
        {
            question: "Can I book a table for a large group?",
            answer: "Absolutely. You can book tables for up to 8 people directly through our website. For larger parties, please contact us directly so we can make special arrangements for you."
        },
        {
            question: "Do you have Wi-Fi?",
            answer: "Yes, we offer free high-speed Wi-Fi for all our customers. It's the perfect spot to work, study, or just browse while you enjoy your coffee."
        },
        {
            question: "Are pets allowed?",
            answer: "We love furry friends! Our outdoor patio is completely pet-friendly. However, valid health regulations restrict pets from entering the indoor dining area, with the exception of service animals."
        },
        {
            question: "Do you sell your coffee beans?",
            answer: "Yes, we sell bags of our signature house blend and rotating single-origin beans. You can purchase them in-store, and our baristas are happy to grind them for your preferred brewing method."
        },
        {
            question: "What are your opening hours?",
            answer: "We are open Monday through Friday from 7:00 AM to 8:00 PM, and on weekends from 8:00 AM to 9:00 PM."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <Layout>
            <div className="bg-cafe-crema/20 min-h-screen py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16 animate-fade-in-down">
                        <div className="inline-flex items-center justify-center p-3 bg-cafe-gold/10 rounded-full mb-4">
                            <HelpCircle className="w-8 h-8 text-cafe-gold" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-cafe-noir mb-4">Frequently Asked Questions</h1>
                        <p className="text-xl text-gray-600">
                            Everything you need to know about Cafe Delight.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-fade-in-up">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                toggle={() => toggleFAQ(index)}
                            />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-600">
                            Still have questions? <a href="#" className="text-cafe-gold font-bold hover:underline">Contact us</a>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FAQ;
