import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import { removeFromCart, updateQuantity, clearCart } from "@/Redux/CartSlice";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

export default function CartPage() {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
        <Navbar />
        <section className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {items.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-16 h-16 object-contain"
                                    />
                                    <div>
                                        <h3 className="font-medium">{item.title}</h3>
                                        <p className="text-sm text-gray-600">${item.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
                                        }
                                        className="w-12 border rounded text-center"
                                    />
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-4 justify-between items-center">
                        <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
                        <div className="flex gap-4">
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="btn-accent-outline px-4 py-2 rounded-lg"
                            >
                                Clear Cart
                            </button>
                            <Link
                                to="/checkout"
                                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </section>
        <Footer />
            
        </>
    );
}
