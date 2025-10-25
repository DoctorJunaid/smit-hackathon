import { createSlice } from "@reduxjs/toolkit";

// --- Load cart from localStorage ---
const loadCartFromStorage = () => {
    try {
        const data = localStorage.getItem("cartItems");
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error("Error reading cart from localStorage", err);
        return [];
    }
};

// --- Save cart to localStorage ---
const saveCartToStorage = (cart) => {
    try {
        localStorage.setItem("cartItems", JSON.stringify(cart));
    } catch (err) {
        console.error("Error saving cart to localStorage", err);
    }
};

const initialState = {
    items: loadCartFromStorage(),
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.items.find((item) => item.id === product.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }

            saveCartToStorage(state.items);
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            saveCartToStorage(state.items);
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const product = state.items.find((item) => item.id === id);
            if (product) product.quantity = quantity;
            saveCartToStorage(state.items);
        },

        clearCart: (state) => {
            state.items = [];
            saveCartToStorage([]);
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;