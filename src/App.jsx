import { Routes, Route } from "react-router";
import Home from "@/Pages/Home.jsx";
import Shop from "@/Pages/Shop.jsx";
import CartPage from "@/Pages/Cart.jsx";
import CheckoutPage from "@/Pages/Checkout.jsx";
import LoginPage from "@/Pages/Login.jsx";
import AboutPage from "@/Pages/About.jsx";
import ContactPage from "@/Pages/Contact.jsx";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/auth" element={<LoginPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </div>
    )
}

export default App;
