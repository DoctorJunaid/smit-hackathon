import { Routes, Route } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "@/Pages/Home.jsx";
import Shop from "@/Pages/Shop.jsx";
import ProductDetails from "@/Pages/ProductDetails.jsx";
import CartPage from "@/Pages/Cart.jsx";
import CheckoutPage from "@/Pages/Checkout.jsx";
import LoginPage from "@/Pages/Login.jsx";
import AboutPage from "@/Pages/About.jsx";
import ContactPage from "@/Pages/Contact.jsx";
import ProtectedRoute from "@/Components/ProtectedRoute.jsx";
import ScrollToTop from "@/components/ScrollToTop.jsx";
import { initializeAuth } from "@/Redux/UserSlice";
import { syncCartWithUser } from "@/Redux/CartSlice";

const App = () => {
  const dispatch = useDispatch();

  // Initialize authentication state on app startup
  useEffect(() => {
    dispatch(initializeAuth());

    // Get current user from localStorage and sync cart
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null",
    );
    if (currentUser) {
      dispatch(syncCartWithUser({ userId: currentUser.id }));
    }
  }, [dispatch]);

  // Prevent GSAP and scroll from affecting toast container
  useEffect(() => {
    // Create a MutationObserver to constantly fix toast position
    const observer = new MutationObserver(() => {
      const toastContainer = document.querySelector('.Toastify__toast-container');
      if (toastContainer) {
        const currentTransform = toastContainer.style.transform;
        if (currentTransform !== 'translateX(-50%)') {
          toastContainer.style.transform = 'translateX(-50%)';
          toastContainer.style.top = '1rem';
          toastContainer.style.position = 'fixed';
          toastContainer.style.zIndex = '99999';
        }
      }
    });

    // Start observing
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['style']
    });

    // Also fix on scroll
    const handleScroll = () => {
      const toastContainer = document.querySelector('.Toastify__toast-container');
      if (toastContainer) {
        toastContainer.style.transform = 'translateX(-50%)';
        toastContainer.style.top = '1rem';
        toastContainer.style.position = 'fixed';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
};

export default App;