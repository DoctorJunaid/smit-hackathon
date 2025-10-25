import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingBag, Star, Minus, Plus, ArrowLeft, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { addToCart } from '@/Redux/CartSlice';
import { updateUserCart } from '@/Redux/UserSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from '@/Component/Navbar.jsx';
import Footer from '@/Component/Footer.jsx';
import LoadingSpinner from '@/Component/LoadingSpinner.jsx';
import ProductCard from '@/Component/Card.jsx';
import ProductImageGallery from '@/components/ProductImageGallery.jsx';
import ProductSpecs from '@/components/ProductSpecs.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import ProductDetailsSkeleton from '@/components/ProductDetailsSkeleton.jsx';
import { useGSAP, useScrollAnimation } from '@/hooks/useGSAP';
import { pageTransitions, scrollAnimations, interactiveAnimations, cartAnimations, productAnimations } from '@/utils/animations';
import { gsap } from 'gsap';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // State
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    
    // Animation refs
    const heroRef = useRef(null);
    const imageRef = useRef(null);
    const detailsRef = useRef(null);
    const quantityRef = useRef(null);
    const addToCartRef = useRef(null);
    const heartRef = useRef(null);
    const relatedRef = useRef(null);
    
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

    // Fetch product data
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                
                // Fetch main product
                const productResponse = await axios.get(`https://fakestoreapi.com/products/${id}`);
                const productData = productResponse.data;
                setProduct(productData);
                
                // Fetch related products from same category
                const relatedResponse = await axios.get(`https://fakestoreapi.com/products/category/${productData.category}`);
                const related = relatedResponse.data.filter(p => p.id !== parseInt(id)).slice(0, 4);
                setRelatedProducts(related);
                
            } catch (err) {
                setError('Failed to load product details');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductData();
        }
    }, [id]);

    // Page entrance animation
    useGSAP(() => {
        if (!loading && product && heroRef.current) {
            const tl = gsap.timeline();
            
            tl.fromTo(heroRef.current, 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            )
            .fromTo(imageRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
                "-=0.3"
            )
            .fromTo(detailsRef.current,
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
            );
            
            return tl;
        }
    }, [loading, product]);

    // Related products scroll animation
    useScrollAnimation((element) => {
        if (element && element.children.length > 0) {
            productAnimations.relatedProductsStagger(element.children);
        }
    }, [relatedProducts]);

    // Feature icons floating animation
    useEffect(() => {
        const featureIcons = document.querySelectorAll('.feature-icon');
        if (featureIcons.length > 0) {
            productAnimations.featureIconFloat(featureIcons);
        }
    }, [product]);

    // Handle quantity change
    const handleQuantityChange = (change) => {
        const newQuantity = Math.max(1, quantity + change);
        setQuantity(newQuantity);
        
        if (quantityRef.current) {
            productAnimations.quantityPulse(quantityRef.current);
        }
    };

    // Handle add to cart
    const handleAddToCart = async () => {
        if (!isAuthenticated || !currentUser) {
            toast.error('Please login to add items to cart');
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

    if (loading) {
        return (
            <>
                <Navbar />
                <ProductDetailsSkeleton />
                <Footer />
            </>
        );
    }

    if (error || !product) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                        <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
                        <button
                            onClick={() => navigate('/shop')}
                            className="bg-[#FD3B3B] text-white px-6 py-3 rounded-lg hover:bg-[#e02d2d] transition-colors"
                        >
                            Back to Shop
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            
            {/* Hero Section */}
            <section ref={heroRef} className="bg-white py-8 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <Breadcrumb 
                        items={[
                            { label: 'Shop', href: '/shop' },
                            { label: product.category, href: `/shop?category=${product.category}` },
                            { label: product.title.length > 30 ? product.title.substring(0, 30) + '...' : product.title }
                        ]}
                    />
                    
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/shop')}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#FD3B3B] transition-colors mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Shop
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Product Images */}
                        <div ref={imageRef}>
                            <ProductImageGallery 
                                images={[product.image]} 
                                productTitle={product.title}
                            />
                        </div>

                        {/* Product Details */}
                        <div ref={detailsRef} className="space-y-6">
                            {/* Category & Share */}
                            <div className="flex items-center justify-between">
                                <span className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full capitalize">
                                    {product.category}
                                </span>
                                <button className="p-2 text-gray-400 hover:text-[#FD3B3B] transition-colors">
                                    <Share2 size={20} />
                                </button>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                {product.title}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
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
                                <span className="text-gray-600">
                                    {product.rating?.rate || 4.0} ({product.rating?.count || 120} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Quantity Selector */}
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-4">
                                    <div ref={quantityRef} className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="p-3 hover:bg-gray-100 transition-colors"
                                            disabled={quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="px-4 py-3 font-medium min-w-[60px] text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="p-3 hover:bg-gray-100 transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    ref={addToCartRef}
                                    onClick={handleAddToCart}
                                    disabled={isAddingToCart || isInCart}
                                    className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium transition-all duration-200 ${
                                        isInCart
                                            ? 'bg-green-600 text-white cursor-default'
                                            : 'bg-black text-white hover:bg-gray-800 hover:scale-105'
                                    }`}
                                >
                                    <ShoppingBag size={20} />
                                    {isInCart ? 'In Cart' : isAddingToCart ? 'Adding...' : 'Add to Cart'}
                                </button>
                                
                                <button
                                    ref={heartRef}
                                    onClick={handleFavoriteToggle}
                                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                        isFavorited
                                            ? 'border-red-500 text-red-500 bg-red-50'
                                            : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                                    }`}
                                >
                                    <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
                                </button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-3 text-sm text-gray-600 group">
                                    <Truck size={20} className="text-[#FD3B3B] feature-icon group-hover:scale-110 transition-transform" />
                                    <span className="group-hover:text-gray-900 transition-colors">Free Shipping</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 group">
                                    <Shield size={20} className="text-[#FD3B3B] feature-icon group-hover:scale-110 transition-transform" />
                                    <span className="group-hover:text-gray-900 transition-colors">2 Year Warranty</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600 group">
                                    <RotateCcw size={20} className="text-[#FD3B3B] feature-icon group-hover:scale-110 transition-transform" />
                                    <span className="group-hover:text-gray-900 transition-colors">30 Day Returns</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Specifications */}
            <ProductSpecs product={product} />

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                            You Might Also Like
                        </h2>
                        <div ref={relatedRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard
                                    key={relatedProduct.id}
                                    imageUrl={relatedProduct.image}
                                    category={relatedProduct.category}
                                    title={relatedProduct.title}
                                    price={relatedProduct.price}
                                    productUrl={`/products/${relatedProduct.id}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </>
    );
}