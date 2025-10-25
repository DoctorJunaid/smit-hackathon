import { useState, useEffect, useRef } from 'react';
import { CheckCircle, ShoppingBag, X } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@/hooks/useGSAP';

export default function CartNotification({ 
    isVisible, 
    onClose, 
    product, 
    quantity = 1,
    duration = 4000 
}) {
    const notificationRef = useRef(null);
    const progressRef = useRef(null);
    
    // Auto close after duration
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);
    
    // Entrance and exit animations
    useGSAP(() => {
        if (notificationRef.current && progressRef.current) {
            if (isVisible) {
                // Entrance animation
                const tl = gsap.timeline();
                
                tl.fromTo(notificationRef.current,
                    { 
                        opacity: 0, 
                        x: 300, 
                        scale: 0.8 
                    },
                    { 
                        opacity: 1, 
                        x: 0, 
                        scale: 1, 
                        duration: 0.5, 
                        ease: "back.out(1.7)" 
                    }
                )
                .fromTo(progressRef.current,
                    { width: '100%' },
                    { 
                        width: '0%', 
                        duration: duration / 1000, 
                        ease: "none" 
                    },
                    "-=0.2"
                );
                
                return tl;
            } else {
                // Exit animation
                return gsap.to(notificationRef.current, {
                    opacity: 0,
                    x: 300,
                    scale: 0.8,
                    duration: 0.3,
                    ease: "power2.in"
                });
            }
        }
    }, [isVisible, duration]);
    
    if (!isVisible || !product) return null;
    
    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
            <div 
                ref={notificationRef}
                className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
            >
                {/* Progress bar */}
                <div className="h-1 bg-gray-200">
                    <div 
                        ref={progressRef}
                        className="h-full bg-green-500 transition-all duration-100"
                    />
                </div>
                
                <div className="p-4">
                    <div className="flex items-start gap-3">
                        {/* Success Icon */}
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle size={18} className="text-green-600" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <ShoppingBag size={16} className="text-gray-600" />
                                <p className="text-sm font-medium text-gray-900">
                                    Added to cart
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-12 h-12 object-contain bg-gray-50 rounded-lg"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900 font-medium line-clamp-2">
                                        {product.title}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Qty: {quantity} • ${(product.price * quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={onClose}
                            className="flex-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={() => {
                                onClose();
                                window.location.href = '/cart';
                            }}
                            className="flex-1 bg-black text-white text-sm py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            View Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}