// src/components/ProductCard.jsx

import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/Redux/CartSlice';

// Define the props the component will accept
type ProductCardProps = {
    imageUrl: string;
    category?: string; // Optional, with a default value
    title: string;
    price: number;
    oldPrice?: number; // Optional prop for sales
    productUrl: string; // URL for the product page
};

export default function ProductCard({
                                        imageUrl,
                                        category = 'Collection', // Default category
                                        title,
                                        price,
                                        oldPrice,
                                        productUrl
                                    }: ProductCardProps) {

    const [isFavorited, setIsFavorited] = useState(false);
    const [buttonText, setButtonText] = useState('Add to Cart');
    const [isAdding, setIsAdding] = useState(false);

    // Check if the item is on sale
    const isSale = oldPrice && oldPrice > price;

    // Handle the favorite button click
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorited(!isFavorited);
    };

    const dispatch = useDispatch();

    // Handle the add to cart button click
    const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    setButtonText('Adding...');

    // Create product object
    const product = {
        id: Math.random(), // You should replace this with actual product ID
        image: imageUrl,
        title,
        price,
        category
    };

    // Dispatch action to add to cart
    dispatch(addToCart(product));

    setIsAdding(false);
    setButtonText('Added!');

    // Reset button text after 2 seconds
    setTimeout(() => setButtonText('Add to Cart'), 2000);
};

    return (
        // The main card container
        <div className="group relative w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">

            {/* Image Container - This aspect ratio fixes the image size */}
            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                {/* Clickable link just for the image */}
                <a href={productUrl} className="block">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        loading="lazy"
                    />
                </a>

                {/* Top Right Overlay: Category + Heart */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-xs font-medium text-gray-800">{category}</span>
                    <button
                        onClick={handleFavoriteClick}
                        className={`p-1.5 rounded-full transition-colors ${
                            isFavorited ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
                    </button>
                </div>

                {/* Sale Badge (Top Left) */}
                {isSale && (
                    <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        SALE
                    </div>
                )}
            </div>

            {/* Card Content Area */}
            <div className="p-4 sm:p-5">

                {/* FIX: Added h-12 to this wrapper.
          This div now has a fixed height of 3rem (48px), which is
          enough for 2 lines of text-base. This makes all cards the same height.
        */}
                <div className="h-12">
                    <a href={productUrl}>
                        {/* FIX: Changed text to text-base for a smaller, consistent size */}
                        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 transition-colors hover:text-[#FD3B3B]">
                            {title}
                        </h3>
                    </a>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-2 mb-4">
                    {/* FIX: Changed text to text-lg for a smaller, consistent size */}
                    <span className="text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
                    {isSale && (
                        // FIX: Changed text to text-xs for "smaller text"
                        <span className="text-xs text-gray-400 line-through">
              ${oldPrice.toFixed(2)}
            </span>
                    )}
                </div>

                {/* Action Buttons - Always visible */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding || buttonText === 'Added!'}
                        className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full text-sm font-medium transition-all duration-300
                        ${buttonText === 'Added!'
                            ? 'bg-green-600 text-white'
                            : 'bg-black text-white hover:bg-gray-800'
                        }
                        disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        <ShoppingBag size={16} />
                        {buttonText}
                    </button>

                    {/* View Button */}
                    <a
                        href={productUrl}
                        className="flex items-center justify-center gap-2 w-full bg-white text-black border-2 border-gray-300 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-100 hover:border-gray-400"
                    >
                        <Eye size={16} />
                        View
                    </a>
                </div>
            </div>
        </div>
    );
}