import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Load users from localStorage
const loadUsersFromStorage = () => {
    try {
        const data = localStorage.getItem("users");
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error("Error reading users from localStorage", err);
        return [];
    }
};

// Load current user from localStorage
const loadCurrentUserFromStorage = () => {
    try {
        const data = localStorage.getItem("currentUser");
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error("Error reading current user from localStorage", err);
        return null;
    }
};

// Save users to localStorage
const saveUsersToStorage = (users) => {
    try {
        localStorage.setItem("users", JSON.stringify(users));
    } catch (err) {
        console.error("Error saving users to localStorage", err);
    }
};

// Save current user to localStorage
const saveCurrentUserToStorage = (user) => {
    try {
        localStorage.setItem("currentUser", JSON.stringify(user));
    } catch (err) {
        console.error("Error saving current user to localStorage", err);
    }
};

// Async thunk for signup
export const signup = createAsyncThunk(
    'user/signup',
    async ({ email, password, name }, { getState, rejectWithValue }) => {
        try {
            console.log('Signup thunk called with:', { email, password, name });
            const state = getState();
            const users = state.user.users;
            console.log('Current users:', users);

            // Validation
            if (!email || !password || !name) {
                console.log('Validation failed: missing fields');
                return rejectWithValue("All fields are required");
            }

            // Check if user already exists
            const userExists = users.find(user => 
                user.email.toLowerCase() === email.toLowerCase()
            );
            
            if (userExists) {
                console.log('User already exists:', userExists);
                return rejectWithValue("Email already exists");
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                email: email.toLowerCase().trim(),
                password,
                name: name.trim(),
                cart: [],
                createdAt: new Date().toISOString()
            };

            console.log('Created new user:', newUser);
            return newUser;
        } catch (error) {
            console.error('Signup thunk error:', error);
            return rejectWithValue("Signup failed. Please try again.");
        }
    }
);

// Async thunk for login
export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }, { getState, rejectWithValue }) => {
        try {
            console.log('Login thunk called with:', { email, password });
            const state = getState();
            const users = state.user.users;
            console.log('Current users for login:', users);

            // Validation
            if (!email || !password) {
                console.log('Login validation failed: missing fields');
                return rejectWithValue("Email and password are required");
            }

            // Find user
            const user = users.find(
                u => u.email.toLowerCase() === email.toLowerCase().trim() && 
                u.password === password
            );
            
            console.log('Found user:', user);
            
            if (!user) {
                console.log('User not found or password mismatch');
                return rejectWithValue("Invalid email or password");
            }

            return user;
        } catch (error) {
            console.error('Login thunk error:', error);
            return rejectWithValue("Login failed. Please try again.");
        }
    }
);

const initialState = {
    users: loadUsersFromStorage(),
    currentUser: loadCurrentUserFromStorage(),
    isAuthenticated: !!loadCurrentUserFromStorage(),
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state) {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.error = null;
            state.loading = false;
            localStorage.removeItem("currentUser");
            localStorage.removeItem("cart"); // Clear cart on logout
        },
        
        updateUserCart(state, action) {
            const { userId, cart } = action.payload;
            
            if (!userId || !Array.isArray(cart)) {
                console.error("Invalid userId or cart data");
                return;
            }

            const userIndex = state.users.findIndex(u => u.id === userId);
            
            if (userIndex !== -1) {
                state.users[userIndex].cart = cart;
                if (state.currentUser && state.currentUser.id === userId) {
                    state.currentUser.cart = cart;
                    saveCurrentUserToStorage(state.currentUser);
                }
                saveUsersToStorage(state.users);
            }
        },
        
        clearError(state) {
            state.error = null;
        },

        // Initialize user session (useful for app startup)
        initializeAuth(state) {
            const currentUser = loadCurrentUserFromStorage();
            if (currentUser) {
                state.currentUser = currentUser;
                state.isAuthenticated = true;
            } else {
                state.currentUser = null;
                state.isAuthenticated = false;
            }
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Signup cases
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const newUser = action.payload;
                
                state.users.push(newUser);
                state.currentUser = newUser;
                state.isAuthenticated = true;
                
                saveUsersToStorage(state.users);
                saveCurrentUserToStorage(newUser);
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                state.currentUser = null;
            })
            
            // Login cases
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const user = action.payload;
                
                state.currentUser = user;
                state.isAuthenticated = true;
                
                saveCurrentUserToStorage(user);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                state.currentUser = null;
            });
    }
});

export const { logout, updateUserCart, clearError, initializeAuth } = userSlice.actions;
export default userSlice.reducer;