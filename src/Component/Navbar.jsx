import { useState, useEffect, useRef } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Menu, X, LogOut, LogIn, Home, Store, Info, MessageCircle } from 'lucide-react';
import { logout } from '@/Redux/UserSlice';
import { clearCart } from '@/Redux/CartSlice';
import { toast } from 'react-toastify';
import { gsap } from 'gsap';


const StyledNavLink = ({ to, children, icon: Icon, ...props }) => {
    return (
        <RouterNavLink
            to={to}
            className={({ isActive }) =>
                `relative flex items-center gap-2 text-sm font-medium tracking-wide transition-all duration-300 py-2.5 px-4 rounded-xl group
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-black after:to-gray-700 after:transition-transform after:duration-300 after:ease-out
                ${isActive
                    ? 'text-black after:scale-x-100 bg-gray-100/80 shadow-sm' 
                    : 'text-black hover:text-gray-800 hover:bg-gray-100/60 after:scale-x-0 hover:after:scale-x-100 hover:shadow-sm'
                }`
            }
            {...props}
        >
            {Icon && <Icon size={16} className="transition-all duration-300 group-hover:scale-110" />}
            <span className="font-medium">{children}</span>
        </RouterNavLink>
    );
};

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    
    // Animation refs
    const cartBadgeRef = useRef(null);

    const userState = useSelector(state => state.user || {});
    const isAuthenticated = userState.isAuthenticated || false;
    const currentUser = userState.currentUser || null;

    const cartItems = useSelector(state => state.cart?.items || []);
    const userCartItems = cartItems.filter(item => item.userId === currentUser?.id);
    const cartItemCount = userCartItems.reduce((total, item) => total + (item.quantity || 1), 0);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart()); // Clear cart on logout
        toast.success('Successfully logged out!');
    };

    // Simple menu toggle
    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Function to close the menu
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Track if welcome toast has been shown to prevent spam
    const [hasShownWelcome, setHasShownWelcome] = useState(() => {
        // Initialize from sessionStorage to persist across component re-renders but not browser sessions
        return sessionStorage.getItem('welcomeShown') === 'true';
    });

    useEffect(() => {
        // Only show welcome toast once per session when user first logs in
        if (isAuthenticated && currentUser && !hasShownWelcome) {
            toast.success(`Welcome back, ${currentUser.name || 'User'}!`);
            setHasShownWelcome(true);
            sessionStorage.setItem('welcomeShown', 'true');
        }
        // Reset flag when user logs out
        if (!isAuthenticated) {
            setHasShownWelcome(false);
            sessionStorage.removeItem('welcomeShown');
        }
    }, [isAuthenticated, currentUser, hasShownWelcome]);

    // Simple cart badge animation when count changes
    useEffect(() => {
        if (cartBadgeRef.current && cartItemCount > 0) {
            gsap.fromTo(cartBadgeRef.current,
                { scale: 0.8 },
                { scale: 1, duration: 0.3, ease: "back.out(1.7)" }
            );
        }
    }, [cartItemCount]);

    return (
        <header className="navbar-glass sticky top-0 z-40 shadow-lg border-b border-gray-200/30">
            <nav className="relative flex h-20 items-center justify-between px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">

                {/* Left Side: Desktop Links & Mobile Menu Button */}
                <div className="flex items-center gap-6">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2.5 rounded-xl text-black hover:text-gray-700 hover:bg-gray-100/80 transition-all duration-300 hover:shadow-sm lg:hidden border border-gray-200/50 bg-white/80"
                        aria-label="Open menu"
                    >
                        <Menu size={22} strokeWidth={2} />
                    </button>

                    {/* Desktop Nav Links */}
                    <div className="hidden items-center gap-1 lg:flex">
                        <StyledNavLink to="/" icon={Home}>Home</StyledNavLink>
                        <StyledNavLink to="/shop" icon={Store}>Shop</StyledNavLink>
                        <StyledNavLink to="/about" icon={Info}>About</StyledNavLink>
                        <StyledNavLink to="/contact" icon={MessageCircle}>Contact</StyledNavLink>
                    </div>
                </div>

                {/* Center Logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link 
                        to="/" 
                        className="text-2xl lg:text-3xl font-bold text-black hover:text-gray-800 transition-all duration-300 tracking-tight hover:scale-105 transform"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.02em' }}
                    >
                        MyMart
                    </Link>
                </div>

                {/* Right Side: Desktop Links & Common Icons */}
                <div className="flex items-center gap-4 sm:gap-6">
                    {/* Desktop Right Nav */}
                    <div className="hidden items-center gap-6 lg:flex">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-black font-medium px-3 py-1.5 bg-gray-100/60 rounded-lg">
                                    Hi, {currentUser.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:scale-105 transform"
                                >
                                    <LogOut size={16} strokeWidth={2} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/auth"
                                className="flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:scale-105 transform"
                            >
                                <LogIn size={16} strokeWidth={2} />
                                <span>Sign In</span>
                            </Link>
                        )}
                    </div>

                    {/* Icons (Visible on all screen sizes) */}

                    <Link
                        to="/cart"
                        className="p-2.5 rounded-xl text-black hover:text-gray-700 hover:bg-gray-100/80 transition-all duration-300 hover:shadow-sm hover:scale-105 transform relative group border border-gray-200/50 bg-white/80"
                        aria-label="View cart"
                    >
                        <ShoppingCart size={22} strokeWidth={2} className="transition-transform group-hover:scale-110" />
                        {cartItemCount > 0 && (
                            <span 
                                ref={cartBadgeRef}
                                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg border border-white"
                            >
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden mobile-backdrop"
                        onClick={closeMenu}
                    />
                    
                    {/* Mobile Menu */}
                    <div className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl lg:hidden mobile-menu-slide border-r border-gray-200/50">
                        {/* Mobile Menu Header */}
                        <div className="flex h-20 items-center justify-between px-6 border-b border-gray-200/50 bg-white/90">
                            <Link 
                                to="/" 
                                onClick={closeMenu} 
                                className="text-2xl font-bold text-black tracking-tight hover:scale-105 transform transition-transform"
                                style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.02em' }}
                            >
                                MyMart
                            </Link>
                            <button
                                onClick={closeMenu}
                                className="p-2.5 rounded-xl text-black hover:text-gray-700 hover:bg-gray-100/80 transition-all duration-300 border border-gray-200/50 bg-white/80"
                                aria-label="Close menu"
                            >
                                <X size={22} strokeWidth={2} />
                            </button>
                        </div>

                        {/* Mobile Menu Links */}
                        <div className="p-6 space-y-8 bg-white/80">
                            <div className="space-y-2">
                                <div className="mb-4">
                                    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Navigation</h3>
                                </div>
                                <StyledNavLink to="/" icon={Home} onClick={closeMenu}>Home</StyledNavLink>
                                <StyledNavLink to="/shop" icon={Store} onClick={closeMenu}>Shop</StyledNavLink>
                                <StyledNavLink to="/about" icon={Info} onClick={closeMenu}>About</StyledNavLink>
                                <StyledNavLink to="/contact" icon={MessageCircle} onClick={closeMenu}>Contact</StyledNavLink>
                            </div>

                            <div className="pt-6 border-t border-gray-200/50">
                                <div className="mb-4">
                                    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Account</h3>
                                </div>
                                {isAuthenticated ? (
                                    <div className="space-y-4">
                                        <div className="text-sm text-black font-medium px-4 py-2.5 bg-gray-100/60 rounded-xl">
                                            Hi, {currentUser.name}
                                        </div>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                closeMenu();
                                            }}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
                                        >
                                            <LogOut size={16} strokeWidth={2} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        to="/auth"
                                        onClick={closeMenu}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
                                    >
                                        <LogIn size={16} strokeWidth={2} />
                                        <span>Sign In</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}