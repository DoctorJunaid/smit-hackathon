import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router";
import { removeFromCart, updateQuantity, clearCart, syncCartWithUser } from "@/Redux/CartSlice";
import { updateUserCart } from "@/Redux/UserSlice";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { toast } from "react-toastify";

import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Eye,
  Shield,
  Truck,
  CreditCard,
  Lock,
  CheckCircle,
  Star,
  Gift,
  Percent,
} from "lucide-react";

export default function CartPage() {
  const { items } = useSelector((state) => state.cart);
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [removingItems, setRemovingItems] = useState(new Set());
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Sync cart with current user on component mount
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      dispatch(syncCartWithUser({ userId: currentUser.id }));
    }
  }, [dispatch, isAuthenticated, currentUser]);

  if (!isAuthenticated) {
    toast.error('Please login to view your cart');
    return <Navigate to="/auth" replace />;
  }

  // Filter items for current user only
  const userCartItems = items.filter(item => item.userId === currentUser?.id);

  const total = userCartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity),
    0
  );

  const handleRemoveItem = (id) => {
    setRemovingItems((prev) => new Set(prev).add(id));
    setTimeout(() => {
      dispatch(removeFromCart(id));

      // Update user cart in user slice
      const updatedCart = userCartItems.filter(item => item.id !== id);
      dispatch(updateUserCart({
        userId: currentUser.id,
        cart: updatedCart
      }));

      setRemovingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });

      toast.success('Item removed from cart');
    }, 300);
  };

  const handleQuantityChange = (id, value) => {
    // Ensure the quantity is between 1 and 10
    const newQuantity = Math.min(Math.max(1, Number(value)), 10);
    dispatch(updateQuantity({ id, quantity: newQuantity }));

    // Update user cart in user slice
    const updatedCart = userCartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    dispatch(updateUserCart({
      userId: currentUser.id,
      cart: updatedCart
    }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(updateUserCart({
      userId: currentUser.id,
      cart: []
    }));
    toast.success('Cart cleared');
  };

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
      toast.success('Promo code applied! 10% discount added');
    } else if (promoCode.trim()) {
      toast.error('Invalid promo code');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      toast.success('Order placed successfully!');
      dispatch(clearCart());
      dispatch(updateUserCart({
        userId: currentUser.id,
        cart: []
      }));
      setIsCheckingOut(false);
    }, 2000);
  };

  const discount = promoApplied ? total * 0.1 : 0;
  const finalTotal = total - discount;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 opacity-3 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #e2e8f0 1px, transparent 0)',
          backgroundSize: '60px 60px'
        }}></div>
        <div className="absolute inset-0 bg-linear-to-br from-blue-50/20 via-transparent to-purple-50/20"></div>
      </div>

      <section className="relative max-w-7xl mx-auto py-16 px-4 sm:px-8">
        {/* Header - matching hero typography */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-3">
            YOUR <span className="italic font-serif">CART</span>
          </h1>
          <p className="text-gray-600 text-lg">
            {userCartItems.length} {userCartItems.length === 1 ? 'item' : 'items'} ready for checkout
          </p>
        </div>

        {userCartItems.length === 0 ? (
          <div className="text-center py-32 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200">
            <div className="mb-10">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-slate-100 mb-6">
                <ShoppingCart className="h-16 w-16 text-gray-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4">
                YOUR CART IS <span className="italic font-serif">EMPTY</span>
              </h2>
              <p className="text-gray-600 text-lg mb-12 max-w-md mx-auto">
                Looks like you haven't added anything yet. Start exploring our collection.
              </p>
            </div>
            <Link
              to="/"
              className="group relative overflow-hidden inline-block bg-black text-white px-12 py-4 rounded-full text-sm font-medium tracking-wider transition-all duration-300 hover:shadow-2xl"
            >
              <span className="relative z-10 text-white">CONTINUE SHOPPING</span>
              <span className="absolute inset-0 z-0 bg-[#FD3B3B] transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {userCartItems.map((item) => (
                <div
                  key={item.id}
                  className={`group bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 ${removingItems.has(item.id)
                    ? "opacity-0 transform -translate-x-full scale-90"
                    : "opacity-100 transform translate-x-0 scale-100 hover:shadow-2xl hover:border-gray-300 hover:-translate-y-1"
                    }`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 w-40 h-40 flex items-center justify-center transition-all duration-500 group-hover:from-slate-100 group-hover:to-slate-200">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-4">
                          <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                            <Eye className="h-6 w-6 text-black" strokeWidth={1.5} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-light text-gray-900 text-2xl mb-3 tracking-tight group-hover:text-[#FD3B3B] transition-colors duration-300" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {item.title}
                      </h3>
                      <div className="flex items-baseline gap-3 mb-6">
                        <span className="text-3xl font-light text-black tracking-tight">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 tracking-wide">PER ITEM</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-gray-600 tracking-wide">QTY:</span>
                          <div className="flex items-center bg-black rounded-full overflow-hidden">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-14 h-14 flex items-center justify-center bg-black text-white hover:bg-[#FD3B3B] transition-all duration-300 active:scale-90 disabled:opacity-30 disabled:hover:bg-black"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-6 w-6 text-white" strokeWidth={2.5} />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                              className="w-16 h-14 text-center font-light text-xl text-gray-900 bg-white border-x-2 border-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-2 focus:ring-[#FD3B3B]"
                            />
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-14 h-14 flex items-center justify-center bg-black text-white hover:bg-[#FD3B3B] transition-all duration-300 active:scale-90 disabled:opacity-30 disabled:hover:bg-black"
                              disabled={item.quantity >= 10}
                            >
                              <Plus className="h-6 w-6 text-white" strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="flex items-center gap-2 text-gray-500 hover:text-[#FD3B3B] hover:bg-red-50 transition-all duration-300 px-5 py-3 rounded-full group/btn"
                          title="Remove item"
                        >
                          <Trash2 className="h-5 w-5 text-gray-500 group-hover/btn:text-[#FD3B3B] group-hover/btn:scale-110 transition-all duration-300" strokeWidth={1.5} />
                          <span className="hidden sm:inline font-medium tracking-wide text-gray-500 group-hover/btn:text-[#FD3B3B]">REMOVE</span>
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 font-medium tracking-wide">SUBTOTAL:</span>
                          <span className="text-2xl font-light text-black tracking-tight">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200">
                <h2 className="text-3xl font-light tracking-tight mb-8">
                  ORDER <span className="italic font-serif">SUMMARY</span>
                </h2>

                <div className="space-y-4 mb-8 pb-8 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span className="font-light tracking-wide">ITEMS ({userCartItems.length})</span>
                    <span className="font-light">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="font-light tracking-wide">SHIPPING</span>
                    <span className="font-medium text-[#FD3B3B]">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="font-light tracking-wide">TAX</span>
                    <span className="text-xs font-light">AT CHECKOUT</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-10 pb-8 border-b-2 border-gray-300">
                  <span className="text-xl font-light tracking-wide text-gray-900">TOTAL</span>
                  <span className="text-4xl font-light tracking-tight text-black">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-4">
                  <Link
                    to="/checkout"
                    className="group relative overflow-hidden w-full bg-black text-white px-8 py-5 rounded-full hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 font-medium tracking-wider text-sm"
                  >
                    <span className="relative z-10 text-white">CHECKOUT NOW</span>
                    <ArrowRight className="h-5 w-5 relative z-10 text-white transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                    <span className="absolute inset-0 z-0 bg-[#FD3B3B] transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
                  </Link>

                  <button
                    onClick={handleClearCart}
                    className="w-full px-8 py-4 rounded-full font-medium tracking-wider text-sm border-2 border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    <span className="text-gray-700 group-hover:text-white">CLEAR CART</span>
                  </button>

                  <Link
                    to="/"
                    className="w-full px-8 py-4 rounded-full font-medium tracking-wider text-sm border-2 border-gray-200 text-gray-600 hover:bg-slate-100 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span className="text-gray-600">CONTINUE SHOPPING</span>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-gray-200 space-y-3 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="tracking-wide">SECURE CHECKOUT</span>
                  </div>
                  <p className="text-xs text-gray-500 tracking-wide">
                    FREE SHIPPING ON ALL ORDERS
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}   