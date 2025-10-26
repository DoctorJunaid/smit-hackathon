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

  // Prevent GSAP from affecting toast container
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .Toastify__toast-container {
        position: fixed !important;
        top: 1rem !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        z-index: 99999 !important;
        pointer-events: none;
        will-change: auto !important;
      }
      .Toastify__toast {
        pointer-events: auto;
        transform: none !important;
        will-change: auto !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
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