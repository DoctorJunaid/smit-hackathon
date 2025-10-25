import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { heroAnimations } from '@/utils/animations';
import VideoPlayerModal from '@/components/VideoPlayerModal';
import Tooltip from "./Tooltip.jsx";

export default function Hero() {
    const [currentImage, setCurrentImage] = useState(0);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    // Animation refs
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descriptionRef = useRef(null);
    const buttonsRef = useRef(null);
    const imageRef = useRef(null);
    const badgesRef = useRef([]);
    const backgroundRef = useRef(null);

    // YouTube video ID - Using a known working video for testing
    const videoId = "dQw4w9WgXcQ"; // Rick Astley - Never Gonna Give You Up (known working video)

    const images = [
        'https://images.unsplash.com/photo-1544441893-675973e31985?w=1200&h=800&fit=crop', // Main hero image
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=800&fit=crop', // Lifestyle shot
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=800&fit=crop'  // Shopping/sale context
    ];

    const handleVideoPlay = () => {
        console.log('Opening video modal with ID:', videoId);
        setIsVideoModalOpen(true);
    };

    const handleVideoClose = () => {
        setIsVideoModalOpen(false);
    };

    useEffect(() => {
        // Create a master timeline for coordinated animations
        const tl = gsap.timeline();

        // Animate title elements with improved timing
        if (titleRef.current && subtitleRef.current) {
            tl.fromTo([titleRef.current, subtitleRef.current],
                { opacity: 0, y: 60, rotationX: -15 },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out"
                }
            );
        }

        // Animate description with better timing
        if (descriptionRef.current) {
            tl.fromTo(descriptionRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                "-=0.6"
            );
        }

        // Animate buttons with enhanced visibility
        if (buttonsRef.current) {
            const buttons = buttonsRef.current.querySelectorAll('a');
            tl.fromTo(buttons,
                { opacity: 0, y: 40, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "back.out(1.2)"
                },
                "-=0.4"
            );
        }

        // Animate image with improved reveal
        if (imageRef.current) {
            tl.fromTo(imageRef.current,
                { opacity: 0, scale: 1.1, rotationY: -10 },
                {
                    opacity: 1,
                    scale: 1,
                    rotationY: 0,
                    duration: 1.4,
                    ease: "power2.out"
                },
                "-=1.0"
            );
        }

        // Animate floating badges with better coordination
        if (badgesRef.current.length > 0) {
            const badges = badgesRef.current.filter(Boolean);
            tl.fromTo(badges,
                { opacity: 0, scale: 0, rotation: -45 },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 12,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "back.out(1.4)"
                },
                "-=0.8"
            );

            // Add continuous floating animation
            badges.forEach((badge, index) => {
                gsap.to(badge, {
                    y: -10,
                    duration: 2 + (index * 0.3),
                    yoyo: true,
                    repeat: -1,
                    ease: "power2.inOut",
                    delay: 2 + (index * 0.2)
                });
            });
        }

        // Optimized parallax background
        if (backgroundRef.current) {
            gsap.to(backgroundRef.current, {
                yPercent: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: backgroundRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        }

        // Set up the image carousel interval
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000); // Increased to 5 seconds for better UX

        return () => {
            clearInterval(interval);
            tl.kill(); // Clean up timeline
        };
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 overflow-hidden">
                {/* Background Pattern */}
                <div ref={backgroundRef} className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-16 w-full">
                    {/* Main Content */}
                    <div className="text-center mb-12">
                        <div className="overflow-hidden">
                            <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-4 opacity-0">
                                GEAR UP EVERY SEASON
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h2 ref={subtitleRef} className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-8 opacity-0">
                                EVERY <span className="italic font-serif">WORKOUT</span>
                            </h2>
                        </div>

                        <p ref={descriptionRef} className="text-gray-600 text-lg max-w-2xl mx-auto mb-8 opacity-0">
                            Step into effortless movement and wear in all of motion. Our athleisure range is perfect for those city-outdoor workouts.
                        </p>

                        {/* --- ENHANCED BUTTONS SECTION --- */}
                        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">

                            {/* Primary Button - Link to Shop */}
                            <Link 
                                to="/shop"
                                className="group relative overflow-hidden bg-black text-white px-10 py-4 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:shadow-xl hover:scale-105 inline-flex items-center justify-center"
                            >
                                {/* Text is z-10 to stay on top */}
                                <span className="relative z-10 text-white">SHOP NOW</span>
                                {/* Animation layer is z-0, slides in from left */}
                                <span className="absolute inset-0 z-0 bg-red-500 transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
                            </Link>

                            {/* Secondary Button - Link to About */}
                            <Link 
                                to="/about"
                                className="group relative overflow-hidden border-2 border-black text-black px-10 py-4 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:shadow-xl hover:scale-105 inline-flex items-center justify-center"
                            >
                                {/* Text is z-10 to stay on top */}
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300">EXPLORE MORE</span>
                                {/* Animation layer is z-0, slides in from left */}
                                <span className="absolute inset-0 z-0 bg-black transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
                            </Link>

                        </div>
                    </div>

                    {/* Hero Image Carousel */}
                    <div className="relative w-full max-w-6xl mx-auto">
                        <div ref={imageRef} className="relative overflow-hidden rounded-3xl shadow-2xl opacity-0">

                            {/* This maps over the images and renders them on top of each other */}
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Model ${idx + 1}`}
                                    className={`w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover transition-all duration-1000 ${currentImage === idx
                                        ? 'opacity-100 scale-100' // Active image
                                        : 'opacity-0 scale-110 absolute inset-0' // Inactive images
                                        }`}
                                />
                            ))}

                            {/* Image Indicators */}
                            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImage(idx)} // Allows user to click to change image
                                        className={`h-2 rounded-full transition-all duration-300 ${currentImage === idx
                                            ? 'bg-white w-12' // Active indicator
                                            : 'bg-white/50 hover:bg-white/75 w-2' // Inactive indicator
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Floating Badges */}
                            <div ref={el => badgesRef.current[0] = el} className="absolute top-6 right-6 bg-red-500 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg opacity-0">
                                NEW ARRIVALS
                            </div>

                            <div ref={el => badgesRef.current[1] = el} className="absolute top-6 left-6 bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-full opacity-0">
                                Limited Edition
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Second Section - Video & Stats */}
            <section className="min-h-screen bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Video Section */}
                        <div className="order-2 lg:order-1">
                            <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
                                <div className="aspect-[4/5] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden group">
                                    {/* Subtle decorative gradient on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Faded background image */}
                                    <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=800&fit=crop)' }}></div>

                                    {/* Play Button */}
                                    <button
                                        onClick={handleVideoPlay}
                                        className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl z-10 hover:bg-gray-50"
                                        aria-label="Play video"
                                    >
                                        <div className="w-0 h-0 border-t-12 border-t-transparent border-l-18 border-l-black border-b-12 border-b-transparent ml-1"></div>
                                    </button>

                                    {/* Hover border effect */}
                                    <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 rounded-3xl transition-all duration-500"></div>

                                    {/* LIVE Badge */}
                                    <div className="absolute top-6 left-6 bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full animate-pulse">
                                        LIVE
                                    </div>
                                </div>
                                <div className="p-8 text-center">
                                    <h3 className="text-white text-xl font-bold tracking-wider mb-2">WATCH OUR COLLECTION</h3>
                                    <p className="text-gray-300 text-sm font-medium">See our latest styles in action</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats & Info Section */}
                        <div className="order-1 lg:order-2 space-y-8">
                            <div>
                                { /* Removed the "Power" typo */}
                                <h3 className="text-4xl lg:text-5xl font-light tracking-tight mb-4">
                                    Experience The <span className="italic font-serif">Difference</span>
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Join thousands of satisfied customers who have transformed their workout experience with our premium athleisure collection.
                                </p>
                            </div>

                            {/* Testimonial */}
                            <Tooltip />
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Player Modal */}
            <VideoPlayerModal
                isOpen={isVideoModalOpen}
                onClose={handleVideoClose}
                videoId={videoId}
                title="MyMart Collection Showcase"
            />
        </>
    );
}