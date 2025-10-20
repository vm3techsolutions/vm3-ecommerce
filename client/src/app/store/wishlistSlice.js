import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// ✅ Fetch all wishlist packages
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/wishlist/${userId}`);
      return res.data; // should be array of full package objects
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, packageId }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/wishlist`, {
        userId,      // ✅ match backend
        packageId,   // ✅ match backend
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ userId, packageId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/wishlist`, {
        data: { userId, packageId }, // ✅ match backend
      });
      return packageId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [], // will store full package objects
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Remove from wishlist
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (pkg) => pkg.id !== action.payload
        );
      });
  },
});

export default wishlistSlice.reducer;
