import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from 'gsap';

export default function ProductDetailsSkeleton() {
    const skeletonRef = useRef(null);
    
    // Animate skeleton loading
    useGSAP(() => {
        if (skeletonRef.current) {
            const skeletonElements = skeletonRef.current.querySelectorAll('.skeleton');
            
            gsap.fromTo(skeletonElements,
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.5, 
                    stagger: 0.1, 
                    ease: "power2.out" 
                }
            );
        }
    }, []);
    
    return (
        <div ref={skeletonRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center space-x-2 mb-6">
                <div className="skeleton w-4 h-4 rounded"></div>
                <div className="skeleton w-16 h-4 rounded"></div>
                <div className="skeleton w-4 h-4 rounded"></div>
                <div className="skeleton w-20 h-4 rounded"></div>
                <div className="skeleton w-4 h-4 rounded"></div>
                <div className="skeleton w-32 h-4 rounded"></div>
            </div>
            
            {/* Back Button Skeleton */}
            <div className="skeleton w-32 h-6 rounded mb-8"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Image Skeleton */}
                <div className="space-y-4">
                    <div className="skeleton aspect-square rounded-lg"></div>
                    <div className="flex gap-3">
                        <div className="skeleton w-20 h-20 rounded-md"></div>
                        <div className="skeleton w-20 h-20 rounded-md"></div>
                        <div className="skeleton w-20 h-20 rounded-md"></div>
                        <div className="skeleton w-20 h-20 rounded-md"></div>
                    </div>
                </div>
                
                {/* Details Skeleton */}
                <div className="space-y-6">
                    {/* Category & Share */}
                    <div className="flex items-center justify-between">
                        <div className="skeleton w-20 h-6 rounded-full"></div>
                        <div className="skeleton w-8 h-8 rounded"></div>
                    </div>
                    
                    {/* Title */}
                    <div className="space-y-2">
                        <div className="skeleton w-full h-8 rounded"></div>
                        <div className="skeleton w-3/4 h-8 rounded"></div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="skeleton w-5 h-5 rounded"></div>
                            ))}
                        </div>
                        <div className="skeleton w-24 h-4 rounded"></div>
                    </div>
                    
                    {/* Price */}
                    <div className="skeleton w-32 h-10 rounded"></div>
                    
                    {/* Description */}
                    <div className="space-y-2">
                        <div className="skeleton w-full h-4 rounded"></div>
                        <div className="skeleton w-full h-4 rounded"></div>
                        <div className="skeleton w-3/4 h-4 rounded"></div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="space-y-3">
                        <div className="skeleton w-16 h-4 rounded"></div>
                        <div className="skeleton w-32 h-12 rounded-lg"></div>
                    </div>
                    
                    {/* Buttons */}
                    <div className="flex gap-4">
                        <div className="skeleton flex-1 h-14 rounded-xl"></div>
                        <div className="skeleton w-14 h-14 rounded-xl"></div>
                    </div>
                    
                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="skeleton w-5 h-5 rounded"></div>
                            <div className="skeleton w-20 h-4 rounded"></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="skeleton w-5 h-5 rounded"></div>
                            <div className="skeleton w-24 h-4 rounded"></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="skeleton w-5 h-5 rounded"></div>
                            <div className="skeleton w-20 h-4 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Specs Section Skeleton */}
            <div className="mt-16 space-y-8">
                <div className="flex space-x-8 border-b border-gray-200">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="skeleton w-24 h-6 rounded mb-4"></div>
                    ))}
                </div>
                <div className="space-y-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100">
                            <div className="skeleton w-32 h-4 rounded"></div>
                            <div className="skeleton w-24 h-4 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Related Products Skeleton */}
            <div className="mt-16 space-y-8">
                <div className="skeleton w-64 h-8 rounded mx-auto"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <div className="skeleton aspect-4/5 rounded-lg"></div>
                            <div className="space-y-2">
                                <div className="skeleton w-full h-4 rounded"></div>
                                <div className="skeleton w-3/4 h-4 rounded"></div>
                                <div className="skeleton w-20 h-6 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}