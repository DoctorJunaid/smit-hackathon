import { createSlice } from "@reduxjs/toolkit";

// Helper functions for localStorage
const saveCartToStorage = (items) => {
    try {
        localStorage.setItem("cart", JSON.stringify(items));
    } catch (err) {
        console.error("Error saving cart to localStorage", err);
    }
};

const loadCartFromStorage = () => {
    try {
        const data = localStorage.getItem("cart");
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error("Error reading cart from localStorage", err);
        return [];
    }
};

const initialState = {
    items: loadCartFromStorage(),
    totalAmount: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload || [];
            state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
            saveCartToStorage(state.items);
        },
        
        addToCart: (state, action) => {
            const { product, userId } = action.payload;
            
            console.log('CartSlice addToCart called with:', { product, userId });
            console.log('Current cart items:', state.items);
            
            if (!product || !userId) {
                console.error("Invalid product or userId for addToCart");
                return;
            }

            const existingIndex = state.items.findIndex(item => 
                item.title === product.title && 
                item.price === product.price && 
                item.userId === userId
            );

            console.log('Existing item index:', existingIndex);

            if (existingIndex === -1) {
                const newItem = { 
                    ...product, 
                    id: `${product.title}-${Date.now()}`, // Generate unique ID
                    quantity: 1, 
                    userId 
                };
                console.log('Adding new item:', newItem);
                state.items.push(newItem);
            } else {
                console.log('Updating existing item quantity');
                state.items[existingIndex].quantity += 1;
            }

            // Update totalAmount
            state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
            console.log('Updated cart items:', state.items);
            console.log('Updated total amount:', state.totalAmount);
            saveCartToStorage(state.items);
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((item) => item.id !== itemId);
            state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
            saveCartToStorage(state.items);
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const product = state.items.find((item) => item.id === id);
            if (product && quantity > 0) {
                product.quantity = Math.max(1, Math.min(10, quantity)); // Ensure quantity is between 1-10
            }
            state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
            saveCartToStorage(state.items);
        },

        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            saveCartToStorage([]);
        },

        // Load user-specific cart items
        loadUserCart: (state, action) => {
            const { userId, userCart } = action.payload;
            if (userId && Array.isArray(userCart)) {
                state.items = userCart.filter(item => item.userId === userId);
                state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
                saveCartToStorage(state.items);
            }
        },

        // Sync cart with user data
        syncCartWithUser: (state, action) => {
            const { userId } = action.payload;
            if (userId) {
                // Filter cart items for current user
                state.items = state.items.filter(item => item.userId === userId);
                state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
                saveCartToStorage(state.items);
            } else {
                // Clear cart if no user
                state.items = [];
                state.totalAmount = 0;
                saveCartToStorage([]);
            }
        }
    },
});

export const { 
    setCart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    loadUserCart, 
    syncCartWithUser 
} = cartSlice.actions;

export default cartSlice.reducer;