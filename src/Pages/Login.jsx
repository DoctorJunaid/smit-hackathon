import React, { useState, useEffect } from 'react';
import Navbar from '@/Component/Navbar';
import Footer from '@/Component/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup, clearError } from '@/Redux/UserSlice';
import { syncCartWithUser } from '@/Redux/CartSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.user);

    // Clear any existing errors when component mounts or form type changes
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch, isLogin]);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (error) {
            dispatch(clearError());
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear any existing errors
        dispatch(clearError());

        // Basic validation
        if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
            const missingField = !formData.email 
                ? 'Email' 
                : !formData.password 
                    ? 'Password' 
                    : 'Full name';
            toast.error(`${missingField} is required`);
            return;
        }

        // Email format validation
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        // Password length validation
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        try {
            let result;
            
            if (isLogin) {
                result = await dispatch(login({ 
                    email: formData.email.trim(), 
                    password: formData.password 
                })).unwrap();
                
                // Sync cart with logged in user
                dispatch(syncCartWithUser({ userId: result.id }));
                
                toast.success('Successfully logged in!');
                navigate('/');
                
            } else {
                result = await dispatch(signup({
                    email: formData.email.trim(),
                    password: formData.password,
                    name: formData.name.trim()
                })).unwrap();
                
                // Initialize empty cart for new user
                dispatch(syncCartWithUser({ userId: result.id }));
                
                toast.success('Account created successfully!');
                navigate('/');
            }
        } catch (error) {
            // Error is already handled by the rejected case in the slice
            toast.error(error || 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-20">
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold">{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
                        <p className="text-gray-600 mt-2">
                            {isLogin 
                                ? 'Sign in to access your account' 
                                : 'Sign up to start shopping'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required={!isLogin}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
                                    placeholder="John Doe"
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-black focus:ring-black"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                            disabled={loading}
                        >
                            <span className="text-white">
                                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                            </span>
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm text-gray-600 hover:text-black"
                        >
                            {isLogin 
                                ? "Don't have an account? Sign up" 
                                : "Already have an account? Sign in"}
                        </button>
                    </div>


                </div>
            </div>
            <Footer />
        </>
    );
}