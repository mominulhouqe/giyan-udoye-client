// src/slices/booksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch books from the API
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch books");
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Optional: Add any additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default booksSlice.reducer;
