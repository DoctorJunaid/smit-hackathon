import { useState } from 'react';

import { Link, NavLink as RouterNavLink } from 'react-router';
import { useSelector } from 'react-redux';
import {  ShoppingCart, Menu, X } from 'lucide-react';


const StyledNavLink = ({ to, children, ...props }) => (
    <RouterNavLink
        to={to}
        // This function adds classes conditionally if the link is active
        className={({ isActive }) =>
            `relative text-xs font-medium tracking-wider uppercase transition-colors
            after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray-800 after:transition-transform after:duration-300 after:ease-in-out
            ${
                isActive
                    ? 'text-gray-900 after:scale-x-100 after:origin-bottom-left' // Active state
                    : 'text-gray-600 after:scale-x-0 after:origin-bottom-right hover:text-gray-900 hover:after:origin-bottom-left hover:after:scale-x-100' // Inactive state
            }`
        }
        {...props}
    >
        {children}
    </RouterNavLink>
);

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartItemCount = useSelector(state => state.cart.items.reduce((total, item) => total + item.quantity, 0));

    // Function to close the menu, useful for mobile links
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="relative bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 shadow-sm">
            {/* 3. Re-structured for a clean Left-Center-Right layout */}
            <nav className="relative flex h-16 items-center justify-between px-4 sm:px-8">

                {/* Left Side: Desktop Links & Mobile Menu Button */}
                <div className="flex items-center gap-6">
                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsMenuOpen(true)} className="transition text-white hover:text-gray-600 lg:hidden" aria-label="Open menu">
                        <Menu size={24} />
                    </button>

                    {/* Desktop Nav Links */}
                    <div className="hidden items-center gap-6 lg:flex">
                        <StyledNavLink to="/shop">Shop</StyledNavLink>
                        <StyledNavLink to="/men">Men</StyledNavLink>
                        <StyledNavLink to="/women">Women</StyledNavLink>
                        <StyledNavLink to="/trending">Trending</StyledNavLink>
                    </div>
                </div>

                {/* Center Logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link to="/" className="text-2xl font-light text-black tracking-widest">
                        MyMart
                    </Link>
                </div>

                {/* Right Side: Desktop Links & Common Icons */}
                <div className="flex items-center gap-4 sm:gap-6">
                    {/* Desktop Right Nav */}
                    <div className="hidden items-center gap-6 lg:flex">

                        <Link
                            to="/auth"
                            className="flex items-center gap-2 rounded-full bg-black px-6 py-2 text-xs font-medium tracking-wider text-white  transition hover:bg-gray-800"
                        >
                           <p className={"text-white"}>SIGN IN</p>
                        </Link>
                    </div>

                    {/* Icons (Visible on all screen sizes) */}

                    <Link to="/cart" className="transition hover:text-gray-600 relative" aria-label="View cart">
                        <ShoppingCart size={20} />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {/* 4. Fixed slide-in direction and content */}
            <div
                className={`fixed inset-0 z-50 transform bg-slate-100 transition-transform duration-300 ease-in-out lg:hidden ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full' // Slides from the right
                }`}
            >
                {/* Mobile Menu Header */}
                <div className="flex h-16 items-center justify-between px-4 sm:px-8">
                    <Link to="/" onClick={closeMenu} className="text-2xl font-light tracking-widest">
                        MyMart
                    </Link>
                    <button onClick={closeMenu} className="transition hover:text-gray-600" aria-label="Close menu">
                        <X size={24} />
                    </button>
                </div>

                {/* Mobile Menu Links */}
                <div className="mt-8 flex flex-col items-center gap-8 p-8">
                    <StyledNavLink to="/shop" onClick={closeMenu}>Shop</StyledNavLink>
                    <StyledNavLink to="/men" onClick={closeMenu}>Men</StyledNavLink>
                    <StyledNavLink to="/women" onClick={closeMenu}>Women</StyledNavLink>
                    <StyledNavLink to="/trending" onClick={closeMenu}>Trending</StyledNavLink>


                    <div className="mt-8 w-full border-t border-slate-300 pt-8 text-white   ">
                        <Link

                            to="/auth"
                            onClick={closeMenu}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-12 py-3 text-sm font-medium tracking-wider text-white transition hover:bg-gray-800"
                        >
                            SIGN IN / UP
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}