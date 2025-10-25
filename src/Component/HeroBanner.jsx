// src/Component/HeroBanner.jsx
import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function HeroBanner() {
    return (
        <div className="bg-black text-white py-12 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex animate-marquee-infinite whitespace-nowrap">
                    <div className="flex items-center text-4xl lg:text-6xl font-extrabold uppercase tracking-tighter">
                        <span className="mx-6">New Arrivals</span>
                        <ShoppingBag className="w-12 h-12 mx-6" />
                        <span className="mx-6">Up to 50% Off</span>
                        <ShoppingBag className="w-12 h-12 mx-6" />
                        <span className="mx-6">Free Shipping</span>
                        <ShoppingBag className="w-12 h-12 mx-6" />
                    </div>
                    {/* Duplicate for seamless looping */}
                    <div className="flex items-center text-4xl lg:text-6xl font-extrabold uppercase tracking-tighter" aria-hidden="true">
                        <span className="mx-6">New Arrivals</span>
                        <ShoppingBag className="w-12 h-12 mx-6" />
                        <span className="mx-6">Up to 50% Off</span>
                        <ShoppingBag className="w-12 h-12 mx-6" />
                        <span className="mx-6">Free Shipping</span>
                        <ShoppingBag className="w-12 h-12 mx-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}