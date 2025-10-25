// src/components/ProductSection.jsx
import { useState, useEffect, useMemo } from 'react';
import ProductCard from "@/Component/Card"; // Your import path
import axios from "axios";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DOTS = '...';

/**
 * Helper function to create a range of numbers
 * FIXED: Removed ": number" types
 */
const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * Custom hook to create the smart pagination range
 */
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

export default function ProductSection() {
    const [productItems, setProductItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [itemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        axios.get("https://fakestoreapi.com/products")
            .then(response => {
                setProductItems(response.data);
                setTotalPages(Math.ceil(response.data.length / itemsPerPage));
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setIsLoading(false);
            });
    }, [itemsPerPage]);

    const paginationRange = usePagination({
        currentPage,
        totalPages,
        siblingCount: 1
    });

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = productItems.slice(firstItemIndex, lastItemIndex);

    /**
     * FIXED: Removed ": number | string" types
     */
    const handlePageChange = (pageNumber) => {
        if (typeof pageNumber === 'number') {
            if (pageNumber > 0 && pageNumber <= totalPages) {
                setCurrentPage(pageNumber);
                window.scrollTo(0, 0);
            }
        }
    };

    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Explore Our Collection</h2>

                {isLoading ? (
                    <div className="text-center text-gray-500">Loading products...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                )}

                {/* --- PAGINATION UI --- */}
                {!isLoading && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-16">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-600 border border-gray-300 transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Go to previous page"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Page Numbers */}
                        {paginationRange.map((page, index) => {
                            if (page === DOTS) {
                                return (
                                    <span key={index} className="flex items-center justify-center w-10 h-10 text-gray-400">
                                        ...
                                    </span>
                                );
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(page)}
                                    className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all
                                        ${currentPage === page
                                        ? 'bg-black text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-600 border border-gray-300 transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Go to next page"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}