// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice"; // ✅ import cartSlice
import wishlistReducer from "./wishlistSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, // ✅ add cart slice
    wishlist: wishlistReducer, // ✅ add wishlist slice
  },
});
