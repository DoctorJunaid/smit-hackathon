import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@/hooks/useGSAP';
import { productAnimations } from '@/utils/animations';

export default function ProductImageGallery({ images, productTitle }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    const mainImageRef = useRef(null);
    const thumbnailsRef = useRef(null);
    const zoomOverlayRef = useRef(null);
    
    // If only one image is provided, create array with multiple views
    const imageArray = Array.isArray(images) ? images : [images];
    
    // Handle image selection with animation
    const handleImageSelect = (index) => {
        if (index === selectedImage) return;
        
        if (mainImageRef.current) {
            gsap.to(mainImageRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => {
                    setSelectedImage(index);
                    gsap.to(mainImageRef.current, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        }
    };
    
    // Handle navigation
    const handlePrevious = () => {
        const newIndex = selectedImage === 0 ? imageArray.length - 1 : selectedImage - 1;
        handleImageSelect(newIndex);
    };
    
    const handleNext = () => {
        const newIndex = selectedImage === imageArray.length - 1 ? 0 : selectedImage + 1;
        handleImageSelect(newIndex);
    };
    
    // Handle zoom
    const handleZoomToggle = () => {
        setIsZoomed(!isZoomed);
        
        if (zoomOverlayRef.current) {
            if (!isZoomed) {
                gsap.fromTo(zoomOverlayRef.current,
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
                );
            } else {
                gsap.to(zoomOverlayRef.current, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.2,
                    ease: "power2.in"
                });
            }
        }
    };
    
    // Handle mouse move for zoom
    const handleMouseMove = (e) => {
        if (!isZoomed) return;
        
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setMousePosition({ x, y });
    };
    
    // Entrance animation
    useGSAP(() => {
        if (mainImageRef.current && thumbnailsRef.current) {
            const tl = gsap.timeline();
            
            tl.fromTo(mainImageRef.current,
                { opacity: 0, scale: 0.9, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" }
            )
            .fromTo(thumbnailsRef.current.children,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
                "-=0.3"
            );
            
            return tl;
        }
    }, []);
    
    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                <img
                    ref={mainImageRef}
                    src={imageArray[selectedImage]}
                    alt={`${productTitle} - View ${selectedImage + 1}`}
                    className="w-full h-full object-contain p-8 transition-transform duration-300 group-hover:scale-105 cursor-zoom-in"
                    onClick={handleZoomToggle}
                    onMouseMove={handleMouseMove}
                />
                
                {/* Navigation Arrows */}
                {imageArray.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}
                
                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={16} />
                </div>
                
                {/* Image Counter */}
                {imageArray.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {selectedImage + 1} / {imageArray.length}
                    </div>
                )}
            </div>
            
            {/* Thumbnails */}
            {imageArray.length > 1 && (
                <div ref={thumbnailsRef} className="flex gap-3 overflow-x-auto pb-2">
                    {imageArray.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => handleImageSelect(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                                selectedImage === index
                                    ? 'border-black ring-2 ring-black/20'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <img
                                src={image}
                                alt={`${productTitle} thumbnail ${index + 1}`}
                                className="w-full h-full object-contain p-2 bg-gray-50"
                            />
                        </button>
                    ))}
                </div>
            )}
            
            {/* Zoom Overlay */}
            {isZoomed && (
                <div
                    ref={zoomOverlayRef}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={handleZoomToggle}
                >
                    <div className="relative max-w-4xl max-h-full">
                        <img
                            src={imageArray[selectedImage]}
                            alt={`${productTitle} - Zoomed view`}
                            className="max-w-full max-h-full object-contain"
                            style={{
                                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                            }}
                        />
                        <button
                            onClick={handleZoomToggle}
                            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}