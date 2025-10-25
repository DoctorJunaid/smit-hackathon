import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, Info, Star, Award, Truck, Shield, RotateCcw } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useGSAP';
import { scrollAnimations } from '@/utils/animations';
import { gsap } from 'gsap';

export default function ProductSpecs({ product }) {
    const [activeTab, setActiveTab] = useState('description');
    const [expandedSection, setExpandedSection] = useState(null);
    
    const specsRef = useRef(null);
    const tabContentRef = useRef(null);
    
    // Scroll animation for the specs section
    useScrollAnimation((element) => {
        scrollAnimations.fadeInUp(element);
    }, []);
    
    const tabs = [
        { id: 'description', label: 'Description', icon: Info },
        { id: 'specifications', label: 'Specifications', icon: Award },
        { id: 'reviews', label: 'Reviews', icon: Star },
        { id: 'shipping', label: 'Shipping & Returns', icon: Truck }
    ];
    
    const handleTabChange = (tabId) => {
        if (tabId === activeTab) return;
        
        // Animate tab content change
        if (tabContentRef.current) {
            gsap.to(tabContentRef.current, {
                opacity: 0,
                y: 10,
                duration: 0.2,
                ease: "power2.out",
                onComplete: () => {
                    setActiveTab(tabId);
                    gsap.to(tabContentRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        }
    };
    
    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };
    
    // Generate mock specifications based on category
    const generateSpecs = (category) => {
        const baseSpecs = {
            'Brand': 'Premium Collection',
            'Model': product.title.split(' ').slice(0, 2).join(' '),
            'Category': product.category,
            'Rating': `${product.rating?.rate || 4.0}/5.0`,
            'Reviews': `${product.rating?.count || 120} customer reviews`
        };
        
        const categorySpecs = {
            electronics: {
                'Warranty': '2 Years International',
                'Power': 'AC/DC Compatible',
                'Connectivity': 'Bluetooth, WiFi',
                'Compatibility': 'Universal'
            },
            clothing: {
                'Material': '100% Premium Cotton',
                'Care': 'Machine Washable',
                'Fit': 'Regular Fit',
                'Origin': 'Imported'
            },
            jewelery: {
                'Material': 'Sterling Silver',
                'Finish': 'Polished',
                'Care': 'Clean with soft cloth',
                'Packaging': 'Gift Box Included'
            }
        };
        
        return {
            ...baseSpecs,
            ...(categorySpecs[category] || categorySpecs.electronics)
        };
    };
    
    const specifications = generateSpecs(product.category);
    
    const renderTabContent = () => {
        switch (activeTab) {
            case 'description':
                return (
                    <div className="space-y-4">
                        <p className="text-gray-700 leading-relaxed">
                            {product.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <Shield className="w-8 h-8 text-[#FD3B3B] mx-auto mb-2" />
                                <h4 className="font-medium text-gray-900">Quality Assured</h4>
                                <p className="text-sm text-gray-600">Premium materials and craftsmanship</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <Award className="w-8 h-8 text-[#FD3B3B] mx-auto mb-2" />
                                <h4 className="font-medium text-gray-900">Award Winning</h4>
                                <p className="text-sm text-gray-600">Recognized for excellence</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                                <Star className="w-8 h-8 text-[#FD3B3B] mx-auto mb-2" />
                                <h4 className="font-medium text-gray-900">Top Rated</h4>
                                <p className="text-sm text-gray-600">Loved by customers worldwide</p>
                            </div>
                        </div>
                    </div>
                );
                
            case 'specifications':
                return (
                    <div className="space-y-3">
                        {Object.entries(specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                                <span className="font-medium text-gray-900">{key}</span>
                                <span className="text-gray-600">{value}</span>
                            </div>
                        ))}
                    </div>
                );
                
            case 'reviews':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl font-bold text-gray-900">
                                {product.rating?.rate || 4.0}
                            </div>
                            <div>
                                <div className="flex items-center mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            className={`${
                                                i < Math.floor(product.rating?.rate || 4)
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600">
                                    Based on {product.rating?.count || 120} reviews
                                </p>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center gap-3">
                                    <span className="text-sm font-medium w-8">{rating}★</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-yellow-400 h-2 rounded-full"
                                            style={{
                                                width: `${rating === 5 ? 60 : rating === 4 ? 25 : rating === 3 ? 10 : rating === 2 ? 3 : 2}%`
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600 w-12">
                                        {rating === 5 ? '60%' : rating === 4 ? '25%' : rating === 3 ? '10%' : rating === 2 ? '3%' : '2%'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
                
            case 'shipping':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Truck className="w-5 h-5 text-[#FD3B3B]" />
                                    Shipping Information
                                </h4>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Free standard shipping on orders over $50</li>
                                    <li>• Express shipping available</li>
                                    <li>• International shipping to 50+ countries</li>
                                    <li>• Estimated delivery: 3-7 business days</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <RotateCcw className="w-5 h-5 text-[#FD3B3B]" />
                                    Returns & Exchanges
                                </h4>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• 30-day return policy</li>
                                    <li>• Free returns on defective items</li>
                                    <li>• Easy online return process</li>
                                    <li>• Refund processed within 5-7 business days</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
                
            default:
                return null;
        }
    };
    
    return (
        <section ref={specsRef} className="bg-white py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200 mb-8">
                    <nav className="flex space-x-8 overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-[#FD3B3B] text-[#FD3B3B]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
                
                {/* Tab Content */}
                <div ref={tabContentRef} className="min-h-[300px]">
                    {renderTabContent()}
                </div>
            </div>
        </section>
    );
}