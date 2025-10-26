import React, { useState } from 'react';
import Navbar from '@/Component/Navbar';
import Footer from '@/Component/Footer';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                        <p className="text-gray-600 text-lg">We'd love to hear from you</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <Phone className="w-6 h-6 text-gray-600" />
                                        <div>
                                            <h3 className="font-medium">Phone</h3>
                                            <p className="text-gray-600">03164593159</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Mail className="w-6 h-6 text-gray-600" />
                                        <div>
                                            <h3 className="font-medium">Email</h3>
                                            <p className="text-gray-600">junaid.aurangeb1@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <MapPin className="w-6 h-6 text-gray-600" />
                                        <div>
                                            <h3 className="font-medium">Address</h3>
                                            <p className="text-gray-600">
                                                Peshawar<br />
                                                Khyber Pakhtunkhwa<br />
                                                Pakistan
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-semibold mb-6">Business Hours</h2>
                                <div className="space-y-2">
                                    <p className="flex justify-between">
                                        <span className="text-gray-600">Monday - Friday:</span>
                                        <span>9:00 AM - 6:00 PM</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-gray-600">Saturday:</span>
                                        <span>10:00 AM - 4:00 PM</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-gray-600">Sunday:</span>
                                        <span>Closed</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Google Maps Section */}
                    <div className="mt-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-semibold mb-6">Find Us on Map</h2>
                            <div className="w-full h-96 rounded-lg overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212270.5667814511!2d71.35245!3d34.0151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d917b8146c0dc5%3A0x3e4b8c9b6b8b8b8b!2sPeshawar%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1635789012345!5m2!1sen!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Peshawar Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}