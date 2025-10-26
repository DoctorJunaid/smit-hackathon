import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top without smooth behavior to prevent toast interference
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' // Use instant instead of smooth to avoid conflicts
        });

        // Force repaint to ensure toast stays in place
        requestAnimationFrame(() => {
            const toastContainer = document.querySelector('.Toastify__toast-container');
            if (toastContainer) {
                toastContainer.style.transform = 'translateX(-50%)';
                toastContainer.style.top = '1rem';
                toastContainer.style.position = 'fixed';
            }
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;