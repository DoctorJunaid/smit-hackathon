import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearCart } from '@/Redux/CartSlice';
import { ShoppingBag, CreditCard, MapPin, User, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/Component/Navbar';
import Footer from '@/Component/Footer';

export default function CheckoutPage() {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        
        // Simulate processing time
        setTimeout(() => {
            toast.success('🎉 Order placed successfully! Thank you for your purchase.');
            dispatch(clearCart());
            navigate('/');
        }, 2000);
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    if (items.length === 0) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <ShoppingBag size={40} className="text-gray-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                        <p className="text-gray-600 mb-8">Add some items to your cart before checking out</p>
                        <button
                            onClick={() => navigate('/shop')}
                            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Secure Checkout</h1>
                        <div className="flex items-center justify-center space-x-4">
                            <div className={`flex items-center ${currentStep >= 1 ? 'text-black' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                                    1
                                </div>
                                <span className="ml-2 text-sm font-medium">Shipping</span>
                            </div>
                            <div className="w-8 h-px bg-gray-300"></div>
                            <div className={`flex items-center ${currentStep >= 2 ? 'text-black' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                                    2
                                </div>
                                <span className="ml-2 text-sm font-medium">Payment</span>
                            </div>
                            <div className="w-8 h-px bg-gray-300"></div>
                            <div className={`flex items-center ${currentStep >= 3 ? 'text-black' : 'text-gray-400'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-black text-white' : 'bg-gray-200'}`}>
                                    3
                                </div>
                                <span className="ml-2 text-sm font-medium">Review</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm p-8">
                                <form onSubmit={handleSubmit}>
                                    {/* Step 1: Shipping Information */}
                                    {currentStep === 1 && (
                                        <div className="space-y-6">
                                            <div className="flex items-center mb-6">
                                                <MapPin className="w-6 h-6 text-black mr-3" />
                                                <h2 className="text-2xl font-semibold text-gray-900">Shipping Information</h2>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="relative">
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Full Name
                                                    </label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleInputChange}
                                                            required
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                            placeholder="Enter your full name"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="relative">
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Email Address
                                                    </label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                            required
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                            placeholder="Enter your email"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    placeholder="Enter your phone number"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Street Address
                                                </label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    placeholder="Enter your street address"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                                        City
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                        placeholder="Enter your city"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
                                                        ZIP Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="zip"
                                                        name="zip"
                                                        value={formData.zip}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                        placeholder="Enter ZIP code"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex justify-end pt-6">
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium"
                                                >
                                                    Continue to Payment
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Payment Information */}
                                    {currentStep === 2 && (
                                        <div className="space-y-6">
                                            <div className="flex items-center mb-6">
                                                <CreditCard className="w-6 h-6 text-black mr-3" />
                                                <h2 className="text-2xl font-semibold text-gray-900">Payment Information</h2>
                                            </div>

                                            <div>
                                                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Cardholder Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cardName"
                                                    name="cardName"
                                                    value={formData.cardName}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    placeholder="Name on card"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Card Number
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cardNumber"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength="19"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Expiry Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="expiryDate"
                                                        name="expiryDate"
                                                        value={formData.expiryDate}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                        placeholder="MM/YY"
                                                        maxLength="5"
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                                                        CVV
                                                    </label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            id="cvv"
                                                            name="cvv"
                                                            value={formData.cvv}
                                                            onChange={handleInputChange}
                                                            required
                                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                                                            placeholder="123"
                                                            maxLength="4"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between pt-6">
                                                <button
                                                    type="button"
                                                    onClick={prevStep}
                                                    className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full hover:bg-gray-300 transition-colors font-medium"
                                                >
                                                    Back to Shipping
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium"
                                                >
                                                    Review Order
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Review Order */}
                                    {currentStep === 3 && (
                                        <div className="space-y-6">
                                            <div className="flex items-center mb-6">
                                                <ShoppingBag className="w-6 h-6 text-black mr-3" />
                                                <h2 className="text-2xl font-semibold text-gray-900">Review Your Order</h2>
                                            </div>

                                            {/* Shipping Details */}
                                            <div className="bg-gray-50 rounded-xl p-6">
                                                <h3 className="font-semibold text-gray-900 mb-4">Shipping Address</h3>
                                                <div className="text-gray-700">
                                                    <p className="font-medium">{formData.name}</p>
                                                    <p>{formData.address}</p>
                                                    <p>{formData.city}, {formData.zip}</p>
                                                    <p>{formData.phone}</p>
                                                    <p>{formData.email}</p>
                                                </div>
                                            </div>

                                            {/* Payment Details */}
                                            <div className="bg-gray-50 rounded-xl p-6">
                                                <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
                                                <div className="text-gray-700">
                                                    <p>**** **** **** {formData.cardNumber.slice(-4)}</p>
                                                    <p>{formData.cardName}</p>
                                                </div>
                                            </div>

                                            <div className="flex justify-between pt-6">
                                                <button
                                                    type="button"
                                                    onClick={prevStep}
                                                    className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full hover:bg-gray-300 transition-colors font-medium"
                                                >
                                                    Back to Payment
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isProcessing}
                                                    className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isProcessing ? 'Processing...' : 'Place Order'}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
                                
                                <div className="space-y-4 mb-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-200 pt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-gray-900">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-gray-900">Free</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="text-gray-900">${(total * 0.08).toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between">
                                            <span className="text-lg font-semibold text-gray-900">Total</span>
                                            <span className="text-lg font-semibold text-gray-900">
                                                ${(total + total * 0.08).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                                    <div className="flex items-center">
                                        <Lock className="w-5 h-5 text-green-600 mr-2" />
                                        <span className="text-sm text-green-800 font-medium">Secure Checkout</span>
                                    </div>
                                    <p className="text-xs text-green-700 mt-1">Your payment information is encrypted and secure</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
