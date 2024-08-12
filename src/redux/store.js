// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import booksReducer from "./slices/booksSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    books: booksReducer,
  },
});

export default store;
