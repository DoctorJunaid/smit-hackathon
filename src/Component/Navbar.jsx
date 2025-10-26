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
    const navLinksRef = useRef([]);
    const logoRef = useRef(null);
    const navbarRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const userState = useSelector(state => state.user || {});
    const isAuthenticated = userState.isAuthenticated || false;
    const currentUser = userState.currentUser || null;

    const  cartItems = useSelector(state => state.cart?.items || []);
    const userCartItems = cartItems.filter(item => item.userId === currentUser?.id);
    const cartItemCount = userCartItems.reduce((total, item) => total + (item.quantity || 1), 0);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        toast.success('Successfully logged out!');
    };

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const [hasShownWelcome, setHasShownWelcome] = useState(() => {
        return sessionStorage.getItem('welcomeShown') === 'true';
    });

    useEffect(() => {
        if (isAuthenticated && currentUser && !hasShownWelcome) {
            toast.success(`Welcome back, ${currentUser.name || 'User'}!`);
            setHasShownWelcome(true);
            sessionStorage.setItem('welcomeShown', 'true');
        }
        if (!isAuthenticated) {
            setHasShownWelcome(false);
            sessionStorage.removeItem('welcomeShown');
        }
    }, [isAuthenticated, currentUser, hasShownWelcome]);

    useEffect(() => {
        if (cartBadgeRef.current && cartItemCount > 0) {
            gsap.fromTo(cartBadgeRef.current,
                { scale: 0.8 },
                { scale: 1, duration: 0.3, ease: "back.out(1.7)" }
            );
        }
    }, [cartItemCount]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(navbarRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out"
            });

            gsap.from(navLinksRef.current.filter(Boolean), {
                y: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.3
            });

            if (logoRef.current) {
                gsap.from(logoRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.6,
                    ease: "back.out(1.4)",
                    delay: 0.2
                });
            }
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (isMenuOpen && mobileMenuRef.current) {
            const ctx = gsap.context(() => {
                gsap.from(mobileMenuRef.current, {
                    x: -400,
                    duration: 0.4,
                    ease: "power3.out"
                });

                const mobileLinks = mobileMenuRef.current.querySelectorAll('.mobile-nav-link');
                gsap.from(mobileLinks, {
                    x: -30,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.08,
                    ease: "power2.out",
                    delay: 0.2
                });
            });

            return () => ctx.revert();
        }
    }, [isMenuOpen]);

    // Auto close menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isMenuOpen) {
                closeMenu();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    return (
        <header ref={navbarRef} className="navbar-glass sticky top-0 z-40 shadow-lg border-b border-gray-200/30">
            <nav className="relative flex h-16 sm:h-20 items-center justify-between px-3 sm:px-6 lg:px-12 max-w-7xl mx-auto">

                <div className="flex items-center gap-3 sm:gap-6">
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 sm:p-2.5 rounded-xl text-black hover:text-gray-700 hover:bg-gray-100/80 transition-all duration-300 hover:shadow-sm lg:hidden border border-gray-200/50 bg-white/80"
                        aria-label="Open menu"
                    >
                        <Menu size={20} strokeWidth={2} className="sm:w-[22px] sm:h-[22px]" />
                    </button>

                    <div className="hidden items-center gap-1 lg:flex">
                        <div ref={el => navLinksRef.current[0] = el}><StyledNavLink to="/" icon={Home}>Home</StyledNavLink></div>
                        <div ref={el => navLinksRef.current[1] = el}><StyledNavLink to="/shop" icon={Store}>Shop</StyledNavLink></div>
                        <div ref={el => navLinksRef.current[2] = el}><StyledNavLink to="/about" icon={Info}>About</StyledNavLink></div>
                        <div ref={el => navLinksRef.current[3] = el}><StyledNavLink to="/contact" icon={MessageCircle}>Contact</StyledNavLink></div>
                    </div>
                </div>

                <div ref={logoRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link
                        to="/"
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-black hover:text-gray-800 transition-all duration-300 hover:scale-105 transform"
                        style={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                            letterSpacing: '-0.04em',
                            fontWeight: '900'
                        }}
                    >
                        MyMart
                    </Link>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
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

                    <Link
                        to="/cart"
                        className="p-2 sm:p-2.5 rounded-xl text-black hover:text-gray-700 hover:bg-gray-100/80 transition-all duration-300 hover:shadow-sm hover:scale-105 transform relative group border border-gray-200/50 bg-white/80"
                        aria-label="View cart"
                    >
                        <ShoppingCart size={20} strokeWidth={2} className="sm:w-[22px] sm:h-[22px] transition-transform group-hover:scale-110" />
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

            {isMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-white/60 backdrop-blur-md lg:hidden"
                        onClick={closeMenu}
                    />

                    <div ref={mobileMenuRef} className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm bg-white/98 backdrop-blur-xl shadow-2xl lg:hidden border-r border-gray-200/50">
                        <div className="flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 border-b border-gray-200/50 bg-white">
                            <Link
                                to="/"
                                onClick={closeMenu}
                                className="text-lg sm:text-xl md:text-2xl font-black text-black hover:scale-105 transform transition-transform"
                                style={{
                                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                                    letterSpacing: '-0.04em',
                                    fontWeight: '900'
                                }}
                            >
                                MyMart
                            </Link>
                            <button
                                onClick={closeMenu}
                                className="p-2 sm:p-2.5 rounded-xl text-black hover:text-gray-700 hover:bg-gray-100/80 transition-all duration-300 border border-gray-200/50 bg-white/80"
                                aria-label="Close menu"
                            >
                                <X size={20} strokeWidth={2} className="sm:w-[22px] sm:h-[22px]" />
                            </button>
                        </div>

                        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 bg-white">
                            <div className="space-y-2">
                                <div className="mb-3 sm:mb-4">
                                    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Navigation</h3>
                                </div>
                                <div className="mobile-nav-link"><StyledNavLink to="/" icon={Home} onClick={closeMenu}>Home</StyledNavLink></div>
                                <div className="mobile-nav-link"><StyledNavLink to="/shop" icon={Store} onClick={closeMenu}>Shop</StyledNavLink></div>
                                <div className="mobile-nav-link"><StyledNavLink to="/about" icon={Info} onClick={closeMenu}>About</StyledNavLink></div>
                                <div className="mobile-nav-link"><StyledNavLink to="/contact" icon={MessageCircle} onClick={closeMenu}>Contact</StyledNavLink></div>
                            </div>

                            <div className="pt-4 sm:pt-6 border-t border-gray-200/50">
                                <div className="mb-3 sm:mb-4">
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
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 sm:py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
                                        >
                                            <LogOut size={16} strokeWidth={2} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        to="/auth"
                                        onClick={closeMenu}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 sm:py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
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