import { useState, useRef, useEffect } from 'react';
import { X, Heart, ShoppingBag, Star, Minus, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/Redux/CartSlice';
import { updateUserCart } from '@/Redux/UserSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@/hooks/useGSAP';
import { interactiveAnimations, cartAnimations } from '@/utils/animations';

export default function QuickViewModal({ product, isOpen, onClose }) {
    const [quantity, setQuantity] = useState(1);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const addToCartRef = useRef(null);
    const heartRef = useRef(null);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Redux state
    const cartItems = useSelector(state => state.cart?.items || []);
    const userState = useSelector(state => state.user || {});
    const isAuthenticated = userState.isAuthenticated || false;
    const currentUser = userState.currentUser || null;
    
    // Check if product is in cart
    const isInCart = Array.isArray(cartItems) && cartItems.some(item => 
        item?.title === product?.title && 
        item?.price === product?.price &&
        item?.userId === currentUser?.id
    );
    
    // Modal animation
    useGSAP(() => {
        if (isOpen && modalRef.current && overlayRef.current && contentRef.current) {
            const tl = gsap.timeline();
            
            // Show overlay
            tl.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            )
            // Show modal content
            .fromTo(contentRef.current,
                { opacity: 0, scale: 0.8, y: 50 },
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
                scale: 0.8,
                y: 50,
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
    
    // Handle quantity change
    const handleQuantityChange = (change) => {
        const newQuantity = Math.max(1, quantity + change);
        setQuantity(newQuantity);
    };
    
    // Handle add to cart
    const handleAddToCart = async () => {
        if (!isAuthenticated || !currentUser) {
            toast.error('Please login to add items to cart');
            handleClose();
            navigate('/auth');
            return;
        }
        
        if (isInCart) {
            toast.info('Product is already in cart!');
            return;
        }

        if (isAddingToCart) return;

        setIsAddingToCart(true);

        try {
            const productToAdd = {
                image: product.image,
                title: product.title,
                price: parseFloat(product.price),
                category: product.category,
                quantity: quantity,
                userId: currentUser.id
            };

            dispatch(addToCart({ product: productToAdd, userId: currentUser.id }));
            
            const updatedCart = [...cartItems, { ...productToAdd, id: `${product.title}-${Date.now()}` }];
            dispatch(updateUserCart({ 
                userId: currentUser.id, 
                cart: updatedCart 
            }));
            
            toast.success(`${quantity} item(s) added to cart!`);
            
            if (addToCartRef.current) {
                cartAnimations.addToCart(addToCartRef.current);
            }
            
            // Close modal after successful add
            setTimeout(handleClose, 1000);
            
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add product to cart');
        } finally {
            setIsAddingToCart(false);
        }
    };
    
    // Handle favorite toggle
    const handleFavoriteToggle = () => {
        setIsFavorited(!isFavorited);
        if (heartRef.current) {
            interactiveAnimations.pulse(heartRef.current);
        }
    };
    
    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    
    if (!isOpen || !product) return null;
    
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
                className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                    <X size={20} />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
                    {/* Product Image */}
                    <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain p-6"
                        />
                    </div>
                    
                    {/* Product Details */}
                    <div className="space-y-6">
                        {/* Category */}
                        <span className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full capitalize">
                            {product.category}
                        </span>
                        
                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                            {product.title}
                        </h2>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={`${
                                            i < Math.floor(product.rating?.rate || 4)
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                                {product.rating?.rate || 4.0} ({product.rating?.count || 120} reviews)
                            </span>
                        </div>
                        
                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-gray-900">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed line-clamp-3">
                            {product.description}
                        </p>
                        
                        {/* Quantity Selector */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Quantity
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="p-2 hover:bg-gray-100 transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="px-4 py-2 font-medium min-w-[50px] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="p-2 hover:bg-gray-100 transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                ref={addToCartRef}
                                onClick={handleAddToCart}
                                disabled={isAddingToCart || isInCart}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                                    isInCart
                                        ? 'bg-green-600 text-white cursor-default'
                                        : 'bg-black text-white hover:bg-gray-800 hover:scale-105'
                                }`}
                            >
                                <ShoppingBag size={18} />
                                {isInCart ? 'In Cart' : isAddingToCart ? 'Adding...' : 'Add to Cart'}
                            </button>
                            
                            <button
                                ref={heartRef}
                                onClick={handleFavoriteToggle}
                                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                                    isFavorited
                                        ? 'border-red-500 text-red-500 bg-red-50'
                                        : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                                }`}
                            >
                                <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
                            </button>
                        </div>
                        
                        {/* View Full Details */}
                        <button
                            onClick={() => {
                                handleClose();
                                navigate(`/products/${product.id}`);
                            }}
                            className="w-full text-center text-[#FD3B3B] hover:underline font-medium"
                        >
                            View Full Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}