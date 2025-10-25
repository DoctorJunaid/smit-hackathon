import { useState, useRef, useEffect } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/Redux/CartSlice';
import { updateUserCart } from '@/Redux/UserSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useHoverAnimation, useScrollAnimation } from '@/hooks/useGSAP';
import { interactiveAnimations, cartAnimations, scrollAnimations } from '@/utils/animations';

export default function ProductCard({
    imageUrl,
    category = 'Collection',
    title,
    price,
    oldPrice,
    productUrl
}) {
    const [isFavorited, setIsFavorited] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Animation refs
    const cardRef = useRef(null);
    const imageRef = useRef(null);
    const heartRef = useRef(null);
    const addToCartRef = useRef(null);
    const saleBadgeRef = useRef(null);
    
    // Safely access cart items with a default empty array
    const cartItems = useSelector(state => state.cart?.items || []);
    
    // Safely access user state with defaults
    const userState = useSelector(state => state.user || {});
    const isAuthenticated = userState.isAuthenticated || false;
    const currentUser = userState.currentUser || null;

    // Check if the item is on sale
    const isSale = oldPrice && oldPrice > price;

    // Check if the product is in cart (more robust check)
    const isInCart = Array.isArray(cartItems) && cartItems.some(item => 
        item?.title === title && 
        item?.price === price &&
        item?.userId === currentUser?.id
    );

    // Handle the favorite button click with animation
    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorited(!isFavorited);
        
        if (heartRef.current) {
            interactiveAnimations.pulse(heartRef.current);
        }
    };

    // Handle the add to cart button click
    const handleAddToCart = async (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Check authentication first
        if (!isAuthenticated || !currentUser) {
            toast.error('Please login to add items to cart');
            navigate('/auth');
            return;
        }
        
        // Check if already in cart
        if (isInCart) {
            toast.info('Product is already in cart!');
            return;
        }

        // Prevent multiple rapid clicks
        if (isAddingToCart) {
            return;
        }

        setIsAddingToCart(true);

        try {
            const product = {
                image: imageUrl,
                title: title,
                price: parseFloat(price),
                category: category,
                userId: currentUser.id
            };

            console.log('Adding product to cart:', product);
            console.log('Current user:', currentUser);
            console.log('Current cart items:', cartItems);

            // Add to cart
            dispatch(addToCart({ product, userId: currentUser.id }));
            
            // Update user's cart in user slice
            const updatedCart = [...cartItems, { ...product, quantity: 1, id: `${title}-${Date.now()}` }];
            dispatch(updateUserCart({ 
                userId: currentUser.id, 
                cart: updatedCart 
            }));
            
            console.log('Updated cart:', updatedCart);
            toast.success('Product added to cart!');
            
            // Animate add to cart button
            if (addToCartRef.current) {
                cartAnimations.addToCart(addToCartRef.current);
            }
            
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add product to cart. Please try again.');
        } finally {
            setIsAddingToCart(false);
        }
    };

    return (
        <div 
            ref={cardRef}
            className="group relative w-full max-w-xs bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
            {/* Image Container - Reduced aspect ratio for smaller cards */}
            <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-t-lg">
                {/* Clickable link just for the image */}
                <a href={productUrl} className="block">
                    <img
                        ref={imageRef}
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                </a>

                {/* Top Right Overlay: Category + Heart */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-xs font-medium text-gray-800">{category}</span>
                    <button
                        onClick={handleFavoriteClick}
                        className={`p-1.5 rounded-full transition-colors duration-200 ${
                            isFavorited ? 'text-black' : 'text-gray-600 hover:text-black'
                        }`}
                        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Heart 
                            ref={heartRef}
                            size={16} 
                            fill={isFavorited ? 'currentColor' : 'none'} 
                        />
                    </button>
                </div>

                {/* Sale Badge (Top Left) */}
                {isSale && (
                    <div 
                        ref={saleBadgeRef}
                        className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full"
                    >
                        SALE
                    </div>
                )}
            </div>

            {/* Card Content Area - Reduced padding */}
            <div className="p-3 sm:p-4">
                {/* Product Title - Reduced height */}
                <div className="h-10">
                    <a href={productUrl}>
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 transition-colors hover:text-[#FD3B3B]">
                            {title}
                        </h3>
                    </a>
                </div>

                {/* Price - Reduced spacing */}
                <div className="flex items-baseline gap-2 mt-1 mb-3">
                    <span className="text-base font-bold text-gray-900">
                        ${price.toFixed(2)}
                    </span>
                    {isSale && (
                        <span className="text-xs text-gray-400 line-through">
                            ${oldPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Action Buttons - Smaller buttons */}
                <div className="grid grid-cols-2 gap-2">
                    {/* Add to Cart Button */}
                    <button
                        ref={addToCartRef}
                        onClick={handleAddToCart}
                        className={`flex items-center justify-center gap-1 w-full px-3 py-2 rounded-full text-xs font-medium transition-colors duration-200
                            ${isInCart 
                                ? 'bg-green-600 text-white cursor-default'
                                : 'bg-black text-white hover:bg-gray-800'
                            }`}
                    >
                        <ShoppingBag size={14} className={isInCart ? 'text-white' : 'text-white'} />
                        <span className={isInCart ? 'text-white' : 'text-white'}>
                            {isInCart ? 'In Cart' : 'Add'}
                        </span>
                    </button>

                    {/* View Button */}
                    <a
                        href={productUrl}
                        className="flex items-center justify-center gap-1 w-full bg-white text-black border-2 border-gray-300 px-3 py-2 rounded-full text-xs font-medium transition-colors duration-200 hover:bg-gray-100 hover:border-gray-400"
                    >
                        <Eye size={14} className="text-black" />
                        <span className="text-black">View</span>
                    </a>
                </div>
            </div>
        </div>
    );
}