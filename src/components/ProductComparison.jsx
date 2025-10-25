import { useState, useRef } from 'react';
import { X, Star, Check, Minus } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@/hooks/useGSAP';

export default function ProductComparison({ products, isOpen, onClose }) {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    
    // Modal animation
    useGSAP(() => {
        if (isOpen && modalRef.current && overlayRef.current && contentRef.current) {
            const tl = gsap.timeline();
            
            tl.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            )
            .fromTo(contentRef.current,
                { opacity: 0, scale: 0.9, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" },
                "-=0.1"
            );
            
            return tl;
        }
    }, [isOpen]);
    
    // Close modal animation
    const handleClose = () => {
        if (modalRef.current && overlayRef.current && contentRef.current) {
            const tl = gsap.timeline({
                onComplete: onClose
            });
            
            tl.to(contentRef.current, {
                opacity: 0,
                scale: 0.9,
                y: 30,
                duration: 0.3,
                ease: "power2.in"
            })
            .to(overlayRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.in"
            }, "-=0.1");
        } else {
            onClose();
        }
    };
    
    if (!isOpen || !products || products.length < 2) return null;
    
    const comparisonFeatures = [
        { key: 'price', label: 'Price', format: (value) => `$${value.toFixed(2)}` },
        { key: 'rating.rate', label: 'Rating', format: (value) => `${value}/5.0` },
        { key: 'rating.count', label: 'Reviews', format: (value) => `${value} reviews` },
        { key: 'category', label: 'Category', format: (value) => value },
    ];
    
    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    };
    
    return (
        <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div 
                ref={overlayRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />
            
            {/* Modal Content */}
            <div 
                ref={contentRef}
                className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Product Comparison
                        </h2>
                        <button
                            onClick={handleClose}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>
                
                {/* Comparison Table */}
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left py-4 px-2 font-medium text-gray-900 w-32">
                                        Features
                                    </th>
                                    {products.map((product, index) => (
                                        <th key={index} className="text-center py-4 px-4 min-w-[200px]">
                                            <div className="space-y-3">
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="w-20 h-20 object-contain mx-auto bg-gray-50 rounded-lg"
                                                />
                                                <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                                                    {product.title}
                                                </h3>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {comparisonFeatures.map((feature, featureIndex) => (
                                    <tr key={featureIndex} className="hover:bg-gray-50">
                                        <td className="py-4 px-2 font-medium text-gray-700">
                                            {feature.label}
                                        </td>
                                        {products.map((product, productIndex) => {
                                            const value = getNestedValue(product, feature.key);
                                            const formattedValue = feature.format(value);
                                            
                                            // Determine if this is the best value for comparison
                                            let isBest = false;
                                            if (feature.key === 'price') {
                                                const prices = products.map(p => getNestedValue(p, feature.key));
                                                isBest = value === Math.min(...prices);
                                            } else if (feature.key === 'rating.rate' || feature.key === 'rating.count') {
                                                const ratings = products.map(p => getNestedValue(p, feature.key));
                                                isBest = value === Math.max(...ratings);
                                            }
                                            
                                            return (
                                                <td key={productIndex} className="py-4 px-4 text-center">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                                                        isBest 
                                                            ? 'bg-green-100 text-green-800 font-medium' 
                                                            : 'text-gray-700'
                                                    }`}>
                                                        {isBest && <Check size={14} />}
                                                        {formattedValue}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                                
                                {/* Description Row */}
                                <tr className="hover:bg-gray-50">
                                    <td className="py-4 px-2 font-medium text-gray-700 align-top">
                                        Description
                                    </td>
                                    {products.map((product, index) => (
                                        <td key={index} className="py-4 px-4 text-sm text-gray-600 align-top">
                                            <p className="line-clamp-3">
                                                {product.description}
                                            </p>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="mt-8 flex justify-center gap-4">
                        {products.map((product, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    handleClose();
                                    window.location.href = `/products/${product.id}`;
                                }}
                                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                            >
                                View {product.title.split(' ').slice(0, 2).join(' ')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}