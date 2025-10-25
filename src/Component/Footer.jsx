import { useState, useEffect } from 'react';

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const footerElement = document.getElementById('footer-section');
        if (footerElement) {
            observer.observe(footerElement);
        }

        return () => {
            if (footerElement) {
                observer.unobserve(footerElement);
            }
        };
    }, []);

    return (
        <footer id="footer-section" className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-16">
                {/* Top Section */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}>
                    
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-light tracking-wider group cursor-pointer inline-block">
                            <span className="relative">
                                ATHLEISURE
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FD3B3B] transition-all duration-500 group-hover:w-full"></span>
                            </span>
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Premium athletic wear designed for movement, crafted for style. Elevate every workout, every day.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {[
                                { name: 'Instagram', icon: 'IG' },
                                { name: 'Facebook', icon: 'FB' },
                                { name: 'Twitter', icon: 'TW' },
                                { name: 'YouTube', icon: 'YT' }
                            ].map((social, idx) => (
                                <button
                                    key={social.name}
                                    className="group relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 overflow-hidden"
                                    style={{ transitionDelay: `${idx * 100}ms` }}
                                    aria-label={social.name}
                                >
                                    <span className="relative z-10 text-xs font-bold transition-colors duration-300 group-hover:text-white">{social.icon}</span>
                                    <span className="absolute inset-0 bg-[#FD3B3B] transform scale-0 transition-transform duration-300 ease-out group-hover:scale-100 rounded-full"></span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div className={`space-y-4 transform transition-all duration-1000 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`} style={{ transitionDelay: '200ms' }}>
                        <h3 className="text-lg font-medium tracking-wider mb-6">SHOP</h3>
                        <ul className="space-y-3">
                            {['New Arrivals', 'Women', 'Men', 'Accessories', 'Sale'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="group relative inline-block text-gray-400 text-sm transition-colors duration-300">
                                        <span className="relative">
                                            {item}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FD3B3B] transition-all duration-300 group-hover:w-full"></span>
                                        </span>
                                        <span className="inline-block ml-1 transform transition-transform duration-300 group-hover:translate-x-1 opacity-0 group-hover:opacity-100">→</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div className={`space-y-4 transform transition-all duration-1000 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`} style={{ transitionDelay: '300ms' }}>
                        <h3 className="text-lg font-medium tracking-wider mb-6">SUPPORT</h3>
                        <ul className="space-y-3">
                            {['Contact Us', 'Shipping Info', 'Returns', 'Size Guide', 'FAQ'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="group relative inline-block text-gray-400 text-sm transition-colors duration-300">
                                        <span className="relative">
                                            {item}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FD3B3B] transition-all duration-300 group-hover:w-full"></span>
                                        </span>
                                        <span className="inline-block ml-1 transform transition-transform duration-300 group-hover:translate-x-1 opacity-0 group-hover:opacity-100">→</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className={`space-y-4 transform transition-all duration-1000 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`} style={{ transitionDelay: '400ms' }}>
                        <h3 className="text-lg font-medium tracking-wider mb-6">STAY UPDATED</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe for exclusive offers and early access to new collections.
                        </p>
                        <div className="space-y-3">
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#FD3B3B] focus:bg-white/15 transition-all duration-300"
                                />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FD3B3B]/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"></div>
                            </div>
                            <button className="group relative overflow-hidden w-full bg-white text-black px-6 py-3 rounded-full text-sm font-medium tracking-wider transition-all duration-300 hover:shadow-2xl hover:shadow-[#FD3B3B]/30 hover:-translate-y-0.5">
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300">SUBSCRIBE</span>
                                <span className="absolute inset-0 z-0 bg-[#FD3B3B] transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Divider with animated gradient */}
                <div className="relative mb-8 h-px overflow-hidden">
                    <div className={`absolute inset-0 bg-white/10 transform transition-all duration-1000 ${
                        isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                    }`} style={{ transitionDelay: '600ms' }}></div>
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#FD3B3B] to-transparent transform transition-all duration-1000 ${
                        isVisible ? 'translate-x-0 opacity-50' : '-translate-x-full opacity-0'
                    }`} style={{ transitionDelay: '800ms' }}></div>
                </div>

                {/* Bottom Section */}
                <div className={`flex flex-col md:flex-row justify-between items-center gap-6 transform transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`} style={{ transitionDelay: '700ms' }}>
                    
                    {/* Copyright */}
                    <p className="text-gray-400 text-sm text-center md:text-left">
                        © 2025 Athleisure. All rights reserved. Designed for <span className="relative group cursor-pointer inline-block">
                            <span className="group-hover:text-[#FD3B3B] transition-colors duration-300">movement</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FD3B3B] transition-all duration-300 group-hover:w-full"></span>
                        </span>.
                    </p>

                    {/* Payment Methods */}
                    <div className="flex gap-3">
                        {['VISA', 'MC', 'AMEX', 'PP'].map((payment, idx) => (
                            <div
                                key={payment}
                                className="group relative bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-xs font-bold tracking-wider cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105"
                                style={{ transitionDelay: `${800 + idx * 50}ms` }}
                            >
                                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">{payment}</span>
                                <span className="absolute inset-0 bg-white/20 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></span>
                            </div>
                        ))}
                    </div>

                    {/* Legal Links */}
                    <div className="flex gap-6 text-sm">
                        {['Privacy Policy', 'Terms of Service'].map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="group relative text-gray-400 transition-colors duration-300"
                            >
                                <span className="relative">
                                    {link}
                                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#FD3B3B] transition-all duration-300 group-hover:w-full"></span>
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Floating Badge with pulse effect */}
                <div className={`absolute bottom-8 right-8 transform transition-all duration-1000 ${
                    isVisible ? 'rotate-12 opacity-100' : 'rotate-45 opacity-0'
                }`} style={{ transitionDelay: '900ms' }}>
                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-[#FD3B3B] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse"></div>
                        <div className="relative bg-[#FD3B3B] text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110">
                            FREE SHIPPING
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}