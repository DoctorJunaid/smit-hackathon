import React from 'react';
import Navbar from '@/Component/Navbar';
import Footer from '@/Component/Footer';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">About Us</h1>
                        <p className="text-gray-600 text-lg">Your trusted destination for quality products</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Founded in 2025, MyMart has grown from a small local store to a leading 
                                e-commerce platform. Our mission is to provide high-quality products at 
                                competitive prices while delivering exceptional customer service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-semibold mb-2">Quality</h3>
                                    <p className="text-gray-600">We ensure all our products meet the highest standards</p>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-semibold mb-2">Trust</h3>
                                    <p className="text-gray-600">Building lasting relationships with our customers</p>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-semibold mb-2">Innovation</h3>
                                    <p className="text-gray-600">Constantly improving our services and products</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Wide selection of quality products</li>
                                <li>Competitive prices and regular discounts</li>
                                <li>Fast and reliable shipping</li>
                                <li>Excellent customer support</li>
                                <li>Easy returns and refunds</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
