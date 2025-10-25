import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Redux/CartSlice";
import userReducer from "../Redux/UserSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
    },
});

export default store;
