// src/Component/ShopPage.jsx
import { useState, useEffect, useMemo } from 'react';
import ProductCard from "@/Component/Card";
import Navbar from "@/Component/Navbar.jsx";
import Footer from "@/Component/Footer.jsx";
import LoadingSpinner from "@/Component/LoadingSpinner.jsx";
import HeroBanner from "@/Component/HeroBanner.jsx";
import axios from "axios";
import { ChevronLeft, ChevronRight, Search, Filter, X } from 'lucide-react';

const DOTS = '...';

// --- Pagination Helper Hooks ---
const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({ totalPages, siblingCount = 1, currentPage }) => {
    const paginationRange = useMemo(() => {
        const totalPageNumbers = siblingCount + 5;
        if (totalPageNumbers >= totalPages) {
            return range(1, totalPages);
        }
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPages
        );
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);
            return [...leftRange, DOTS, totalPages];
        }
        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPages - rightItemCount + 1, totalPages);
            return [firstPageIndex, DOTS, ...rightRange];
        }
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [totalPages, siblingCount, currentPage]);

    return paginationRange;
};
// --- End Pagination Hooks ---

export default function ShopPage() {
    // API Data State
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Filter State
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFilter, setPriceFilter] = useState(300); // Default to 300
    const [maxPrice, setMaxPrice] = useState(300); // Default to 300

    // UI State
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false); // State for mobile filters

    // Pagination State
    const [itemsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch All Data on Mount
    useEffect(() => {
        setIsLoading(true);

        const fetchProducts = axios.get("https://fakestoreapi.com/products");
        const fetchCategories = axios.get("https://fakestoreapi.com/products/categories");

        Promise.all([fetchProducts, fetchCategories])
            .then(([productsResponse, categoriesResponse]) => {
                const products = productsResponse.data;
                // Set max price to 300 as requested
                setAllProducts(products);
                setCategories(['all', ...categoriesResponse.data]);
                setMaxPrice(300); // Explicitly set to 300
                setPriceFilter(300); // Explicitly set to 300
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setError("Failed to load products. Please try again later.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // 1. Calculate Filtered Products
    const filteredProducts = useMemo(() => {
        return allProducts
            .filter(product => {
                return selectedCategory === 'all' || product.category === selectedCategory;
            })
            .filter(product => {
                return product.title.toLowerCase().includes(searchTerm.toLowerCase());
            })
            .filter(product => {
                return product.price <= priceFilter;
            });
    }, [allProducts, selectedCategory, searchTerm, priceFilter]);

    // 2. Calculate Pagination based on Filtered Products
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginationRange = usePagination({
        currentPage,
        totalPages,
        siblingCount: 1
    });

    // 3. Get Items for Current Page
    const currentItems = useMemo(() => {
        const firstItemIndex = (currentPage - 1) * itemsPerPage;
        const lastItemIndex = firstItemIndex + itemsPerPage;
        return filteredProducts.slice(firstItemIndex, lastItemIndex);
    }, [currentPage, filteredProducts, itemsPerPage]);

    // 4. Handle Page Change
    const handlePageChange = (pageNumber) => {
        if (typeof pageNumber === 'number') {
            if (pageNumber > 0 && pageNumber <= totalPages) {
                setCurrentPage(pageNumber);
                window.scrollTo({ top: 400, behavior: 'smooth' });
            }
        }
    };

    // 5. Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchTerm, priceFilter]);

    // Apply custom styles based on user preferences
    const applyUserStyles = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            /* User preferred main color */
            .bg-accent-color { background-color: #000000; }
            .text-accent-color { color: #000000; }
            .border-accent-color { border-color: #000000; }
            .accent-color { accent-color: #000000; }
            
            /* Interactive button styles with color change animation */
            .btn-accent {
                background-color: #000000;
                transition: background-color 0.3s ease, transform 0.2s ease;
            }
            .btn-accent:hover {
                background-color: #333333;
                transform: scale(1.03);
            }
            .btn-accent-outline {
                border: 2px solid #000000;
                color: #000000;
                transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
            }
            .btn-accent-outline:hover {
                background-color: #000000;
                color: white;
                transform: scale(1.03);
            }
            
            /* Animated underline for category buttons */
            .category-btn {
                position: relative;
                overflow: hidden;
            }
            .category-btn::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 2px;
                background-color: #000000;
                transition: width 0.3s ease;
            }
            .category-btn:hover::after {
                width: 100%;
            }
            
            /* Responsive adjustments - keep desktop unchanged, enhance mobile/tablet */
            @media (max-width: 1024px) {
                .filter-section {
                    padding: 1rem;
                }
                .product-grid {
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    gap: 1rem;
                }
            }
            @media (max-width: 768px) {
                .product-grid {
                    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                    gap: 0.75rem;
                }
                .pagination-container {
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
            }
            @media (max-width: 640px) {
                .product-grid {
                    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                    gap: 0.5rem;
                }
            }
            
            /* Ensure pagination arrows are visible */
            .pagination-arrow {
                color: inherit;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
    };

    // Apply styles on component mount
    useEffect(() => {
        applyUserStyles();
    }, []);

    // Clear filters function
    const clearFilters = () => {
        setSelectedCategory('all');
        setSearchTerm('');
        setPriceFilter(300); // Reset to 300
    };

    return (
        <>
            <Navbar />
            <HeroBanner />

            <section className="bg-gray-50 py-16 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Collection</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Find your next favorite item. Use the filters below to narrow down your search.
                        </p>
                    </div>

                    {/* --- FILTER BAR --- */}
                    {/* Desktop Filters */}
                    <div className="hidden md:block bg-white p-6 rounded-xl shadow-lg mb-12 filter-section">
                        {/* Top Row: Search + Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                            {/* Search Bar */}
                            <div>
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                                    Search by name
                                </label>
                                <div className="relative">
                                    <input
                                        id="search"
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search for products..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-color"
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            {/* Price Slider */}
                            <div>
                                <label htmlFor="price-slider" className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Price: <span className="font-bold text-accent-color">${priceFilter}</span>
                                </label>
                                <input
                                    id="price-slider"
                                    type="range"
                                    min="0"
                                    max={maxPrice}
                                    value={priceFilter}
                                    onChange={(e) => setPriceFilter(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-color"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>$0</span>
                                    <span>${maxPrice}</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row: Categories + Clear Filters */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-sm font-medium text-gray-700">
                                    Filter by category
                                </label>
                                {(selectedCategory !== 'all' || searchTerm || priceFilter < maxPrice) && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-accent-color hover:underline flex items-center"
                                    >
                                        <X size={16} className="mr-1" /> Clear All
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 category-btn
                                            ${selectedCategory === category
                                            ? 'bg-accent-color text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }
                                        `}
                                    >
                                        <span className="capitalize">{category}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Filters Button */}
                    <div className="md:hidden mb-6">
                        <button
                            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-accent-color text-white rounded-lg btn-accent"
                        >
                            <Filter size={20} />
                            Filters
                        </button>
                    </div>

                    {/* Mobile Filters Panel */}
                    {mobileFiltersOpen && (
                        <div className="md:hidden bg-white p-6 rounded-xl shadow-lg mb-12 filter-section animate-fadeIn">
                            {/* Search Bar */}
                            <div className="mb-6">
                                <label htmlFor="mobile-search" className="block text-sm font-medium text-gray-700 mb-2">
                                    Search by name
                                </label>
                                <div className="relative">
                                    <input
                                        id="mobile-search"
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search for products..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-color"
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            {/* Price Slider */}
                            <div className="mb-6">
                                <label htmlFor="mobile-price-slider" className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Price: <span className="font-bold text-accent-color">${priceFilter}</span>
                                </label>
                                <input
                                    id="mobile-price-slider"
                                    type="range"
                                    min="0"
                                    max={maxPrice}
                                    value={priceFilter}
                                    onChange={(e) => setPriceFilter(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-color"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>$0</span>
                                    <span>${maxPrice}</span>
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Filter by category
                                    </label>
                                    {(selectedCategory !== 'all' || searchTerm || priceFilter < maxPrice) && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm text-accent-color hover:underline flex items-center"
                                        >
                                            <X size={16} className="mr-1" /> Clear All
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => {
                                                setSelectedCategory(category);
                                                setMobileFiltersOpen(false); // Close after selection on mobile
                                            }}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 category-btn
                                                ${selectedCategory === category
                                                ? 'bg-accent-color text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }
                                            `}
                                        >
                                            <span className="capitalize">{category}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Close Button */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}

                    {/* --- Loading / Error / Content --- */}
                    {isLoading ? (
                        <div className="flex justify-center items-center min-h-[400px]">
                            <LoadingSpinner />
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-20">
                            <h3 className="text-xl font-semibold mb-2">Error Loading Products</h3>
                            <p>{error}</p>
                        </div>
                    ) : currentItems.length === 0 ? (
                        <div className="text-center text-gray-500 py-20">
                            <h3 className="text-2xl font-semibold mb-2">No Products Found</h3>
                            <p>Try adjusting your search or filters.</p>
                            {(selectedCategory !== 'all' || searchTerm || priceFilter < maxPrice) && (
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 text-accent-color hover:underline"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* --- Product Grid --- */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 product-grid">
                                {currentItems.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        imageUrl={product.image}
                                        category={product.category}
                                        title={product.title}
                                        price={product.price}
                                        productUrl={`/products/${product.id}`}
                                    />
                                ))}
                            </div>

                            {/* --- PAGINATION UI --- */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-16 pagination-container">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="pagination-arrow flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-600 border border-gray-300 transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="Go to previous page"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>

                                    {paginationRange.map((page, index) => {
                                        if (page === DOTS) {
                                            return <span key={index} className="flex items-center justify-center w-10 h-10 text-gray-400">...</span>;
                                        }
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handlePageChange(page)}
                                                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all ${
                                                    currentPage === page
                                                        ? 'bg-accent-color text-white'
                                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="pagination-arrow flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-600 border border-gray-300 transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                        aria-label="Go to next page"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}