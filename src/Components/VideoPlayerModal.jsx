import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function VideoPlayerModal({ isOpen, onClose, videoId, title = "Video Player" }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [modalStyle, setModalStyle] = useState({});
    const modalRef = useRef(null);

    // YouTube embed URL
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&enablejsapi=1&playsinline=1` : null;

    // Calculate optimal modal size and position
    const calculateModalDimensions = () => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate maximum dimensions with padding
        const maxWidth = Math.min(viewportWidth - 40, 1200); // 20px padding on each side, max 1200px
        const maxHeight = viewportHeight - 100; // 50px padding top/bottom

        // Calculate height based on 16:9 aspect ratio + header height
        const headerHeight = 72; // Header height including padding and border
        const videoHeight = (maxWidth * 9) / 16;
        const totalHeight = videoHeight + headerHeight;

        // If total height exceeds viewport, scale down
        let finalWidth = maxWidth;
        
        if (totalHeight > maxHeight) {
            const availableVideoHeight = maxHeight - headerHeight;
            finalWidth = (availableVideoHeight * 16) / 9;
        }

        return {
            width: `${Math.floor(finalWidth)}px`,
            maxWidth: '95vw',
            maxHeight: '90vh'
        };
    };

    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            setHasError(false);
            document.body.style.overflow = 'hidden';

            // Calculate and set modal dimensions
            const dimensions = calculateModalDimensions();
            setModalStyle(dimensions);

            // Recalculate on window resize
            const handleResize = () => {
                const newDimensions = calculateModalDimensions();
                setModalStyle(newDimensions);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    // Scroll modal into view if needed
    useEffect(() => {
        if (isOpen && modalRef.current) {
            const modal = modalRef.current;
            const rect = modal.getBoundingClientRect();

            // Check if modal is fully visible
            if (rect.top < 0 || rect.bottom > window.innerHeight) {
                // Scroll to center the modal
                modal.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'center'
                });
            }
        }
    }, [isOpen, modalStyle]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] overflow-auto">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container - Centered with flex */}
            <div className="min-h-full flex items-center justify-center p-4">
                {/* Modal */}
                <div
                    ref={modalRef}
                    className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
                    style={modalStyle}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 border-b shrink-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate pr-4">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="shrink-0 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
                            aria-label="Close video"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Video Container - Perfect 16:9 aspect ratio */}
                    <div className="relative bg-black w-full" style={{ aspectRatio: '16/9' }}>
                        {/* Loading State */}
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                                <div className="text-center text-white">
                                    <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-3"></div>
                                    <p className="text-sm">Loading video...</p>
                                </div>
                            </div>
                        )}

                        {/* Error State */}
                        {hasError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                                <div className="text-center text-white">
                                    <p className="mb-3">Failed to load video</p>
                                    <button
                                        onClick={() => {
                                            setHasError(false);
                                            setIsLoading(true);
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Video Iframe */}
                        {videoId && embedUrl && !hasError && (
                            <iframe
                                src={embedUrl}
                                className="absolute inset-0 w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                title={title}
                                onLoad={() => {
                                    setIsLoading(false);
                                    setHasError(false);
                                }}
                                onError={() => {
                                    setIsLoading(false);
                                    setHasError(true);
                                }}
                            />
                        )}

                        {/* No Video ID */}
                        {!videoId && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                                <p className="text-white">No video available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}