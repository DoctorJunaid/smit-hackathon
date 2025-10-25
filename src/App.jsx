import { Routes, Route } from "react-router";
import Home from "@/Pages/Home.jsx";
import Shop from "@/Pages/Shop.jsx";
import CartPage from "@/Pages/Cart.jsx";
import CheckoutPage from "@/Pages/Checkout.jsx";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
        </div>
    )
}

export default App;
