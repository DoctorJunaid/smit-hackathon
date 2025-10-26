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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer
  position="bottom-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  style={{
    position: 'fixed',
    top: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 99999,
    pointerEvents: 'none'
  }}
  toastStyle={{
    pointerEvents: 'auto',
    transform: 'none'
  }}
/>
    </div>
  );
};

export default App;
