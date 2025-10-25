import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { gsap } from 'gsap';

export default function Breadcrumb({ items }) {
    const breadcrumbRef = useRef(null);
    
    // Entrance animation
    useGSAP(() => {
        if (breadcrumbRef.current) {
            gsap.fromTo(breadcrumbRef.current.children,
                { opacity: 0, x: -10 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 0.4, 
                    stagger: 0.1, 
                    ease: "power2.out" 
                }
            );
        }
    }, [items]);
    
    return (
        <nav ref={breadcrumbRef} className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link 
                to="/" 
                className="flex items-center hover:text-[#FD3B3B] transition-colors group"
            >
                <Home size={16} className="group-hover:scale-110 transition-transform" />
            </Link>
            
            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <ChevronRight size={16} className="text-gray-400" />
                    {item.href ? (
                        <Link 
                            to={item.href} 
                            className="hover:text-[#FD3B3B] transition-colors capitalize hover:underline"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 font-medium capitalize">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}